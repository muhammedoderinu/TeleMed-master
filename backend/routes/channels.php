<?php

use App\Models\Chat;
use App\Models\ChatMessage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat.{chatId}', function ($user, $roomId) {
    //return Auth::check();
    return ['id' => $user->id, 'username' => $user->username];
    
});

Broadcast::channel('video.{roomId}', function ($user, $roomId) {
    //return Auth::check();
    return ['id' => $user->id, 'username' => $user->username];
    
});

Broadcast::channel('{userId}', function ($user, $roomId) {
    //return Auth::check();
    //return $user->id === $chat->n
    return true;
    
});