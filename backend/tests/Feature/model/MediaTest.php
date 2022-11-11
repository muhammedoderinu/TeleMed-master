<?php

use App\Models\ChatMessage;
use App\Models\Media;
use App\Models\MediaType;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

uses(RefreshDatabase::class);

beforeEach(fn () => $this->model = Media::factory()->create());

test('can create media')->assertDatabaseCount(Media::class, 1);

it('belongs to media type', function () {
    expect($this->model->mediaType)->toBeInstanceOf(MediaType::class);
});

it('belongs to model', function () {
    expect($this->model->model)->toBeTruthy();
});

it('belongs to user', function () {
    $this->model->model()->associate(User::factory()->create());
    expect($this->model->model)->toBeInstanceOf(User::class);
});