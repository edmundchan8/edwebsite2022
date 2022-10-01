<?php

namespace App\Http\Controllers;

use DB;
use App\Models\StockManager;
use App\Models\StockOrder;
use Illuminate\Http\Request;

class StockManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // get $data by joining the stock_orders, stock_data and owner tables together based on their ticker symbol and owner ids
        // select gets the data we need
        $data = DB::table('stock_data')
            -> orderBy('tickersymbol')
            -> get();
        

        return $data;   //response()->json($data);
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
        $data = DB::table('stock_orders')
            ->join('stock_data', 'stock_orders.tickerSymbol', '=', 'stock_data.tickerSymbol')
            ->select(
                'stock_data.name',
                'stock_orders.tickerSymbol', 
                DB::raw('SUM(stock_orders.quantity) as quantity'), 
                DB::raw('SUM(stock_orders.quantity * stock_orders.price) as totalInvested'),
                DB::raw('SUM(stock_orders.quantity * stock_data.price) as currentValue'))
            ->groupBy('stock_orders.tickerSymbol', 'stock_data.name')
            ->get();

        return $data;
    }


    /**
     * Shows individual orders 
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $data = DB::table('stock_orders')
        -> join('stock_data', 'stock_orders.tickerSymbol', '=', 'stock_data.tickerSymbol')
        -> leftjoin('owners', 'stock_orders.owner', '=', 'owners.owner')
        -> select('stock_orders.date', 'stock_data.name', 'stock_orders.tickerSymbol', 
        'stock_orders.owner', 'stock_orders.quantity', 'stock_orders.price', 'stock_orders.owner')
            // DB::raw('SUM(stock_orders.quantity) as quantity'), 
            // DB::raw('SUM(stock_orders.quantity * stock_orders.price) as totalInvested'),
            // DB::raw('SUM(stock_orders.quantity * stock_data.price) as currentValue'))
        -> where('stock_orders.tickerSymbol', '=', $request->tickerSymbol)
        // -> orderBy('stock_orders.date')
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
