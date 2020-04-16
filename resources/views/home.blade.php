@extends('layouts.app')

@section('content')

<?php
$user = Auth::user()->id;
$userData = App\User::find($user);
$posters = App\Poster::where('user_id',$user)->get();
$url= URL::to('/') ;
// echo session()->get('key');
// echo 'ok';
?>

<div id="index" userid="{{ $user }}" userdata={{$userData}} poster={{$posters}} url={{$url}}>

    <div className="card-body">
        <div className="row">
            <div className="col-md-6">
                Uploaded Posts :{" "}
                {{$userData->currentPosts}}
            </div>
            <div className="col-md-6">
                Remaining Posts:
                {{$userData->allowedPosts -
                $userData->currentPosts}}
            </div>
        </div>
    </div>
</div>

@endsection