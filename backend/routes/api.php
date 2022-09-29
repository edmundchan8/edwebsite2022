<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodolistController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\StockManagerController;
use App\Http\Controllers\StockDataController;
use App\Http\Controllers\DividendController;

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

// LOGIN CONTROLLER
// custom logout function route
Route::post('/logout', [LoginController::class, 'logout']);


// REGISTER CONTROLLER
Route::post('/register', [RegisterController::class, 'register']);

// TODOLIST CONTROLLER
Route::middleware('auth:sanctum')->get('/todolists', [TodolistController::class, 'index']);

// STOCK CONTROLLER
Route::middleware('auth:sanctum')->get('/stocks', [StockManagerController::class, 'index']);
Route::middleware('auth:sanctum')->get('/showAll', [StockManagerController::class, 'showAll']);
Route::middleware('auth:sanctum')->post('/store', [StockManagerController::class, 'store']);

// STOCK DATA CONTROLLER
Route::middleware('auth:sanctum')->get('/getData', [StockDataController::class, 'index']);

// DIVIDEND CONTROLLER
Route::middleware('auth:sanctum')->get('/showAllDividends', [DividendController::class, 'index']);
Route::middleware('auth:sanctum')->get('/dividendChartData', [DividendController::class, 'showAll']);
Route::middleware('auth:sanctum')->post('/storeDividend', [DividendController::class, 'store']);

// HOME CONTROLLER
//Route::get('/home', [HomeController::class, 'index']);