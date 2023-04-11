<?php

namespace PGVirtual\Manager\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use PGVirtual\Core\Models\Ticket;
use PGVirtual\Core\Models\User;
use PGVirtual\Manager\Models\ManagerUser;
use PGVirtual\Manager\Traits\FormatUtils;
use PGVirtual\Core\Models\Configuration;
use PGVirtual\Core\Models\Currency;
use PGVirtual\Core\Models\Event;
use PGVirtual\Core\Models\EventScheduling;
use PGVirtual\Core\Models\Game;
use PGVirtual\Core\Models\Operator;
use PGVirtual\Core\Models\Error as ErrorModel;
use PGVirtual\Core\Models\Language;
use PGVirtual\Core\Models\Channel;
use Exception;


class ReportController extends Controller
{
    use FormatUtils;

    public static $groupBy = [
        'operator' => 'operator_id',
        'shops' => 'user_id',
        'users' => 'user_id',
    ];

    // public static $USER_LEVEL_SHOP = 4; shops are all groups with name "shops"

    public static $USER_LEVELS_THAT_CAN_PLAY = [1, 2, 3, 4];

    private static $UserLevels = [
        1 => 'player',
        2 => 'self',
        3 => 'selfap',
        4 => 'operator',
    ];

    private static $TICKET_STATUS_TEXT = [
        0 => 'Create',
        1 => 'Active',
        2 => 'Cancelled',
        3 => 'Void',
        4 => 'Won',
        5 => 'Lost',
        6 => 'Paid',
    ];

    private static $ALLOWED_GROUP_BY_VALUES = ['shops', 'operator', 'date', 'users'];

