<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Log;


use App\Poster;
use App\User;
class UploadController extends Controller
{
        public function index(Request $request){

            $userId = $request->userId;

            $data = User::find($userId)->get()[0];
            if($data->allowedPosts > $data->currentPosts){
            
            $imageName = time().'.'.$request->image->extension();  
            $folder = 'images/'.$userId.'/';
            $request->image->move(public_path($folder), $imageName);
            Log::info($folder);
            Poster::insert(['path'=>$folder.$imageName, 'user_id'=>$userId]);
            
            $user = User::find($userId);
            $user->currentPosts = $user->currentPosts + 1;
            error_log($user);
            $user->save();
            
            return 'ok';
        }
    }
}