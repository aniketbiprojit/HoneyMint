<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/upload','UploadController@index')->name('upload.image.post');
Route::post('/user',function(Request $request){
    // error_log($request->id);
    // error_log(App\User::find($request->id));
    return (App\User::find($request->id));
});
Route::post('/posters',function(Request $request){

return (App\Poster::where('user_id',$request->id)->get());
});