    public function index(Request $request)
    {
        if (isset($request->fromDate) && isset($request->toDate)) {
            $from = Carbon::parse($request->fromDate)->startOfDay();
            $to = Carbon::parse($request->toDate)->endOfDay();

            $isAValidDateRange = $to->gt($from);
            if (!$isAValidDateRange) {
                return response()->json([
                    'error' => 12312313,
                    'message' => 'Start is greater than end time',
                ], 401);
            }
        }

        $request->validate(
            [
                'toDate' => 'date|nullable',
                'fromDate' => 'date|nullable',
                'limit' => 'in:10,25,50,100,2000',
                'shops' => 'array|nullable',
                'users' => 'array|nullable',
                'chunk' => 'numeric',
            ],
            [
                'toDate.date' => 'Invalid date!',
                'fromDate.date' => 'Invalid date!',
                'limit.in' => 'Invalid value of items per page !',
                'chunk.numeric' => 'Invalid value of chunk !',
            ]
        );

        $modeParams = [
            'type' => $request->type,
            'groupBy' => $request->groupBy ?? '',
        ];
        $mode = '';

        switch ($modeParams) {
            case $modeParams['type'] === 'transaction' && empty($modeParams['groupBy']):
                $mode = 'transaction';
                break;
            case $modeParams['type'] === 'summary' && empty($modeParams['groupBy']):
                $mode = 'summary';
                break;
            case $modeParams['type'] === 'summary' && $modeParams['groupBy'] === 'shops':
                $mode = 'summaryShops';
                break;
            case $modeParams['type'] === 'transaction' && $modeParams['groupBy'] === 'shops':
                $mode = 'transactionShops';
                break;
            case $modeParams['type'] === 'summary' && $modeParams['groupBy'] === 'date':
                $mode = 'summaryDate';
                break;
            case $modeParams['type'] === 'transaction' && $modeParams['groupBy'] === 'users':
                $mode = 'transactionUsers';
                break;
            case $modeParams['type'] === 'summary' && $modeParams['groupBy'] === 'users':
                $mode = 'summaryUsers';
                break;

            default:
                return response()->json([
                    'status' => 1231231,
                    'message' => 'Unknown query mode.',
                ]);
                break;
        }
        try {
            $dates = self::reportDateValidation($request->toDate, $request->fromDate, $request->groupBy);
        } catch (Exception $e) {
            return response()->json([
                'errors' => [],
                'message' => $e->getMessage(),
            ], 402);
        }
        // if (isset($request->groupBy) && $request->groupBy === "") {
        //     $request->groupBy = null;
        // }

        $user = $request->user('manager');
        if ($user) {
            try {
                $userLanguage = $user->language->name;

                $ticketList = ReportController::getReport([
                    'type' => $request->type ?? 'transaction',
                    'fromDate' => $dates['fromDate'],
                    'toDate' => $dates['toDate'],
                    'groupBy' => $request->groupBy ?? null,
                    'shops' => $request->shops,
                    'users' => $request->users,
                    'limit' => $request->limit ?? 10,
                    'chunk' => (int) ($request->chunk ?? 1),
                    'user' => $user,
                    'userLanguage' => $userLanguage,
                    'mode' => $mode,
                ]);
            } catch (Exception $e) {
                return response()->json([
                    'errors' => [],
                    'message' => $e->getMessage(),
                ], 402);
            }
        }

        // $total = self::getModePerPageAndAllTimeTotal($dates["fromDate"], $dates['toDate']);

        if ($request->type === 'transaction' || !isset($request->type) && !isset($request->groupBy)) {
            if (isset($request->shops)) {
                $shops = DB::table('groups')->where('name', 'shops')->first();
                $filterShops = User::where('group_id', $shops)->where('id', $request->shops)->get()->pluck('id');

                if ($filterShops->isEmpty()) {
                    throw new Exception('invalid shop');
                }

                // $GROSS_IN = Ticket::where("user_id", $filterShops)->whereBetween("time", [$dates["fromDate"], $dates["toDate"]])->where("status", ">=", Ticket::STATUS_ACTIVE)->sum("amount");
                // $IN = $GROSS_IN
                //     - Ticket::whereIn("user_id", $filterShops)
                //     ->whereBetween("time", [$dates['fromDate'], $dates['toDate']])
                //     ->where("status", Ticket::STATUS_CANCELLED)
                //     ->sum("amount_refund")
                //     - Ticket::whereIn("user_id", $filterShops)
                //     ->whereBetween("time", [$dates['fromDate'], $dates['toDate']])
                //     ->where("status", Ticket::STATUS_VOID)
                //     ->sum("amount_refund");
                // $OUT = Ticket::where("user_id", $filterShops)->whereBetween("time", [$dates['fromDate'], $dates['toDate']])->whereIn("status", [Ticket::STATUS_WON, Ticket::STATUS_PAID])->sum("amount_won");
                $totalData = self::getAllTimeTotal($dates['fromDate'], $dates['toDate'], $filterShops);
            }
            if (!isset($request->shops)) {
                // $GROSS_IN = Ticket::whereBetween("time", [$from, $to])->where("status", ">=", Ticket::STATUS_ACTIVE)->sum("amount");
                // $IN = $GROSS_IN - Ticket::whereBetween("time", [$from, $to])->where("status", Ticket::STATUS_CANCELLED)->sum("amount_refund") - Ticket::whereBetween("time", [$from, $to])->where("status", Ticket::STATUS_VOID)->sum("amount_refund");
                // $OUT = Ticket::whereBetween("time", [$from, $to])->whereIn("status", [Ticket::STATUS_WON, Ticket::STATUS_PAID])->sum("amount_won");
                $totalData = self::getAllTimeTotal($dates['fromDate'], $dates['toDate'], null);
            }

            $totalSum = [
                'id' => 'Total',
                'amount_in' => FormatUtils::money($totalData['in']),
                'amount_out' => FormatUtils::money($totalData['out']),
                'intl' => [
                    // "timezone" => $ticket->timezone,
                    'locale' => $userLanguage,
                ],
            ];
            $totalSumPerPage = [
                'id' => 'Page Total',
                'amount_in' => FormatUtils::money($ticketList['totalSumPerPage']['amount_in']),
                'amount_out' => FormatUtils::money($ticketList['totalSumPerPage']['amount_out']),
                'intl' => [
                    // "timezone" => $ticket->timezone,
                    'locale' => $userLanguage,
                ],
            ];
        }

        if (isset($request->groupBy) && $request->type === 'transaction') {
            $list = $ticketList['reports'];
            unset($ticketList['reports']);

            foreach ($list as $key => $tickets) {
                // echo ($tickets->first()->shop_id);
                $shopId = $tickets->first()->shop_id ?? $tickets->first()->user_id;
                $personalKeys = 'chunk' . $shopId;

                $limit = request()->limit ?? 10;
                $chunk = request()->input($personalKeys) ?? 1;

                $ticketList['paginate'][$shopId] = [
                    'total' => $tickets->count(),
                    'chunk' => $chunk,
                    'limit' => $limit,
                    'last_chunk' => ceil($tickets->count() / $limit) - 1,
                ];

                $skip = ($chunk * $limit);

                if ($chunk === 1 || $chunk === '1') {
                    $skip = 0;
                }

                $userId = $tickets->first()->user_id;

                // $GROSS_IN = Ticket::where("user_id", $userId)->whereBetween("time", [$from, $to])->where("status", ">=", Ticket::STATUS_ACTIVE)->sum("amount");
                // $IN = $GROSS_IN - Ticket::where("user_id", $userId)->whereBetween("time", [$from, $to])->where("status", Ticket::STATUS_CANCELLED)->sum("amount_refund") - Ticket::where("user_id", $userId)->whereBetween("time", [$from, $to])->where("status", Ticket::STATUS_VOID)->sum("amount_refund");
                // $OUT = Ticket::where("user_id", $userId)->whereBetween("time", [$from, $to])->whereIn("status", [Ticket::STATUS_WON, Ticket::STATUS_PAID])->sum("amount_won");
                $totalData = self::getAllTimeTotal($dates['fromDate'], $dates['toDate'], $userId);

                $content = $tickets->skip($skip)->take($limit)->values();

                $ticketList['reports'][] = $content;

                $totalSum['group'][$shopId] = [
                    'id' => 'Total',
                    'amount_in' => FormatUtils::money($totalData['in']),
                    'amount_out' => FormatUtils::money($totalData['out']),
                    'intl' => [
                        'locale' => $userLanguage,
                    ],
                ];

                $totalSumPerPage['group'][$shopId] = [
                    'id' => 'Page Total',
                    'amount_in' => FormatUtils::money(($content->where('status', '>=', Ticket::STATUS_ACTIVE)->sum('amount'))
                        - ($content->where('status', Ticket::STATUS_CANCELLED)->sum('amount_refund'))
                        - ($content->where('status', Ticket::STATUS_VOID)->sum('amount_refund'))),
                    'amount_out' => FormatUtils::money($content->sum('amount_out')),
                    'intl' => [
                        'locale' => $userLanguage,
                    ],
                ];
            }

            $ticketList['pagination']['group'] = $ticketList['paginate'] ?? null;
        }

        if ($request->type === 'summary' && isset($request->groupBy)) {
            $totalSum = $ticketList['totalSum'];
        }

        return response()->json([
            'mode' => $mode,
            'status' => 1024,
            'pagination' => $ticketList['pagination'] ?? null,
            'totalSum' => $totalSum ?? null,
            'totalSumOfPerPage' => $totalSumPerPage ?? null,
            'reports' => $ticketList['reports'] ?? $ticketList,
            'params' => [
                'type' => $request->type ?? 'transaction',
                'fromDate' => $dates['fromDate'],
                'toDate' => $dates['toDate'],
                'groupBy' => $request->groupBy ?? null,
                'shops' => $request->shops ?? null,
                'users' => $request->users ?? null,
            ],
        ]);
    }
    public static function getReport($options)
    {
        $tickets = Ticket::where('status', '>', Ticket::STATUS_CREATED);
        $isReportTypeTransaction = !isset($options['type']) || $options['type'] === 'transaction';
        $isReportTypeSummary = $options['type'] === 'summary';

        $shouldGroupBy = isset($options['groupBy']) && in_array($options['groupBy'], self::$ALLOWED_GROUP_BY_VALUES);
        //filter shops
        $shouldFilterByShops = !empty($options['shops']) && isset($options['shops']);
        //filter users
        $shouldFilterByUsers = !empty($options['users']) && isset($options['users']);

        if ($options['user']->getAccess()['tickets'] === 'all') {
            $shops = DB::table('groups')->where('name', 'shop')->get()->pluck('id');
            if ($shouldFilterByShops || isset($options['groupBy']) && $options['groupBy'] == 'shops') {
                if ($shouldFilterByShops) {
                    $selectedShopIds = User::whereIn('group_id', $options['shops'])->get()->pluck('id');
                }

                if ($options['groupBy'] == 'shops') {
                    $selectedShopIds = User::whereIn('group_id', $shops)->get()->pluck('id');
                }

                // if ($selectedShopIds->isEmpty()) {
                //     throw new \Exception('Operator doesnt have shops');
                // }

                $tickets = $tickets->whereIn('user_id', $selectedShopIds);
            } elseif ($shouldFilterByUsers) {
                $selectedUserIds = User::whereIn('id', $options['users'])->get()->pluck('id');
                if ($selectedUserIds->isEmpty()) {
                    throw new \Exception('Failed to get users');
                }
                $tickets = $tickets->whereIn('user_id', $selectedUserIds);
            } else {
                $selectedShopIdsThatCanPlay = User::whereIn('level', self::$USER_LEVELS_THAT_CAN_PLAY)->get()->pluck('id')->toArray();
                $tickets = $tickets->whereIn('user_id', $selectedShopIdsThatCanPlay);
            }
        }

        if (is_int($options['user']->getAccess()['tickets'])) {
            $operatorId = $options['user']->getAccess()['tickets'];
            $shops = DB::table('groups')->where('operator_id', $operatorId)->where('name', 'shop')->get()->pluck('id');

            if ($shouldFilterByShops || isset($options['groupBy']) && $options['groupBy'] == 'shops') {
                if ($shouldFilterByShops) {
                    $selectedShopIds = User::where('operator_id', $operatorId)->whereIn('group_id', $options['shop'])->get()->pluck('id');
                }

                if ($options['groupBy'] == 'shops') {
                    $selectedShopIds = User::where('operator_id', $operatorId)->whereIn('group_id', $shops)->get()->pluck('id');
                }

                if ($selectedShopIds->isEmpty()) {
                    throw new \Exception('Something went wrong');
                }

                $tickets = $tickets->whereIn('user_id', $selectedShopIds);
            } elseif ($shouldFilterByUsers) {
                $selectedUserIds = User::where('operator_id', $operatorId)->whereIn('id', $options['users'])->get()->pluck('id');
                if ($selectedUserIds->isEmpty()) {
                    throw new \Exception('Something went wrong');
                }
                $tickets = $tickets->whereIn('user_id', $selectedUserIds);
            } else {
                $selectedShopIdsThatCanPlay = User::where('operator_id', $operatorId)->whereIn('level', self::$USER_LEVELS_THAT_CAN_PLAY)->get()->pluck('id')->toArray();
                $tickets = $tickets->whereIn('user_id', $selectedShopIdsThatCanPlay);
            }
        }
        if (!is_int($options['user']->getAccess()['tickets']) && !($options['user']->getAccess()['tickets'] === 'all')) {
            throw new \Exception('Something went wrong');
        }

        if (isset($options['fromDate']) && isset($options['toDate'])) {
            $isAValidDateRange = $options['toDate']->gt($options['fromDate']); // check if start date is less than end date
            if ($isAValidDateRange) {
                $tickets = $tickets->whereBetween('time', [$options['fromDate'], $options['toDate']]);
            }
        }

        if (!$shouldGroupBy) {
            $tickets = $tickets->orderBy('id', 'DESC');
        }

        $numOfTickets = $tickets->count();

        $ticketList = [];

        if ($isReportTypeTransaction) {
            $ticketList = self::getTicketListData($tickets, $options['userLanguage']);

            if ($shouldGroupBy) {
                // type = transaction and groupby = users doesnt get in here

                switch ($options['groupBy']) {
                    case 'shops':
                        $valuesTobeGroupedBy = 'user_id';
                        break;
                    case 'operator':
                        $valuesTobeGroupedBy = 'operator_id';
                        break;
                    case 'date':
                        $valuesTobeGroupedBy = 'time';
                        break;
                    case 'users':
                        $valuesTobeGroupedBy = 'user_id';
                        break;
                    default:
                        return response()->json([
                            'status' => 1231231,
                            'message' => 'Unknown groupBy.',
                        ]);
                        break;
                }

                $ticketListData = $ticketList->groupBy($valuesTobeGroupedBy);

                if ($options['mode'] === 'transactionShops') {
                    $ticketListData = self::transactionGroupBy($ticketList, $selectedShopIds, $options['user']);
                }
            } else {
                $ticketListData = $ticketList;
            }
        }

        if ($isReportTypeSummary) {
            if ($shouldGroupBy) {
                $ticketList = self::summaryGroupBy($options['groupBy'], $tickets);

                if ($options['mode'] === 'summaryShops') {
                    $ticketListData = self::groupByShops($tickets, $selectedShopIds, $options['user']);
                } else {
                    $ticketListData = $ticketList->map(function ($ticket) use ($options) {
                        $ticket->sumIn = FormatUtils::money($ticket->sumIn);
                        $ticket->sumOut = FormatUtils::money($ticket->sumOut);
                        $ticket['concatPercentage'] = FormatUtils::money($ticket->sumProfit) . ' (' . intval($ticket->sumPercentage) . '%)';
                        if ($ticket->user_id) {
                            $ticket->intl = [
                                // "timezone" => $ticket->timezone,
                                'locale' => $options['userLanguage'],
                            ];
                        }

                        return $ticket;
                    });
                }

                $totalSum = [
                    'user_id' => 'Total ',
                    'sumIn' => FormatUtils::money($ticketList->sum('sumIn')),
                    'sumOut' => FormatUtils::money($ticketList->sum('sumOut')),
                    'concatPercentage' => FormatUtils::money($ticketList->sum('sumProfit')),
                    'intl' => [
                        // "timezone" => $ticket->timezone,
                        'locale' => $options['userLanguage'],
                    ],
                ];
            } else {
                $totalData = self::getAllTimeTotal($options['fromDate'], $options['toDate'], null);

                $amount_unpaid = Ticket::whereBetween('time', [$options['fromDate'], $options['toDate']])->where('status', Ticket::STATUS_WON)->sum('amount_won');

                $amountProfit = $totalData['in'] - $totalData['out'];
                $in = $totalData['in'] === 0 ? 1 : $totalData['in'];
                $amountProfitPercentage = number_format($amountProfit * 100 / $in, 2);

                $data = [];
                if ($numOfTickets > 0) {
                    $summary = [
                        'tickets' => $numOfTickets,
                        'in' => FormatUtils::money($totalData['in']),
                        'out' => FormatUtils::money($totalData['out']),
                        'profit' => FormatUtils::money($amountProfit) . " ($amountProfitPercentage %)",
                        'intl' => [
                            // "timezone" => $ticket->timezone,
                            'locale' => $options['userLanguage'],
                        ],
                    ];
                    $activeUsersQuery = Ticket::whereBetween('time', [$options['fromDate'], $options['toDate']])->where('status', '>=', Ticket::STATUS_ACTIVE);

                    if ($shouldFilterByShops) {
                        $activeUsersQuery->whereIn('user_id', $selectedShopIds);
                    } elseif ($shouldFilterByUsers) {
                        $activeUsersQuery->whereIn('user_id', $selectedUserIds);
                    }

                    $summary['active_shops'] = $activeUsersQuery->distinct('user_id')->count();
                    array_push($data, $summary);
                }
            }
        }

        $isNotSummaryWithoutGroupBy = $isReportTypeSummary && !$shouldGroupBy;

        // pagination
        if (isset($options['chunk']) && isset($options['limit']) && !$isNotSummaryWithoutGroupBy) {
            // - !(isReportTypeSummary && !shouldGroupBy) >> TRUE
            // - !(isReportTypeSummary && !not shouldGroupBy) >> FALSE
            // - !(not isReportTypeSummary && !shouldGroupBy) >> TRUE
            // - !(not isReportTypeSummary && !not shouldGroupBy) >> TRUE

            /*
                type = transaction
                type = summary
                groupby=  shops
                type = transaction && !(isset(groupby)) //groupby = shops  // false && !(true) = !(false) = true
                type = transaction && !(isset(groupby))// groupby = ""  // false && !(false) = !(false) = true
                type = summary && !(isset(groupby)) //groupby = shops  // true && !(true) = !(false) = true
                type = summary && !(isset(groupby))// groupby = ""  // false && !(true) = !(true)  = false
            */

            $limit = $options['limit'];

            $skip = ($options['chunk'] * $options['limit']) - $options['limit'];
            if ($options['chunk'] === '1') {
                $skip = 0;
            }

            $data = $ticketListData->skip($skip)->take($limit)->values();

            $totalTickets = $ticketListData->count();
            $totalPages = $ticketListData->count() / $options['limit'];

            $paginate = [
                'total' => $totalTickets,
                'chunk' => $options['chunk'],
                'limit' => $options['limit'],
                'last_chunk' => ceil($totalPages),
            ];
        }

        if ($isReportTypeTransaction && !$shouldGroupBy && !$isReportTypeSummary) {
            $ticketStatusTexts = __('core::v-ui.misc.ticket.status');
            if ($ticketStatusTexts == 'core::v-ui.misc.ticket.status') {
                $ticketStatusTexts = self::$TICKET_STATUS_TEXT;
            }

            $data = $data->map(function ($item) use ($ticketStatusTexts) {
                $time = explode(' ', Carbon::parse($item->time)->format('Y m d H i s'));
                $time[1] = $time[1] - 1;

                $item->time = $time;
                $item->statusId = $item->status;
                $item->status = $ticketStatusTexts[$item->status];
                $item->intl = [
                    'timezone' => $item->timezone,
                    'locale' => Language::where('id', User::findOrFail($item->user_id)->language_id)->first()->name,
                ];
                // $item->locale = ; //* note after work

                return $item;
            }, $data);
        }

        if ($isReportTypeTransaction) {
            $totalSumPerPage = [
                'id' => 'Page Total',
                'amount_in' => FormatUtils::money(
                    ($ticketListData->skip($skip)->take($limit)->where('statusId', '>=', Ticket::STATUS_ACTIVE)->sum('amount'))
                        - ($ticketListData->skip($skip)->take($limit)->where('statusId', Ticket::STATUS_CANCELLED)->sum('amount_refund'))
                        - ($ticketListData->skip($skip)->take($limit)->where('statusId', Ticket::STATUS_VOID)->sum('amount_refund'))
                ),
                'amount_out' => FormatUtils::money(
                    $ticketListData->skip($skip)->take($limit)->whereIn('statusId', [Ticket::STATUS_WON, Ticket::STATUS_PAID])->sum('amount_won')
                ),
                'intl' => [
                    // "timezone" => $ticket->timezone,
                    'locale' => $options['userLanguage'],
                ],
            ];
        }

        return [
            'reports' => $data,
            'pagination' => $paginate ?? null,
            'totalSum' => $totalSum ?? null,
            'totalSumPerPage' => $totalSumPerPage ?? null,
        ];
    }

