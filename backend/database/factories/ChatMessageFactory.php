<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ChatMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = ChatMessage::class;
    public function definition()
    {
        return [
            'content' => $this->faker->realText(30),
            'chat_id' => Chat::factory(),
            'user_id' => User::factory(),
        ];
    }
}
