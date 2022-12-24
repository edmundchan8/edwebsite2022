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

Route::post('/login', [LoginController::class, 'login']);
// custom logout function route
Route::post('/logout', [LoginController::class, 'logout']);


// REGISTER CONTROLLER
Route::post('/register', [RegisterController::class, 'register']);

// TODOLIST CONTROLLER
// Route::middleware('auth:sanctum')->get('/todolists', [TodolistController::class, 'index']);
Route::get('/todolists', [TodolistController::class, 'index']);
Route::get('/test', function(){ return 'this is a test';});
Route::get('/foo', function(){ return 'fighters';});


// STOCK CONTROLLER
Route::middleware('auth:sanctum')->get('/stocks', [StockManagerController::class, 'index']);
Route::middleware('auth:sanctum')->get('/showAll/{owner}', [StockManagerController::class, 'showAll']);
Route::middleware('auth:sanctum')->post('/store', [StockManagerController::class, 'store']);
Route::middleware('auth:sanctum')->get('/orders/{tickerSymbol}', [StockManagerController::class, 'show']);
Route::middleware('auth:sanctum')->get('/orders/{tickerSymbol}/edit/{order}', [StockManagerController::class, 'edit']);
Route::middleware('auth:sanctum')->delete('/orders/delete/{id}', [StockManagerController::class, 'delete']);


// STOCK DATA CONTROLLER
Route::middleware('auth:sanctum')->post('/getData', [StockDataController::class, 'index']);

// DIVIDEND CONTROLLER
Route::middleware('auth:sanctum')->get('/showAllDividends', [DividendController::class, 'index']);
Route::middleware('auth:sanctum')->get('/dividendChartData', [DividendController::class, 'showAll']);
Route::middleware('auth:sanctum')->post('/storeDividend', [DividendController::class, 'store']);
Route::middleware('auth:sanctum')->get('/dividends/{name}', [DividendController::class, 'show']);
Route::middleware('auth:sanctum')->get('/dividends/{name}/edit/{dividend}', [DividendController::class, 'edit']);
Route::middleware('auth:sanctum')->delete('/dividends/delete/{id}', [DividendController::class, 'delete']);

// HOME CONTROLLER
//Route::get('/home', [HomeController::class, 'index']);