    public function filterSearch(Request $request)
    {
        $loggedInUser = $request->user('manager');
        $userAccess = $loggedInUser->getAccess();

        $hasRootPermissions = $loggedInUser->getAccess()['users'] === 'all';
        if ($hasRootPermissions) {
            $shops = DB::table('groups')->where('name', 'shop')->get()->pluck('id');
            if (isset($request->shops) && !empty($request->shops)) {
                $filterShops = $shops;

                $filterUsers = User::where('level', self::$USER_LEVELS_THAT_CAN_PLAY)->get();

                // if ($filterShops->isEmpty()) {
                //     return response()->json([
                //         "errors" => [
                //             "shop" => ["Invalid shop"]
                //         ],
                //         "message" => "The given data was invalid!"
                //     ], 402);
                // }
            } else {
                $filterShops = $shops;
                $filterUsers = User::where('level', self::$USER_LEVELS_THAT_CAN_PLAY)->get();
            }
        } else {
            $operatorId = $loggedInUser->getAccess()['users'];
            $shops = DB::table('groups')->where('name', 'shop')->where('operator_id', $operatorId)->first();

            if (isset($options['shop']) && !empty($options['shop'])) {
                $filterShops = $shops;

                $filterUsers = User::where('group_id', '!=', $shops)->get();

                // if ($filterShops->isEmpty()) {
                //     return ["status" => 12319231, "error" => "Invalid shop"];
                // }
                $filterUsers = Ticket::whereIn('user_id', $filterShops);
            } else {
                $filterShops = User::whereIn('level', self::$USER_LEVELS_THAT_CAN_PLAY)
                    ->where('operator_id', $loggedInUser->getAccess()['users'])
                    ->get()->pluck('id');

                $filterUsers = User::where('level', self::$USER_LEVELS_THAT_CAN_PLAY)->where('operator_id', $userAccess['users']);
            }
        }

        $shopsData = [];
        foreach ($filterShops as $shop) {
            $shopsData[] = [
                'lead' => 'Id ',
                'value' => $shop,
            ];
        }

        $usersData = [];
        foreach ($filterUsers as $user) {
            $usersData[] = [
                'lead' => 'Id ',
                'value' => $user->id,
            ];
        }
        $response['shops'] = [
            [
                'chips' => $shopsData,
                'heading' => 'Shops id',
                'id' => 0,
            ],
        ];

        $response['users'] = [
            [
                'chips' => $usersData,
                'heading' => 'User id',
                'id' => 0,
            ],
        ];

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        if (Ticket::where('id', $id)->where('status', '>', Ticket::STATUS_CREATED)->exists()) {
            $ticket = Ticket::where('id', $id)->where('status', '>', Ticket::STATUS_CREATED)->first();
            $user = $request->user('manager');

            if ($ticket->user_id === $user->id || $user->level == 'root' || $ticket->operator_id === $user->operator_id) {
                $exp['ret_code'] = 1024;
                $currency = Currency::where('id', $ticket->currency_id)->first();

                $time = Carbon::createFromTimeString($ticket->time)->setTimezone($ticket->timezone)->format('Y-m-d-H-i-s');
                $time = explode('-', $time);
                $time[1] -= 1;
                $time = array_map(function ($x) {
                    return intval($x);
                }, $time);

                $exp['info'] = [
                    'bet_type' => $ticket->getType(),
                    'ticket_id' => $ticket->id,
                    'time' => $time,
                    'intl' => [
                        'currency' => $currency->name,
                        'locale' => $currency->locale,
                    ],
                    'amount' => $ticket->amount,
                    'amount_won' => $ticket->amount_won,
                    'status' => $ticket->status,
                    'selections' => array_map(function ($x) use ($ticket) {
                        $es = EventScheduling::where('int_pal', $x['palimpsestId'])->first();
                        $event = Event::where('int_pal_id', $x['palimpsestId'])->where('int_event_id', $x['eventId'])->first();

                        $game = Game::where('id', $es['game_id'])->first();
                        $startTimeConfig = Configuration::where('key', 'START_TIME_FORMAT')->where('operator_id', $ticket->operator_id);
                        $startTimeValue = $startTimeConfig->exists() ? $startTimeConfig->first()->value : 'H:i';
                        // $gameName = __("core::v-ui.misc.name");
                        /*$gameName = Dictionary::getValue("misc.name", [
                            "stage" => "v-ui",
                            "game" => $game->name . $game->racers,
                            "partner" => strtolower(Operator::where("id", $ticket->operator_id)->first()->name),
                            "lang" => Language::where("id", User::where("id", $ticket->user_id)->first()->language_id)->first()->name
                        ]);*/
                        //$gameMarkets = __("core::v-ui.misc.event.channel");
                        // $gameMarkets = __("core::v-ui.markets");
                        $gameName = __('games-' . $game->name . '::v-ui.misc.name');
                        $gameMarkets = __('games-' . $game->name . '::v-ui.markets');
                        $channel = Channel::where('id', $es['channel_id'])->first();

                        return [
                            'game' => [
                                'dict' => [
                                    'misc' => [
                                        'name' => $gameName,
                                    ],
                                    'markets' => $gameMarkets,
                                ],
                                'constraints' => [
                                    'event_closes_in_seconds' => Configuration::select('value')->where('key', 'EVENT_CLOSES_IN_SECONDS')->where('game_id', $game->id)->first()->getValue() ?? 5,
                                ],
                            ],
                            'trackName' => $channel['track_name'],
                            'channelName' => $channel['name'],
                            'gameId' => $game['name'] . $game['racers'],
                            'channelId' => $es['channel_id'],
                            'palimpsestId' => $x['palimpsestId'],
                            'startTime' => Carbon::createFromTimeString($event->time ?? 0)->setTimezone($ticket->timezone)->format($startTimeValue),
                            'eventId' => $x['eventId'],
                            'isBanker' => $x['isBanker'] ?? false,
                            'status' => $event->getStatus(),
                            'markets' => array_map(function ($x) use ($event, $game) {
                                $marketId = $x['description'];

                                return [
                                    'description' => $marketId,
                                    'selections' => array_map(function ($x) use ($event, $marketId, $game) {
                                        $selectionId = $x['description'];
                                        $oddsId = $x['odds'];
                                        $ticketUtils = 'PGVirtual\\Game' . ucfirst(strtolower($game->name)) . '\\Libraries\\TicketUtils';
                                        $selectionStatus = $event->isFinished() && $ticketUtils::isWinning([
                                            'event' => $event,
                                            'market' => $marketId,
                                            'selection' => $selectionId,
                                            'numRacers' => $game->racers,
                                        ]) ? 6 : 5;

                                        return [
                                            'description' => $selectionId,
                                            'odds' => $oddsId,
                                            'status' => $selectionStatus,
                                        ];
                                    }, $x['selections']),
                                ];
                            }, $x['markets']),
                        ];
                    }, json_decode($ticket->ticketbody, 1)['rawTicket']),
                    'system' => json_decode($ticket->ticketbody, 1)['systems'],
                ];
                if (($exp['info']['status'] == Ticket::STATUS_CANCELLED) || ($exp['info']['status'] == Ticket::STATUS_CANCELLED)) {
                    if (!empty($ticket->statuschange_at)) {
                        $statusChangeDate = Carbon::createFromTimeString($ticket->statuschange_at)->setTimezone($ticket->timezone)->format('Y-m-d-H-i-s');
                        $statusChangeDate = explode('-', $statusChangeDate);
                        $statusChangeDate[1] -= 1;
                        $statusChangeDate = array_map(function ($x) {
                            return intval($x);
                        }, $statusChangeDate);
                        $exp['info']['date_cancellation'] = $statusChangeDate;
                    }
                } elseif ($exp['info']['status'] == Ticket::STATUS_PAID) {
                    if (!empty($ticket->statuschange_at)) {
                        $statusChangeDate = Carbon::createFromTimeString($ticket->statuschange_at)->setTimezone($ticket->timezone)->format('Y-m-d-H-i-s');
                        $statusChangeDate = explode('-', $statusChangeDate);
                        $statusChangeDate[1] -= 1;
                        $statusChangeDate = array_map(function ($x) {
                            return intval($x);
                        }, $statusChangeDate);
                        $exp['info']['date_payment'] = $statusChangeDate;
                    }
                } else {
                    $exp['info']['date_payment'] = '';
                }

                $exp['dict'] = __('core::v-ui');

                return json_encode($exp, JSON_PRETTY_PRINT);
            } else {
                return ErrorController::response(ErrorController::$TICKET_NOACCESS);
            }
        } else {
            return ErrorController::response(ErrorController::$TICKET_NOT_FOUND);
        }
    }

