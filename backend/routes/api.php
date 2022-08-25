<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodolistController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function(){

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// REGISTER CONTROLLER
Route::post('/register', [RegisterController::class, 'register']);

// TODOLIST CONTROLLER
Route::middleware('auth:sanctum')->get('/todolists', [TodolistController::class, 'index']);

// HOME CONTROLLER
//Route::get('/home', [HomeController::class, 'index']);