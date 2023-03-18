<?php

namespace App\Http\Controllers;

use DB;
use App\Models\StockManager;
use App\Models\StockOrder;
use Illuminate\Http\Request;
//set up logging of errors
use Illuminate\Support\Facades\Log;

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
            'date',
            'owner'
        ]);

        //set variables to request data (apart from owner and date)
        $tickerSymbol = $request->tickerSymbol;
        $price = $request->price;
        $quantity = $request->quantity;

        // set default owner to by Edmund
        $request->owner == null ? $owner = "Edmund" : $owner = $request->owner;

        $ownerData = DB::table('owners')
        ->where('name', $owner)
        ->get();

        $ownerId = json_decode($ownerData, true)[0]['id'];

        // set date to default/current date
        $request->date == null ? $date = date("Y-m-d") : $date = $request->date;

        // add stock to database
        DB::table('stock_orders')->insert(
            ['tickerSymbol' => $tickerSymbol, 
            'price' => $price, 
            'quantity' => $quantity, 
            'date' => $date, 
            'ownerID' => $ownerId]
        );

        return $request;
    }

/**
     * Shows individual orders 
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $tickerSymbol = $request->tickerSymbol;

        $data = DB::table('stock_orders')
        -> join('stock_data', 'stock_orders.tickerSymbol', '=', 'stock_data.tickerSymbol')
        -> leftjoin('owners', 'stock_orders.ownerID', '=', 'owners.id')
        -> select('stock_orders.id', 'stock_orders.date', 'stock_data.name', 'stock_orders.tickerSymbol', 'stock_data.price as currentPrice',
        'stock_orders.ownerID', 'stock_orders.quantity', 'stock_orders.price', 'owners.name')
        -> where('stock_orders.tickerSymbol', '=', $request->tickerSymbol)
        -> orderBy('stock_orders.date')
        -> get();

    return $data;
    }



    /**
     * Shows all orders 
     *
     * @return \Illuminate\Http\Response
     */
    public function showAll(Request $request)
    {
        $owner_param = null;
        $request->owner != 'Any' ? $owner_param = $request->owner : $owner_param = '%';

        $data = DB::table('stock_orders')
            ->join('stock_data', 'stock_orders.tickerSymbol', '=', 'stock_data.tickerSymbol')
            ->join('owners', 'stock_orders.ownerID', '=', 'owners.id' )
            ->select(
                'stock_data.name',
                'stock_orders.tickerSymbol',
                DB::raw('SUM(stock_orders.quantity) as quantity'), 
                DB::raw('SUM(stock_orders.quantity * stock_orders.price) as totalInvested'),
                DB::raw('SUM(stock_orders.quantity * stock_data.price) as currentValue'),
                DB::raw('SUM(stock_orders.quantity * stock_orders.price) / SUM(stock_orders.quantity) as breakPrice'))
            ->groupBy('stock_orders.tickerSymbol', 'stock_data.name')
            ->where('owners.name', 'like', $owner_param)
            ->get();

        return $data;
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StockManager  $stockManager
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        // get data from react, json decode it
        $orderData = json_decode($request->order, true);

        // access individual data from react like an array
        $id = $orderData['id'];
        $date = $orderData['date'];
        $name = $orderData['name'];
        $tickerSymbol = $orderData['tickerSymbol'];
        $quantity = $orderData['quantity'];
        $price = $orderData['price'];
        
        //get owner in to use in update query below
        $ownerQuery = DB::table('owners')
            ->where('name', '=', $name)
            ->get();

        // json decode the query from owners, get the array then id element, pass this to update
        $ownerId = json_decode($ownerQuery, true)[0]['id'];

        $order = DB::table('stock_orders')
            -> where('id', $id)
            -> update([
                'ownerID' => $ownerId,
                'date' => $date,
                'tickerSymbol' => $tickerSymbol,
                'quantity' => $quantity,
                'price' => $price,
            ]);
        return $order;
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
    public function delete(Request $request)
    {
        Log::info($request->id);
        $order = DB::table('stock_orders')
            -> where('id', $request->id)
            -> delete();
    }
}
