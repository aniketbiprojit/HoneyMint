@extends('layouts.app')

@section('content')

<?php
$user = Auth::user()->name;
?>

<div id="index" data="{{ $user }}">
</div>

@endsection