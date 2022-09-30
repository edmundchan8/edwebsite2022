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
            -> join('stock_data', 'dividends.tickerSymbol', '=', 'stock_data.tickerSymbol')
            -> select(
                'stock_data.name',
                DB::raw('SUM(dividend) as totalDividends')
                )
            -> groupBy('stock_data.name')
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
            'dividend' => 'required',
            'tickerSymbol' => 'required',
            'date' => 'required'
        ]);

        //set variables to request data (apart from owner and date)
        $tickerSymbol = $request->tickerSymbol;
        $dividend = $request->dividend;        

        if ($request->date == null){
            $date = date("Y-m-d");
        }
        else{
            $date = $request->date;
        }

        // add dividend to database
        DB::table('dividends')->insert(
            ['tickerSymbol' => $tickerSymbol, 
            'dividend' => $dividend, 
            'date' => $date
        ]);

        return $request;
    }


    /**
     * Shows all orders 
     *
     * @return \Illuminate\Http\Response
     */
    public function showAll()
    {
        $data = DB::table('dividends')
            -> leftJoin('stock_data', 'dividends.tickerSymbol', '=', 'stock_data.tickerSymbol')
            -> select('stock_data.name', 'dividends.dividend', 'dividends.date')
            -> orderBy('dividends.date')
            -> get();
        
        return $data;
    }


    /**
     * Shows individual orders 
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $data = DB::table('dividends')
        -> leftJoin('stock_data', 'dividends.tickerSymbol', '=', 'stock_data.tickerSymbol')
        -> select('stock_data.name', 'dividends.dividend', 'dividends.date')
        -> orderBy('dividends.date')
        -> where ('stock_data.name', '=', $request->name)
        -> get();
    
    return $data;
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
