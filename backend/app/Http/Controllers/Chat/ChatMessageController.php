<?php

namespace App\Http\Controllers\Chat;

use App\Events\ChatMessageCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\DeleteChatRequest;
use App\Http\Requests\UpdateChatRequest;
use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\MediaType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class ChatMessageController extends Controller
{

    public function index(User $client, Request $request){
        $user = $request->user();
        foreach($user->chats as $chat){
           if($chat->users->contains($client->id)){
            return to_route('chats-show', $chat);
           }
        }
    
        return (['message' => 'invalid']);

    }
    public function store(Request $request, Chat $chat)
    {
        abort_if($chat->users->pluck('id')->doesntContain($request->user()->id), 403);

        $chatMessageData = $request->validate([
            'content' => 'nullable|string',
        ]);

        $request->validate([
            'images' => 'nullable|array',
            'images.*' => 'file|image',
        ]);

        /** @var User $user */
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

    public function destroy(ChatMessage $message, DeleteChatRequest $request)
    {
        $message->delete();

        return back();
    }

    public function update(ChatMessage $message, UpdateChatRequest $request)
    {
        abort_if(now()->diffInMinutes($message->created_at) > 90, 403, 'This message cannot be updated');

        // TODO add edited_at column
        $message->update($request->validated());

        return back();
    }
}
