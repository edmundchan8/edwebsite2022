<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Auth;
// use Session;
//set up logging of errors
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Auth\Hash;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    // use AuthenticatesUsers;

    // /**
    //  * Where to redirect users after login.
    //  *
    //  * @var string
    //  */
    // protected $redirectTo = RouteServiceProvider::HOME;

    // /**
    //  * Create a new controller instance.
    //  *
    //  * @return void
    //  */
    // public function __construct()
    // {
    //     $this->middleware('guest')->except('logout');
    // }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $credentials->password = Hash::make($request->password);

        Log::info($credentials);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();

            return response()->json($user);
        }

        return response()->json([
            'errors' => [
                'email' => 'The provided credentials do not match our records.',
                ]
        ], 422);
    }
}
