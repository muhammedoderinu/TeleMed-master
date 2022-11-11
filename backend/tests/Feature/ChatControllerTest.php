<?php

use App\Events\ChatMessageCreated;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Chat;
use App\Models\ChatMessage;
use Illuminate\Testing\Fluent\AssertableJson;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseCount;
use function PHPUnit\Framework\assertContains;
use Illuminate\Support\Facades\Event;
use function PHPUnit\Framework\assertEquals;

uses(RefreshDatabase::class);

it('can view chats', function() {
    $user = User::Factory()
        ->has(Chat::factory(5)
            ->has(ChatMessage::factory(), 'messages')
        )->create();

        $response = actingAs($user)
        ->get(route('chats.index'))
            ->assertOk();

        $response->assertJson(fn (AssertableJson $assertableJson) =>
                            $assertableJson->has('chats', 5)
                            ->dump()
                            ->etc());
});

it('can create a chat', function(){
    $anotherUser = User::factory()->create();
    $response = actingAs($user = User::factory()->create())->post(route('chats.store'), ['users' => [$anotherUser->id], 'content' => fake()->word])
    ->assertOk();
    assertDatabaseCount(Chat::class, 1);
    $chat = Chat::first();
   $users = $chat->users->pluck('id');
    assertContains($anotherUser->id, $users);
    assertContains($user->id, $users);

    Event::fake([\App\Events\ChatMessageCreated::class]);

   // Event::assertDispatched(ChatMessageCreated::class);
    Event::assertDispatched(ChatMessageCreated::class, function ($e) use ($chat) {
        return true; //$e->order->id === $chat->id;
    });

});

it('users can view messages', function(){

    $chat = Chat::factory()->create();
    $user = User::factory()->create();
    $chat->users()->attach($user);

    $response = actingAs($user)
    ->get(route('chats.show', $chat))
    ->assertOk();
    $response->assertJson(fn (AssertableJson $assertableJson) =>
                        $assertableJson->hasAll(['messages', 'chat'])
                        ->etc());

});


