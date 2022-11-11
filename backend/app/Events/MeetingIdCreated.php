<?php

namespace App\Events;

use App\Models\InAppNotification;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MeetingIdCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *    string  $meetingId
     *
     * @return void
     */
    public function __construct(private InAppNotification $notification, private User $user)
    {
        $this->user = $user;
        $this->notification= $notification;
    
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel($this->user->id);
    }

    public function broadcastWith(){
        return ['message' => $this->user->inAppNotifications];
      }
}
