@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                    @endif
                    <!-- You are logged in {{Auth::user()->name}}! -->
                    <!-- <div id="example"> -->
                    <?php
                        $id=Auth::user()->id;
                        $user=App\User::find($id)->get()[0];
                        $posters = App\Poster::where('user_id',$user['id'])->get();
                        
                        $remainingPosts = -($user['currentPosts']-$user['allowedPosts']);
                        ?>
                    <h3>

                        <table style='width:100%;'>
                            <tr>
                                <td>Uploaded Posts:{{$user['currentPosts']}}</td>
                                <td>Remaining Posts:{{$remainingPosts}}</td>
                            </tr>
                        </table>
                    </h3>



                    <div class="uploadWrapper">
                        <form id="imageUploadForm" class="imageUploadForm">
                            <span class="helpText" id="helpText">Upload an image</span>
                            <input type='file' id="file" class="uploadButton" accept="image/*" />
                            <div id="uploadedImg" class="uploadedImg">
                                <span class="unveil"></span>
                            </div>
                            <span class="pickFile">
                                <a href="#" class="pickFileButton">Pick file</a>
                            </span>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection