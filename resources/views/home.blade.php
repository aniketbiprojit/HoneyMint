@extends('layouts.app')

@section('content')

<?php
$user = Auth::user()->id;
$userData = App\User::find($user);
$posters = App\Poster::where('user_id',$user)->get();
// echo session()->get('key');
// echo 'ok';
?>

<div id="index" userid="{{ $user }}" userdata={{$userData}} poster={{$posters}}>
</div>

@endsection