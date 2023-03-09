<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\Middleware\ShareErrorsFromSession;
//set up logging of errors
use Illuminate\Support\Facades\Log;

class StockDataController extends Controller
{
    public function index()
    {
        // current stocks I own, obtained from database and with foreach loop
        $stocks = DB::table('stock_data')
        -> select('tickersymbol')
        -> get();

        $new_arr = [];
        foreach(json_decode($stocks) as $key => $value){
            array_push($new_arr, $value->tickersymbol);
        }

        // current stocks I own as a single string
        $ticker_stock_str = implode(",", $new_arr);

        
        $stock_table_columns = ['symbol', 'twoHundredDayAverage', 'regularMarketPrice', 'forwardPE', 
        'lastDividendValue', 'recommendationMean', 'recommendationKey'];

        $API_KEY = env('APP_API_KEY');

        //loop through and get api data of each stock of our $ticker_stock_str
        $stock_url = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/" . $ticker_stock_str;

            // Initiate the curl request
        $ch = curl_init();//$stock_url);

        // BEGIN API CALL
        $json = null;

        curl_setopt_array($ch, [
            CURLOPT_URL => $stock_url,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "X-RapidAPI-Key: " . $API_KEY,
                "X-RapidAPI-Host: yahoo-finance15.p.rapidapi.com",
                "content-type: application/x-www-form-urlencoded"
            ],
        ]);

        // send the request and get a bool response from it
        $response = curl_exec($ch);
        sleep(1);
        //capture any errors if exec above fails
        $err = curl_error($ch);
        // close the session and free up resources
        curl_close($ch);

        $stock_data_array = null;

        if ($err){
            echo 'cURL Error #:' . $err;
        }
        else{
            //$json should return all stocks, each as an array
            $json = json_decode($response, true);
        }

        // END OF API CALL

        // BEGIN WORKING ON $JSON DATA TO GET STOCK INFO

                // if data exists, set stock_data_array
                // if (array_key_exists('data', $json)){
                //     $stock_data_array = $json['data'];
                // }
                // else {
                //     // 'data' doesn't exists in $json, output message to see why
                //     Log::Error($json['message']);
                //     return $json;
                // }

        foreach ($json as $key => $stock_data){

            $quote_array = $stock_data;

            $forwardPE = null;
            $trailingDivRate = null;
            $recommendationMean = 'null';
            $recommendationKey = 'null';

            // if below quotes don't exist, set to null
            isset($quote_array['forwardPE']) ? $forwardPE = $quote_array['forwardPE'] : '';
            isset($quote_array['trailingAnnualDividendRate']) ? $trailingDivRate = $quote_array['trailingAnnualDividendRate'] : '';

            // set recommendationMean to null, or if available split rating and buy/sell/hold value out
            // isset($quote_array['recommendationMean']) ? $recommendationMean = $quote_array['recommendationMean'] : '';

            // set recommendationKey rating to null, or if available split rating and buy/sell/hold value out
            // isset($quote_array['recommendationKey']) ? $recommendationKey = $quote_array['recommendationKey'] : '';


            //recommendationKey
            $stock_data_table = DB::table('stock_data');

            if ($stock_data_table->where('tickerSymbol', $quote_array['symbol'])->exists()){
                $current_stock = $stock_data_table->where('tickerSymbol', $quote_array['symbol'])->first();
                $stock_data_table
                    ->where('id', $current_stock->id)
                    ->limit(1)
                    ->update([
                    'tickerSymbol' => $quote_array['symbol'],
                    'twoHundredDayAverage' => $quote_array['twoHundredDayAverage'],
                    'price' => $quote_array['regularMarketPrice'],
                    'forwardPE' => $forwardPE,
                    'dividendRate' => $trailingDivRate,
                    // 'analystRating' => $recommendationMean,
                    // 'analystOpinion' => $recommendationKey,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
            }
            else{
                $stock_data_table
                    ->insert([
                    'tickerSymbol' => $quote_array['symbol'],
                    'twoHundredDayAverage' => $quote_array['twoHundredDayAverage'],
                    'price' => $quote_array['regularMarketPrice'],
                    'forwardPE' => $forwardPE,
                    'dividendRate' => $trailingDivRate,
                    // 'analystRating' => $recommendationMean,
                    // 'analystOpinion' => $recommendationKey,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
            }

        }
        
        return "Stocks Updated!";// view('data.index');
    }

    public function updateIncomeData(Request $request){
        
        // get model for the stock data incomeStatement only
        $stock_income_statement = DB::table('stock_data')
            -> where('tickersymbol', $request->stock)
            -> first(['incomeStatement'])->incomeStatement;

        $output_json = [];

        // make sure incomeStatement is not null, otherwise create the new incomeStatement json
        if (!is_null($stock_income_statement)){
            $output_json[$request->stock] = [];
            $output_json = $output_json;
        } else {
            $output_json = $stock_income_statement;
        }

        $API_KEY = env('APP_API_KEY');

        $stock_url = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/" . $request->stock . "/income-statement";

        // Initiate the curl request
        $ch = curl_init();

        // BEGIN API CALL
        $json = null;

        curl_setopt_array($ch, [
            CURLOPT_URL => $stock_url,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "X-RapidAPI-Key: " . $API_KEY,
                "X-RapidAPI-Host: yahoo-finance15.p.rapidapi.com",
                "content-type: application/x-www-form-urlencoded"
            ],
        ]);

        // send the request and get a bool response from it
        $response = curl_exec($ch);
        sleep(1);
        //capture any errors if exec above fails
        $err = curl_error($ch);
        // close the session and free up resources
        curl_close($ch);

        $stock_data_array = null;

        if ($err){
            echo 'cURL Error #:' . $err;
        }
        else{
            //$json should return all stocks, each as an array
            $json = json_decode($response, true);
        }

        $json_quarterly = $json['incomeStatementHistoryQuarterly']['incomeStatementHistory'];

        $json_quarterly = $json['incomeStatementHistoryQuarterly']['incomeStatementHistory'];
        $json_history = $json['incomeStatementHistory']['incomeStatementHistory'];

        $stock_income_data = array_merge($json_quarterly, $json_history);

        $new_output_json = $output_json;

        foreach($stock_income_data as $key => $data){

            $date = $stock_income_data[$key]['endDate']['fmt'];
            
            // only add the income statement if $date doesn't exists in decoded_output json
            if (!array_key_exists($date, $new_output_json[$request->stock])){
                // build grossProfit and SBC data array
                $profit_compensation_data = [];
                $profit_compensation_data['grossProfit'] = $stock_income_data[$key]['grossProfit']['raw'];
                $profit_compensation_data['stockCompensation'] = $stock_income_data[$key]['netIncomeApplicableToCommonShares']['raw'];

                // set grossProfit and stockCompensation data => date
                $new_output_json[$request->stock][$date] = $profit_compensation_data;
            }

        }

        $new_output_json = json_encode($new_output_json);

        
        if ($new_output_json !== $output_json){
            //then we will add and update the database
            
            $stock_table = DB::table('stock_data')
                -> where('tickersymbol', $request->stock)
                -> limit(1)
                -> update(['incomeStatement' => $new_output_json]);


        }

        return "income statement updated!";//$output_json;
    }

    public function getIncomeData(Request $request){
        $income_data = DB::table('stock_data')
            -> where('tickersymbol', $request->stock)
            ->get();

        return $income_data;
    }
}
