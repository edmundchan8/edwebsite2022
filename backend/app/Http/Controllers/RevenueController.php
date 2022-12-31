<?php

namespace App\Http\Controllers;

use DB;
// use App\Models\Revenue;
// use App\Http\Controllers\RevenueController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RevenueController extends Controller
{
    /**
        * Display a listing of the resource.
        *
        * @return Response
        */
    public function index()
    {
        return DB::table('revenue')
            ->get();
    }

    /**
        * Show the form for creating a new resource.
        *
        * @return Response
        */
    public function create()
    {
        //
    }

    /**
        * Store a newly created resource in storage.
        *
        * @return Response
        */
    public function store($request)
    {

        DB::table('revenue')->insert(
            [
                'boaChecking' => 0.00,
                'boaSavings' => 0.00,
                'becuChecking' => 0.00,
                'becuSavings' => 0.00,
                'ameritrade' => 0.00,
                'americanExpress' => 0.00,
                'iBond' => 0.00,
                'barclays' => 0.00,
                'crypto' => 0.00,
        ]);

        return $request;
    }

    /**
        * Display the specified resource.
        *
        * @param  int  $id
        * @return Response
        */
    public function show($id)
    {
        //
    }

    /**
        * Show the form for editing the specified resource.
        *
        * @param  int  $id
        * @return Response
        */
    public function edit($id)
    {
        //
    }

    /**
        * Update the specified resource in storage.
        *
        * @param  int  $id
        * @return Response
        */
    public function update($id)
    {
  
    }

    /**
        * Update all from the $request
        *
        * @param  Request  $request
        * @return Response
        */
    public function updateAll($request)
    {
        $revenueData = json_decode($request, true);

        // access individual data from react like an array
        $boaChecking = $revenueData['boaChecking'];
        $boaSavings = $revenueData['boaSavings'];
        $becuChecking = $revenueData['becuChecking'];
        $becuSavings = $revenueData['becuSavings'];
        $americanExpress = $revenueData['americanExpress'];
        $ameritrade = $revenueData['ameritrade'];
        $barclays = $revenueData['barclays'];
        $crypto = $revenueData['crypto'];
        $iBond = $revenueData['iBond'];
        
        $revenue = DB::table('revenue')
            -> update([
                'boaChecking' => $boaChecking,
                'boaSavings' => $boaSavings,
                'becuChecking' => $becuChecking,
                'becuSavings' => $becuSavings,
                'americanExpress' => $americanExpress,
                'ameritrade' => $ameritrade,
                'barclays' => $barclays,
                'crypto' => $crypto,
                'iBond' => $iBond
            ]);

        return $revenue;
    }

    /**
        * Remove the specified resource from storage.
        *
        * @param  int  $id
        * @return Response
        */
    public function destroy($id)
    {
        //
    }
}
