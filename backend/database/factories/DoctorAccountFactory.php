<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DoctorAccount>
 */
class DoctorAccountFactory extends Factory
{
    
    /**
     * 
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'specialization' => $this->faker->word(),
            'pin'           => $this->faker->numerify('####'),
            'user_id'       => User::factory()
        ];
    }
}