    public static function getTicketListData($tickets, $userLanguage)
    {
        $ticketList = $tickets->select(
            'id',
            'user_id',
            'operator_id',
            'external_id',
            'user_id as type',
            'currency_id',
            'timezone',
            // DB::raw("DATE_FORMAT(time, '%d/%m/%Y %H:%i:%s') as time"),
            'time',
            'amount',
            'amount_won',
            'amount_refund',
            'status',
            'ticketbody',
        );
        $currencies = Currency::get()->keyBy('id')->toArray();
        $ticketList = $ticketList->get()->filter(function ($ticket) use ($userLanguage, $currencies) {
            if ($ticket->status >= Ticket::STATUS_ACTIVE) { // ticket is created
                $ticket->amount_in = $ticket->amount;
                //     - ($ticket->status === Ticket::STATUS_CANCELLED ? $ticket->amount_refund : 0) -
                //     ($ticket->status === Ticket::STATUS_VOID ? $ticket->amount_refund : 0);
                if ($ticket->status === Ticket::STATUS_VOID || $ticket->status === Ticket::STATUS_CANCELLED) {
                    $ticket->amount_in = $ticket->amount_refund;
                }
                $ticket->amount_out = 0.00;

                if ($ticket->status === Ticket::STATUS_WON || $ticket->status === Ticket::STATUS_PAID) {
                    $ticket->amount_out = $ticket->amount_won;
                }
            }

            $ticket->amount_in = FormatUtils::money($ticket->amount_in);
            $ticket->amount_out = FormatUtils::money($ticket->amount_out);
            $ticket->currency_id = $currencies[$ticket->currency_id]['name'];
            $ticket->username = User::findOrFail($ticket->type)->name;
            $ticket->type = self::$UserLevels[User::findOrFail($ticket->type)->level];
            $ticket->intl = [
                // "timezone" => $ticket->timezone,
                'locale' => $userLanguage,
            ];

            return $ticket;
        });

        return $ticketList;
    }

