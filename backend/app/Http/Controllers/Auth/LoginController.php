<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
// use Session;

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

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    // public function logout(Request $request)
    // {
    //     // Auth::guard('web')->logout();
    //     // Revoke the token that was used to authenticate the current request...
    //     auth()->user()->tokens()->delete();

    //     $this->guard()->logout();

    //     $request->session()->invalidate();

    //     return redirect('/');
    // }

    // public function logout() 
    // { 
    //     Session::flush(); 

    //     // Revoke the token that was used to authenticate the current request...
    //     auth()->user()->tokens()->delete();
    //     return redirect()->route('/');
    // }
}
