<?php

namespace App\Http\Controllers;

use App\Events\MeetingIdCreated;
use App\Events\VideoSignallingCreated;
use App\Models\InAppNotification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VideoServiceController extends Controller
{
    public function index(Request $request){
        event(new VideoSignallingCreated( $request->input('message')));
        
    }

    public function generate(Request $request){
         $meeting_id = Str::random(8);
      
         if ($request->wantsJson()) {
            return $meeting_id;
        }
    }

    public function store(User $user, Request $request){
        $request->validate([
            'user_id' => 'required',
            'meetingId' => 'required'
        ]);

        $notification =  InAppNotification::create([
            'user_id' => $user->id,
            'meetingId' => $request->meeting_id
         ]);

         event(new MeetingIdCreated($notification, $user));
    }
}