    public static function summaryGroupBy($groupBy, $tickets)
    {
        $valuesToBeSelected = [];
        if ($groupBy === 'shops') {
            $valuesTobeGroupedBy = 'user_id';
            $valuesToBeSelected[] = 'user_id';
        }
        if ($groupBy === 'users') {
            $valuesTobeGroupedBy = 'user_id';
            $valuesToBeSelected[] = 'user_id';
        }
        if ($groupBy === 'operator') {
            $valuesTobeGroupedBy = 'operator_id';

            $valuesToBeSelected[] = 'operator_id as operator_id';
        }
        if ($groupBy === 'date') {
            $valuesTobeGroupedBy[] = DB::raw("DATE_FORMAT(time, '%m/%d/%Y')");

            $valuesToBeSelected[] = DB::raw("DATE_FORMAT(time, '%m/%d/%Y') as date");
            $valuesToBeSelected[] = DB::raw('count(DISTINCT user_id) as active_shops');
        }

        $ticketList = $tickets->groupBy($valuesTobeGroupedBy);

        array_push(
            $valuesToBeSelected,
            DB::raw('SUM(IF(status >= 1, amount,0)) as gross_in'),
            DB::raw('SUM(IF(status >= 1, amount,0)) - SUM(IF(status = 2, amount_refund,0)) - SUM(IF(status = 3, amount_refund,0)) as sumIn'),
            DB::raw('SUM(IF(status = 4, amount_won,0)) + SUM(IF(status = 6, amount_won,0)) as sumOut'),
            DB::raw('SUM(IF(status = 4, amount_won,0)) as amountUnpaid'),
            DB::raw('SUM(IF(status >= 1, amount,0)) - SUM(IF(status = 2, amount_refund,0)) - SUM(IF(status = 3, amount_refund,0)) - SUM(IF(status = 6, amount_won,0)) - SUM(IF(status = 4, amount_won,0)) as sumProfit'),
            DB::raw('(SUM(IF(status >= 1, amount,0)) - SUM(IF(status = 2, amount_refund,0)) - SUM(IF(status = 3, amount_refund,0))
            - SUM(IF(status = 6, amount_won,0)) - SUM(IF(status = 4, amount_won,0)))
            * 100 /
            (SUM(IF(status >= 1, amount,0)) - SUM(IF(status = 2, amount_refund,0)) - SUM(IF(status = 3, amount_refund,0)))
            as sumPercentage')
        );

        $ticketList = $ticketList->select($valuesToBeSelected)->get();

        return $ticketList;
    }

