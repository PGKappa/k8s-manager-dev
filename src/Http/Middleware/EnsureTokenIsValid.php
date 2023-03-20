<?php

namespace PGVirtual\Manager\Http\Middleware;

// use App\Models\ManagerApiLog;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use PGVirtual\Manager\Models\ManagerUser;

class EnsureTokenIsValid
{
    /**
     * Custom parameters.
     *
     * @var \Symfony\Component\HttpFoundation\ParameterBag
     *
     * @api
     */
    public $attributes;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        //$header = $request->header("Authorization");

        //$token = explode("Bearer ",$header)[1];
        $bearer = $request->bearerToken();
        if ($bearer) {
            $userQuery = ManagerUser::where('token', $bearer);

            // ManagerApiLog::create([
            //     "url" => $request->fullUrl(),
            //     "method_name" => class_basename(Route::currentRouteAction()),
            //     "request_data" => "$token",
            //     "response_data" => "$token",// we are returning user not token
            //     "date" => \Carbon\Carbon::now(),
            // ]);

            if (! $userQuery->exists()) {
                return response()->json([
                    'message' => 'Forbiden',
                    'user' => $userQuery->exists(),
                    'token' => $bearer,
                    'userQuery' => [$userQuery->first()],
                ], 403);
            }

            $user = $userQuery->first();
            $request->attributes->add([
                'id' => $user->id,
            ]);

            return $next($request);
        }
        // return redirect()->route('manager-login-page');

        return response()->json([
            'message' => 'UnAuthorized',
            'token' => $bearer ?? '',
        ], 401);
    }
}
