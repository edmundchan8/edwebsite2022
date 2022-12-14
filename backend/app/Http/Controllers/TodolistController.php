<?php

namespace App\Http\Controllers;

use App\Models\Todolist;
use Illuminate\Http\Request;
//set up logging of errors
use Illuminate\Support\Facades\Log;

class TodolistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // log::info(response()->json(Todolist::all()));
        return response()->json(Todolist::all());
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Todolist  $todolist
     * @return \Illuminate\Http\Response
     */
    public function show(Todolist $todolist)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Todolist  $todolist
     * @return \Illuminate\Http\Response
     */
    public function edit(Todolist $todolist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Todolist  $todolist
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Todolist $todolist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Todolist  $todolist
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todolist $todolist)
    {
        //
    }
}
