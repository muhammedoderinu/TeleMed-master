<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasUuidPrimaryKey
{
    // TODO Probably do a check to verify that the key doesn't already exist, very unlikely though.
    protected static function bootHasUuidPrimaryKey(): void
    {
        static::creating(function (Model $model) {
            $model->setAttribute($model->getKeyName(), (string) ($model->getKey() ?? Str::orderedUuid()));
        });
    }

    protected function initializeHasUuidPrimaryKey(): void
    {
        $this->setIncrementing(false)
            ->setKeyType('string');
    }
}