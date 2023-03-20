<?php

namespace PGVirtual\Manager\Controllers;

use App\Http\Controllers\Controller;
// use App\Models\ManagerApiLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use PGVirtual\Core\Models\Language;
use PGVirtual\Manager\Models\ManagerUser;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'chunk' => 'nullable|numeric',
            'limit' => 'nullable|in:10,25,50,100',
        ]);

        $loggedInUser = $request->user('manager');
        $userAccess = $loggedInUser->getAccess();

        if ($userAccess['users'] === 'all') {
            $users = ManagerUser::whereIn('level', $userAccess['subLevel'])->get();
        }

        if (is_int($loggedInUser->getAccess()['users'])) {
            $users = ManagerUser::where('operator_id', $userAccess['users'])->whereIn('level', $userAccess['subLevel'])->get();
        }

        $limit = $request->limit ?? 10;
        $chunk = $request->chunk ?? 1;

        $skip = ($chunk * $limit) - $limit;
        if ($chunk === '1' || $chunk === 1) {
            $skip = 0;
        }

        $totalUsers = $users->count(); // total users
        $totalPages = $users->count() / $limit; // last page

        $users = $users->skip($skip)->take($limit);

        $dataUsers = [];
        foreach ($users as $user) {
            $timeCreatedAt = explode(' ', Carbon::createFromTimeString($user->created_at)->format('Y m d H i s'));
            $timeCreatedAt[1] = $timeCreatedAt[1] - 1;
            $timeUpdatedAt = explode(' ', Carbon::createFromTimeString($user->updated_at)->format('Y m d H i s'));
            $timeUpdatedAt[1] = $timeUpdatedAt[1] - 1;

            $dataUsers[] = [
                'id' => $user->id,
                'username' => $user->username,
                'level' => $user->level,
                'enabled' => $user->enabled,
                'created_at' => $timeCreatedAt,
                'updated_at' => $timeUpdatedAt,
                "intl" => [
                    'locale' => $user->language->name
                ]
            ];
        }

        $paginate = [
            'total' => $totalUsers,
            'chunk' => (int) $chunk,
            'limit' => $limit,
            'last_chunk' => ceil($totalPages),
        ];

        return response()->json([
            'status' => 1024,
            // "headers" => $headers,
            'users' => $dataUsers,
            'pagination' => $paginate,
        ]);
    }

    public function create(Request $request)
    {
        $managerUser = $request->user('manager');
        // $allowedUserLevels = $user->getAccess()["subLevel"];

        $request->validate(
            [
                'username' => 'alpha_dash|string',
                'password' => 'alpha_dash|same:confirmPassword',
                'confirmPassword' => 'same:password',
                'level' => 'in:2,3,4|string',
                'language' => 'required|exists:languages,name',

            ],
            [
                'level.string' => '   Field is Required.',
                'username.string' => '   Field is Required.',
                'username.alpha_dash' => '   Special chars and blank space in username are not allowed! Allowed chars are alphanumeric, dashes and underscores(- , _).',
                'password.alpha_dash' => '   Special chars and blank space in password are not allowed! Allowed chars are alphanumeric, dashes and underscores(- , _).',
                'password.same' => '   Password Mismatch.',
                'confirmPassword.same' => '   Password Mismatch.',
                'level.in' => '   Incorrect Level.',
                'language.exists' => '    Selected language is incorrect.',
                'language.required' => '  Language field is required.',
            ]
        );

        $userCheck = ManagerUser::where('username', $request->username)->where('level', ManagerUser::LEVELS[$request->level])->exists();

        if (!$userCheck) {
            $user = new ManagerUser();
            $user->username = $request->username;
            $user->password = Hash::make($request->password);
            $user->enabled = true;
            $user->level = ManagerUser::LEVELS[$request->level];
            $user->language_id = Language::where('name', $request->language)->first()->id;

            if (!is_null($managerUser->operator_id)) {
                $user->operator_id = $managerUser->operator_id;
            }

            $user->save();

            return response()->json([
                'status' => 1,
                'description' => 'Successfully created new user!',

            ]);
        }

        return response()->json([
            'status' => 66142,
            'error' => [
                'user' => 'Already exists',
            ],
        ], 406);
    }

    /**
     * $id - requested user details
     * $request - $reuqested params
     */
    public function show($id, Request $request)
    {
        $user = ManagerUser::select('id', 'enabled', 'level', 'username', 'language_id as language')->findOrFail($id);
        $user->language = Language::findOrFail($user->language)->name;

        $loggedInUser = $request->user('manager');

        $allowedUserLevels = $loggedInUser->getAccess()['subLevel'];

        return response()->json([
            'status' => '1',
            'description' => 'Success',
            // "subLevels" => $allowedUserLevels,
            'subLevels' => ManagerUser::LEVELS,
            'details' => $user,
            'header' => $request->header('Authorization'),
        ]);
    }

    public function update($id, Request $request)
    {
        $request->validate(
            [
                'username' => 'alpha_dash',
                'level' => 'in:2,3,4',
                'enabled' => 'boolean',
                'password' => 'nullable|alpha_dash|same:confirmPassword',
                'confirmPassword' => 'nullable|same:password',
                'language' => 'required|exists:languages,name',
            ],
            [
                'password.alpha_dash' => '   Special chars and blank space in password are not allowed! Allowed chars are alphanumeric, dashes and underscores(- , _).',
                'password.same' => '   Password Mismatch',
                'confirmPassword.same' => '   Password Mismatch',
                'username.alpha_dash' => '    Special chars are not allowed. use only - _ ',
                'level.in' => '    Incorect value',
                'enabled.enabled' => '     Incorect value',
                'language.exists' => '    Selected language is incorrect.',
                'language.required' => '  Language field is required.',
            ]
        );

        $loggedInUser = $request->user('manager');

        $user = ManagerUser::findOrFail($id);

        if ((!empty($request->password) && !empty($request->confirmPassword) && $user)) {
            $request->validate([
                'password' => 'alpha_dash',
                'confirmPassword' => 'same:password',
            ]);

            $user->password = Hash::make($request->password);
        }
        if (isset($request->username)) {
            $user->username = $request->username;
        }
        if (isset($request->level)) {
            $user->level = $request->level;
        }
        if (isset($request->enabled)) {
            $user->enabled = $request->enabled;
        }
        if (isset($request->language)) {
            $user->language_id = Language::where('name', $request->language)->first()->id;
        }

        $user->save();

        return response()->json([
            'status' => 1024,
            'message' => "User $user->username updated successfully.",
        ], 200);
    }

    public function destroy($id, Request $request)
    {
        $loggedInUser = $request->user('manager');

        $user = ManagerUser::findOrFail($id);
        $allowedUserLevels = $user->getAccess()['subLevel'];

        $allowedUserLevels = $loggedInUser->getAccess()['subLevel'];
        // $allowedUserLevels = $loggedInUser->subLevels($loggedInUser->level);

        if (in_array($user->level, $allowedUserLevels) && $user->id != $loggedInUser->id) {
            $user->delete();

            return response()->json([
                'status' => 1024,
                'message' => "User $user->username updated successfully.",
            ], 200);
        }

        return response()->json([
            'status' => 69123,
            'message' => 'U aint changing anything ...',
        ], 401);
    }

    // public function activity()
    // {
    //     $activity = ManagerApiLog::all()->toJson();

    //     return response()->json($activity);
    // }
}
