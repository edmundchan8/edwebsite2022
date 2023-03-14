<?php

namespace App\Http\Controllers;

use App\Models\Tcg;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use DB;

class TcgsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('tcgs')
        ->get();
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
            'tcgName' => 'required'
        ]);

        $tcg = new Tcg;
        $tcg->name = $request->tcgName;
        $tcg->buyPrice = $request->buyPrice;
        $tcg->sellPrice = $request->sellPrice;
        $tcg->fees = $request->fees;
        $tcg->shipping = $request->shippingPaid;
        $tcg->imagePath = $request->imagePath;

        $tcg->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tcg  $tcg
     * @return \Illuminate\Http\Response
     */
    public function show(Tcg $tcg)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     */
    public function edit(Request $request)
    {
        $product = json_decode($request->product, true);
        
        $id = $product['id'];
        $sellPrice = $product['sellPrice'];
        $shipping = $product['shipping'];
        $fee = $product['fee'];
        
        $tcgProduct = DB::table('tcgs')
            ->where('id', $id)
            ->update([
                'sellPrice' => $sellPrice,
                'shipping' => $shipping,
                'fees' => $fee,
            ]);

        return $tcgProduct;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tcg  $tcg
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tcg  $tcg
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        $tcg = DB::table('tcgs')
            -> where('id', $request->id)
            -> delete();
    }
}
