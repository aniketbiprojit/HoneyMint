<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Poster extends Model
{
    protected $fillable = [
        'path', 'user_id'
    ];

    public $timestamps = true;
}
