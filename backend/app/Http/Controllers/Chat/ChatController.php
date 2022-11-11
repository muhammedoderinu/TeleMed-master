<?php

namespace App\Http\Controllers\Chat;

use App\Events\ChatMessageCreated;
use App\Http\Controllers\Controller;
use App\Models\ChatUser;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\MediaType;
use Illuminate\Http\UploadedFile;
use App\Models\ChatMessage;
use App\Models\Chat;

class ChatController extends Controller
{
    public function index(Request $request){
        $user = $request->user();
        $chats = $user->chats()
                ->with(['lastMessage'=>['user'],'users'])
                ->latest('updated_at')
                ->get();

        return (['chats' => $chats]);
    }

    public function store(Request $request){
        $users = $request->input('users');
        $user_id = $users[0];
        $client = User::where('id',$user_id)->first();

        foreach($request->user()->chats as $chat){
            $room = $chat->users;
            if($room->contains($client->id)){
                abort_if($chat->users->pluck('id')->doesntContain($request->user()->id), 403);
                $chatMessageData = $request->validate([
                    'content' => 'nullable|string',
                ]);
                $request->validate([
                    'images' => 'nullable|array',
                    'images.*' => 'file|image',
                ]);
                $user = $request->user();
                $chatMessage = $chat->messages()->create([...$chatMessageData, 'user_id' => $user->id]);
        
                if ($request->hasFile('images') && count($request->file('images')) > 0) {
                    $type = MediaType::where('name', 'image')->first();
                    $values = collect($request->file('images'))->map(function (UploadedFile $file) use ($type) {
                        $path = $file->storePublicly(ChatMessage::mediaDir(), $disk = ChatMessage::mediaDisk());
                        return ['path' => $path, 'disk' => $disk, 'type_id' => $type->id];
                    })->all();
                    $chatMessage->media()->createMany($values);
                }

        
                event(new ChatMessageCreated($chatMessage));
                return to_route('chats-show', $chat);
            }
        }

        $chatData = $request->validate([
            'name' => 'required_if:is_group,true',
            'is_group' => 'boolean',
            'users' => 'required|array|min:1',
            'users.*' => 'required|exists:users,id',
        ]);
        $chatMessageData = $request->validate([
            'content' => 'required|string',
        ]);
        $request->validate([
            'images' => 'nullable|array',
            'images.*' => 'file|image',
        ]);
         $user = $request->user();
         $users = $request->input('users');
         $chat = $user->chats()->create($chatData);
         $chat->users()->attach($users);
         $chatMessage = $chat->messages()->create([...$chatMessageData, 'user_id' => $user->id]);

         if ($request->hasFile('images') && count($request->file('images')) > 0) {
            $type = MediaType::where('name', 'image')->first();
            $values = collect($request->file('images'))->map(function (UploadedFile $file) use ($type) {
                $path = $file->storePublicly(ChatMessage::mediaDir(), $disk = ChatMessage::mediaDisk());
                return ['path' => $path, 'disk' => $disk, 'type_id' => $type->id];
            })->all();
            $chatMessage->media()->createMany($values);
        }

        event(new ChatMessageCreated($chatMessage));
        return to_route('chats-show', $chat);
    }

    public function show(Chat $chat, Request $request){
        abort_if($chat->users()->pluck('id')->doesntContain($request->user()->id) , 403);
        $messages = $chat->messages()
                    ->with(['media','user', 'chat'])
                    ->cursorPaginate(100);
                    
        if ($request->wantsJson()) {
            return $messages;
        }
        $chats = $request->user()
        ->chats()
        ->with(['lastMessage',  'users', 'chat'])
        ->latest('updated_at')
        ->get();
        return (['chats' => $chats,
                'chat' => $chat,
                'messages' => $messages]);
     }

}
