<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\MediaType;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Media>
 */
class MediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $model = $this->model();

        return [
            'path' => $this->faker->imageUrl(),
            'type_id' => MediaType::factory(),
            'model_id' => $model::factory(),
            'model_type' => app($model)->getMorphClass(),
        ];
    }

     protected function model()
     {
         return $this->faker->randomElement([User::class]);
     }
    
}
