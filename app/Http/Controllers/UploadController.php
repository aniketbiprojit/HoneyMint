<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;

class UploadController extends Controller
{
    public function index(Request $request){
        $imageName = time().'.'.$request->image->extension();  
        $request->image->move(public_path('images'), $imageName);
        // App\Poster::insert([]);
        // Auth::user->
        return 'ok';
    }
}
