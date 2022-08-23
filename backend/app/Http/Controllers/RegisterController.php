<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Validation\Rules\Password;

class RegisterController extends Controller
{
    public function register(Request $request){
        
        $data = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email',
            'password' => 'required', 'confirmed', Password::min(8)
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => \Hash::make($data['password']),
        ]);

        // create sanctum token
        $token = $user->createToken('auth_token')->plainTextToken;
        
        $user->save();

        return response()->json([
            'user' => $user,
            // 'access_token' => $token,
            // 'token_type' => 'Bearer'
        ]);
    }
}
