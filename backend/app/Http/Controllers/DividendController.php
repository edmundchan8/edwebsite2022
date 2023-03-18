<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Dividend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DividendController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // returns all dividends
        $data = DB::table('dividends')
        -> get();

        return $data;
    }

    public function showCurrentDividendsSummed(){
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
            'tickerSymbol' => 'required'
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
     * Shows individual orders 
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $data = DB::table('dividends')
        -> leftJoin('stock_data', 'dividends.tickerSymbol', '=', 'stock_data.tickerSymbol')
        -> select('dividends.id', 'stock_data.name', 'dividends.dividend', 'dividends.date')
        -> orderBy('dividends.date')
        -> where ('stock_data.name', '=', $request->name)
        -> get();
    
    return $data;
    }


    /**
     * Shows all Dividends and Stock ticker symbol, tickersymbol is null if they don't exist in stock data
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
     * Show the form for editing the specified resource.
     *
     */
    public function edit(Request $request)
    {
        // get data from react, json decode it
        $dividendData = json_decode($request->dividend, true);

        // access individual data from react like an array
        $id = $dividendData['id'];
        $date = $dividendData['date'];
        $name = $dividendData['name'];
        $dividend = $dividendData['dividend'];
        
        $dividendOrder = DB::table('dividends')
            -> where('id', $id)
            -> update([
                'date' => $date,
                'dividend' => $dividend,
            ]);
        return $dividendOrder;
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
     */
    public function delete(Request $request)
    {
        $dividend = DB::table('dividends')
            -> where('id', $request->id)
            -> delete();
    }
}
