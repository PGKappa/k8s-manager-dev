<?php

namespace PGVirtual\Manager\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        //dd($request->route()->getName());
        if ($request->session()->has('auth')) {
            // if ($request->route()->getName() == 'manager-login-page') {
            //     return redirect()->route('manager-dashboard');
            // }
            // else {
            return $next($request);
        // }
        } else {
            // if ($request->route()->getName() != 'manager-login-page') {
            //     return redirect()->route('manager-login-page');
            // }
            // else {
            return $next($request);
            // }
        }
    }
}
