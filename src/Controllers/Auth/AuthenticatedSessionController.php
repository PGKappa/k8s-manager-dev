<?php

namespace PGVirtual\Manager\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ManagerUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use PGVirtual\Manager\Requests\Auth\LoginRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return response()->noContent();
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Auth::guard('manager')->logout();

        $request->session()->invalidate();
        // $this->token()
        $request->session()->regenerateToken();

        return response()->noContent();
    }

    public function token(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = ManagerUser::where('username', $request->username)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);
        }

        return ManagerUser::userToken($user);
    }
}
