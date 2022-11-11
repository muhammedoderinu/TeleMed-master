<?php
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\withoutExceptionHandling;


uses(RefreshDatabase::class);

it('can update a  user profile', function() {
    $this->seed();
    Storage::fake(User::mediaDisk());
    $input = [
        'phone' => fake()->numerify('###########'),
        'address' => fake()->address(),
        'city' => fake()->city(),
        'avatar' =>  UploadedFile::fake()->image('avatar.jpg'),
        'header' => UploadedFile::fake()->image('header.jpg'),
    ];

    $this->actingAs($user = User::factory()->create())
        ->post(route('profile.update'), $input)
        ->assertSessionHasNoErrors()
        ->assertOk();

         expect($user->phone)->toBe($input['phone'])
         ->and($user->city)->toBe($input['city'])
         ->and($user->address)->toBe($input['address']);

         assertDatabaseCount(Media::class, 2);

         Storage::disk(User::mediaDisk())
            ->assertExists($user->avatarImage->path)
             ->assertExists($user->headerImage->path);
        

});

it('can view users profile', function () {
    $this->get(route('profile', User::factory()->create()))
        ->assertOk();
    

    assertDatabaseCount(User::class, 1);
});
