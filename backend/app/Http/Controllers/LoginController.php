<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class LoginController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

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


    /** FROM CHATGPT */
    // public function login(Request $request) {
    //     // Validate the form data
    //     $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required|min:6'
    //     ]);

    //     // Attempt to log the user in
    //     if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
    //         // If successful, redirect to the intended location
    //         return redirect()->intended('dashboard');
    //     }

    //     // If unsuccessful, redirect back to the login form with an error message
    //     return redirect()->back()->withErrors(['email' => 'These credentials do not match our records.']);
    // }

}
