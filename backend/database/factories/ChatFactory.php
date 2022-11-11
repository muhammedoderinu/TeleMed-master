<?php

namespace Database\Factories;

use App\Models\Chat;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chat>
 */
class ChatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Chat::class;
    public function definition()
    {
        return [
            'name' => $this->faker->word(),
        ];
    }

    public function group(): self
    {
        return $this->state(['is_group' => true]);
    }
}

