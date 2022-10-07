<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class StockDataController extends Controller
{
    public function index()
    {
        $ticker_stocks_array = ['AAPL', 'AMZN', 'APAM', 'BEP', 'COST', 'EBET', 'GOOG', 'HAS', 'HD', 'HOOD', 'JEPI', 'JNJ', 'JPM', 'LUMN', 'META', 'MSFT', 
        'O', 'PG', 'PLTR', 'SBUX', 'SCHD', 'TCEHY', 'TROW', 'TSLA', 'VICI', 'BAT-USD', 'BTC-USD', 'ETH-USD', 'LINK-USD'];
        $stock_table_columns = ['symbol', 'twoHundredDayAverage', 'regularMarketPrice', 'forwardPE', 
        'lastDividendValue', 'recommendationMean', 'recommendationKey'];

        // $API_KEY = "x-api-key: 05i93571A13ATlFNYcZW32h8o8WmsCIq8hwIOFUj";

        $API_KEY = env('APP_API_KEY');

        // $default_url = "https://yfapi.net/v7/finance/options/";
        
        // // This will ignore any ssl checks on the url, allowing the api call to go ahead
        // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

        // // attach header to request
        // curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        //loop through and get api data of each stock
        foreach($ticker_stocks_array as $stock){
            //$stock_url = $default_url . $stock;

             // Initiate the curl request
            $ch = curl_init();//$stock_url);

            curl_setopt_array($ch, [
                CURLOPT_URL => "https://yahoo-finance97.p.rapidapi.com/stock-info",
                CURLOPT_SSL_VERIFYPEER => 0,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "symbol=" . $stock,
                CURLOPT_HTTPHEADER => [
                    "X-RapidAPI-Key: " . $API_KEY,
                    "X-RapidAPI-Host: yahoo-finance97.p.rapidapi.com",
                    "content-type: application/x-www-form-urlencoded"
                ],
            ]);

            // send the request and get a bool response from it
            $response = curl_exec($ch);

            //capture any errors if exec above fails
            $err = curl_error($ch);

            // close the session and free up resources
            curl_close($ch);

            $stock_data_array = null;

            if ($err){
                echo 'cURL Error #:' . $err;
            }
            else{
                $json = json_decode($response, true);
                // if(!isset($json['optionChain'])){
                //     return $json;//"May need to update API Key";
                // }
                $stock_data_array = $json['data'];//$json['optionChain']['result'][0];
            }
            //$quote_array = $stock_data_array['quote'];
            $quote_array = $stock_data_array;// = $json['data'];

            $forwardPE = null;
            $trailingDivRate = null;
            $recommendationMean = 'null';
            $recommendationKey = 'null';

            // if below quotes don't exist, set to null
            isset($quote_array['forwardPE']) ? $forwardPE = $quote_array['forwardPE'] : '';
            isset($quote_array['lastDividendValue']) ? $trailingDivRate = $quote_array['lastDividendValue'] : '';

            // set recommendationMean to null, or if available split rating and buy/sell/hold value out
            isset($quote_array['recommendationMean']) ? $recommendationMean = $quote_array['recommendationMean'] : '';

            // set recommendationKey rating to null, or if available split rating and buy/sell/hold value out
            isset($quote_array['recommendationKey']) ? $recommendationKey = $quote_array['recommendationKey'] : '';


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
                    'analystRating' => $recommendationMean,
                    'analystOpinion' => $recommendationKey,
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
                    'analystRating' => $recommendationMean,
                    'analystOpinion' => $recommendationKey,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
            }   
        }
        return "Stocks Updated!";// view('data.index');
    }
}
