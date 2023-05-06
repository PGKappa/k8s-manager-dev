<?php

namespace PGVirtual\Manager\Controllers;

use App\Http\Controllers\Controller;
// use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use PGVirtual\Core\Models\Channel;
use PGVirtual\Core\Models\Game;
use PGVirtual\Core\Models\Language;
use PGVirtual\Core\Models\Operator;
use PGVirtual\Core\Models\User;
use PGVirtual\Core\Models\Viewer;

class ViewerController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'chunk' => 'nullable|numeric',
            'limit' => 'nullable|in:10,25,50,100',
        ]);

        $viewers = Viewer::all();

        $limit = $request->limit ?? 10; // per page
        $chunk = $request->chunk ?? 1; // current page

        $skip = ($chunk * $limit) - $limit;
        if ($chunk === '1' || $chunk === 1) {
            $skip = 0;
        }

        $totalViewers = $viewers->count(); // total viewers
        $totalPages = round($viewers->count() / $limit); // last page

        $viewers = $viewers->skip($skip)->take($limit);

        $dataViewers = [];
        foreach ($viewers as $viewer) {
            $dataViewers[] = [
                'id' => $viewer->id,
                'macaddress' => $viewer->macaddress,
                'user' => User::findOrFail($viewer->user_id)->name,
                'monitor' => $viewer->monitor,
                'channel' => Channel::findOrFail($viewer->channel_id)->name,
                'language' => Language::where('id', $viewer->language_id)->first()->name,
                'videoURL' => $viewer->videoURL,
            ];
        }

        return response()->json([
            'status' => 1024,
            'viewers' => $dataViewers,
            'pagination' => [
                'total' => $totalViewers,
                'chunk' => (int) $chunk,
                'limit' => $limit,
                'last_chunk' => ceil($totalPages),
            ],
        ]);
    }

    public function create(Request $request)
    {
        $shops = User::where('level', 3)->select('name', 'id')->get()->toArray();
        $channels = Channel::select('id', 'name', 'game_id as game');
        $languages = Language::select('id', 'name')->get()->toArray();

        $channels = $channels->get()->map(function ($channel) {
            $channel->game = Game::findOrFail($channel->game)->name;

            return $channel;
        });

        return response()->json([
            'shops' => $shops,
            'languages' => $languages,
            'channels' => $channels,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user('manager');

        if ($user->level == 'analyst') {
            return response()->json(['status' => '1123123231', 'description' => 'Unauthenticated']);
        }

        $messages = [
            'macaddress.required' => 'macaddress value is required',
            'user.required' => 'user value is required',
            'monitor.required' => 'Monitor value is required',
            'channel.required' => 'Channel value is required',
            'language.required' => 'Language value is required',
            'videoURL.required' => 'Video URL value is required ',
            'monitor.unique' => '  Monitor already exists!',
        ];

        $data = $request->toArray();
        $macaddress = $request->macaddress;
        $monitor = $request->monitor;
        $validator = Validator::make(
            $data,
            [
                'macaddress' => [
                    'required',
                ],
                'monitor' => [
                    'required',
                    Rule::unique('viewers')->where(
                        function ($query) use ($macaddress) {
                            return $query->where('macaddress', $macaddress);
                        }
                    ),
                    'numeric',
                ],
                'user' => [
                    'required',
                ],
                'channel' => [
                    'required',
                ],
                'language' => [
                    'required',
                ],
                'videoURL' => [
                    'required',
                ],
            ],
            $messages
        );
        if ($validator->fails()) {
            return response()->json([
                // "success" => false,
                'message' => 'The given data was invalid!',
                'errors' => $validator->getMessageBag(),
            ], 400);
        }

        $viewer = new Viewer();
        $viewer->macaddress = $request->macaddress;
        $viewer->channel_id = $request->channel;
        $viewer->language_id = $request->language;
        $viewer->monitor = $request->monitor;
        $viewer->user_id = $request->user;
        $viewer->videoURL = $request->videoURL;

        $viewer->save();

        return response()->json([
            'status' => '1024',
            'description' => 'New Viewer Created Successfully',

        ]);
    }

    public function show($id, Request $request)
    {
        $viewer = Viewer::findOrFail($id);
        $shops = User::where('level', 3)->select('name', 'id')->get()->toArray();
        $channels = Channel::select('id', 'name', 'game_id as game');
        $languages = Language::select('id', 'name')->get()->toArray();
        $channels = $channels->get()->map(function ($channel) {
            $channel->game = Game::findOrFail($channel->game)->name;

            return $channel;
        });

        return response()->json([
            'viewer' => [
                'channel' => $viewer->channel_id,
                'language' => $viewer->language_id,
                'macaddress' => $viewer->macaddress,
                'monitor' => $viewer->monitor,
                'user' => $viewer->user_id,
                'videoURL' => $viewer->videoURL,

            ],
            'values' => [
                'shops' => $shops,
                'channels' => $channels,
                'languages' => $languages,
            ],
        ]);
    }

    public function update($id, Request $request)
    {
        $user = $request->user('manager');

        if ($user->level == 'analyst') {
            return response()->json(['status' => '1123123231', 'description' => 'Unauthenticated']);
        }

        $messages = [
            'macaddress.required' => 'Macaddress value is required',
            'user.required' => 'User value is required',
            'user.exists' => ' User doesnt exist .',
            'user.numeric' => ' Invalid value .',
            'monitor.required' => 'Monitor value is required',
            'monitor.unique' => '  Monitor already exists!',
            'monitor.numeric' => ' Invalid value. ',
            'channel.required' => 'Channel value is required',
            'language.required' => 'Language value is required',
            'videoURL.required' => 'Video URL value is required ',
        ];

        $data = $request->toArray();
        $macaddress = $request->macaddress;
        //$monitor = $request->monitor;

        $validator = Validator::make(
            $data,
            [
                'macaddress' => [
                    'required',
                ],
                'monitor' => [
                    'required',
                    Rule::unique('viewers')->where(
                        function ($query) use ($macaddress) {
                            return $query->where('macaddress', $macaddress);
                        }
                    )->ignore($id, 'id'),
                    'numeric',
                ],
                'user' => [
                    'required',
                    'numeric',
                    'exists:users,id',
                ],
                'channel' => [
                    'required',
                    'numeric',
                ],
                'language' => [
                    'required',
                    'numeric',
                ],
                'videoURL' => [
                    'required',
                ],
            ],
            $messages
        );

        if ($validator->fails()) {
            return response()->json([
                // "success" => false,
                'message' => 'The given data was invalid!',
                'errors' => $validator->getMessageBag(),
            ], 400);
        }

        $viewer = Viewer::findOrFail($id);

        if (isset($request->macaddress)) {
            $viewer->macaddress = $request->macaddress;
        }
        if (isset($request->videoURL)) {
            $viewer->videoURL = $request->videoURL;
        }
        if (isset($request->monitor)) {
            $viewer->monitor = $request->monitor;
        }
        if (isset($request->channel)) {
            $viewer->channel_id = $request->channel;
        }
        if (isset($request->language)) {
            $viewer->language_id = $request->language;
        }
        if (isset($request->user)) {
            $viewer->user_id = $request->user;
        }

        $viewer->save();

        return response()->json([
            'status' => 1024,
            'message' => 'Successfull',
        ]);
    }

    public function destroy($id, Request $request)
    {
        $user = $request->user('manager');
        if (! $user) {
            return response()->json([
                'status' => 123123123,
                'message' => 'Unauthenticated',
            ], 400);
        }
        if ($user->level == 'analyst') {
            return response()->json([
                'status' => '1123123231',
                'description' => 'User not allowed ',
            ], 400);
        }

        $viewer = Viewer::where('id', $id)->first();
        if (! $viewer) {
            return response()->json([
                'status' => 1026,
                'message' => 'Invalid Viewer id',
            ], 400);
        }

        $viewerUser = User::where('id', $viewer->user_id)->first();
        if (! $viewerUser) {
            return response()->json([
                'status' => 1026,
                'message' => 'Invalid Viewer user',
            ], 400);
        }

        $viewerOperator = Operator::where('id', $viewerUser->operator_id)->first();
        if (! $viewerOperator) {
            return response()->json([
                'status' => 1026,
                'message' => 'Couldnt find a viewer operator',
            ], 400);
        }

        if ($viewerOperator == $user->operator_id || $user->level == 'root') {
            $viewer->delete();

            return response()->json([
                'status' => 1024,
                'message' => 'Successfull',
            ]);
        }

        return response()->json([
            'status' => 1026,
            'message' => 'Action not allowed',
        ], 400);
    }
}