    public static function groupByShops($data, $shopsUsers, $userLanguage)
    {
        $users = User::whereIn('id', $shopsUsers)->get()->groupBy('group_id');

        $groupsTotal = $users->map(function ($shopUsers, $shopId) use ($data, $userLanguage) {
            $shopReports = $data->whereIn('user_id', $shopUsers->pluck('id'))->get();

            if ($shopReports->isEmpty()) {
                return;
            }
            $profitPercentage = round((($shopReports->sum('sumProfit')) * 100) / ($shopReports->sum('sumIn')), 2);

            $groupsTotal = [
                'shop_id' => $shopId,
                'sumIn' => FormatUtils::money($shopReports->sum('sumIn')),
                'sumOut' => FormatUtils::money($shopReports->sum('sumOut')),
                'concatPercentage' => FormatUtils::money($shopReports->sum('sumProfit')) . ' (' . "$profitPercentage" . '%)',
                'intl' => [
                    // "timezone" => $ticket->timezone,
                    'locale' => $userLanguage,
                ],

            ];

            return $groupsTotal;
        })->reject(function ($item) {
            return is_null($item);
        });

        return collect($groupsTotal);
    }

    public static function transactionGroupBy($data, $shopsUsers, $userLanguage)
    {
        $ticketStatusTexts = __('core::v-ui.misc.ticket.status');
        if ($ticketStatusTexts == 'core::v-ui.misc.ticket.status') {
            $ticketStatusTexts = self::$TICKET_STATUS_TEXT;
        }

        $users = User::whereIn('id', $shopsUsers)->get()->groupBy('group_id');

        $groupsTotal = $users->map(function ($shopUsers, $shopId) use ($data, $ticketStatusTexts, $userLanguage) {
            $shopReports = $data->whereIn('user_id', $shopUsers->pluck('id'));

            if ($shopReports->isEmpty()) {
                return;
            }

            $shopReports->map(function ($ticket) use ($shopId, $ticketStatusTexts, $userLanguage) {
                $ticket->shop_id = $shopId;
                $ticket->statusId = $ticket->status;
                $ticket->status = $ticketStatusTexts[$ticket->status];
                $ticket->intl = [
                    // "timezone" => $ticket->timezone,
                    'locale' => $userLanguage,
                ];

                return $ticket;
            });

            return $shopReports;
        })->reject(function ($item) {
            return is_null($item);
        });

        return $groupsTotal;
    }

