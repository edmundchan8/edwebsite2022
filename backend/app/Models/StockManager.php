<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockManager extends Model
{
    use HasFactory;

       /**
     * The table associated with the model.
     *
     * @var string
     */
    // protected $table = 'stock_orders';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    protected $fillable = [
        'list',
    ];
}
