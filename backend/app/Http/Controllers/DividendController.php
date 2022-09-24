<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Dividend;
use Illuminate\Http\Request;

class DividendController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // get dividend data
        // to use sum(dividend), must groupBy the name because we aggregate using a function
        $data = DB::table('dividends')
            ->join('stock_data', 'dividends.tickerSymbol', '=', 'stock_data.tickerSymbol')
            ->select(
                'stock_data.name',
                DB::raw('SUM(dividend) as dividends')
                )
            ->groupBy('stock_data.name')
            -> get();
        
        return $data;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //validate request
        $validated = $request->validate([
            'tickerSymbol' => 'required',
            'price' => 'required',
            'quantity'=>'required',
            'date' => 'required',
            'owner' => 'required'
        ]);

        //set variables to request data (apart from owner and date)
        $tickerSymbol = $request->tickerSymbol;
        $price = $request->price;
        $quantity = $request->quantity;

        $owner = DB::table('owners')
        ->where('owner', $request->owner)
        ->first();
        

        if ($request->date == null){
            $date = date("Y-m-d");
        }
        else{
            $date = $request->date;
        }

        // add stock to database
        DB::table('stock_orders')->insert(
            ['tickerSymbol' => $tickerSymbol, 
            'price' => $price, 
            'quantity' => $quantity, 
            'date' => $date, 
            'owner' => $owner->id]
        );

        return $request;
    }


    /**
     * Shows all orders 
     *
     * @return \Illuminate\Http\Response
     */
    public function showAll()
    {
        
    }


    /**
     * Shows individual orders 
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StockManager  $stockManager
     * @return \Illuminate\Http\Response
     */
    public function edit(StockManager $stockManager)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StockManager  $stockManager
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StockManager $stockManager)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StockManager  $stockManager
     * @return \Illuminate\Http\Response
     */
    public function destroy(StockManager $stockManager)
    {
        //
    }
}