    public function reportDateValidation($toDate, $fromDate, $groupBy = null)
    {
        if (!$toDate || !$fromDate) {
            $todaysDate = \Carbon\Carbon::now();
            $dates = [
                'fromDate' => $todaysDate->startOfDay(),
                'toDate' => $todaysDate->endOfDay(),
                'dateFormat' => 'yy-mm-dd',
            ];
        } else {
            $dates = [
                'fromDate' => Carbon::parse($fromDate)->startOfDay(),
                'toDate' => Carbon::parse($toDate)->endOfDay(),
                'dateFormat' => 'yy-mm-dd',
            ];
        }
        if ($groupBy === 'date') {
            $dates = [
                'fromDate' => $fromDate ?? \Carbon\Carbon::now()->subDays(7),
                'toDate' => $toDate ?? \Carbon\Carbon::now(),
                'dateFormat' => 'yy-mm-dd',
            ];
        }
     //   $diffInDays = $dates['fromDate']->diffInDays($dates['toDate']);

       // if (!($diffInDays <= 31)) {
       //     throw new Exception('Period cannot be bigger than a month');
       // }

        return $dates;
    }

    public static function getAllTimeTotal(Carbon $fromDate = null, Carbon $toDate = null, $users)
    {
        if ($users) {
            $GROSS_IN = Ticket::whereIn('user_id', $users)->whereBetween('time', [$fromDate, $toDate])->where('status', '>=', Ticket::STATUS_ACTIVE)->sum('amount');
            $IN = $GROSS_IN - Ticket::whereIn('user_id', $users)->whereBetween('time', [$fromDate, $toDate])->where('status', Ticket::STATUS_CANCELLED)->sum('amount_refund') - Ticket::whereBetween('time', [$fromDate, $toDate])->where('status', Ticket::STATUS_VOID)->sum('amount_refund');
            $OUT = Ticket::whereIn('user_id', $users)->whereBetween('time', [$fromDate, $toDate])->whereIn('status', [Ticket::STATUS_WON, Ticket::STATUS_PAID])->sum('amount_won');
        } else {
            $GROSS_IN = Ticket::whereBetween('time', [$fromDate, $toDate])->where('status', '>=', Ticket::STATUS_ACTIVE)->sum('amount');
            $IN = $GROSS_IN - Ticket::whereBetween('time', [$fromDate, $toDate])->where('status', Ticket::STATUS_CANCELLED)->sum('amount_refund') - Ticket::whereBetween('time', [$fromDate, $toDate])->where('status', Ticket::STATUS_VOID)->sum('amount_refund');
            $OUT = Ticket::whereBetween('time', [$fromDate, $toDate])->whereIn('status', [Ticket::STATUS_WON, Ticket::STATUS_PAID])->sum('amount_won');
        }

        return [
            'gross_in' => $GROSS_IN,
            'in' => $IN,
            'out' => $OUT,
        ];
    }

    public function getModePerPageAndAllTimeTotal($fromDate = null, $toDate = null, $user = null)
    {
        return $date = [
            'totalPerPage' => [],
            'allTimeTotal' => [],
        ];
    }
}
