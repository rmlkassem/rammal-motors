<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Car extends Model
{
    protected $fillable = [
        'brand',
        'model',
        'year',
        'price',
        'mileage',
        'color',
        'transmission',
        'fuel_type',
        'condition',
        'description',
        'status',
        'commission',
        'sold_at',
    ];
    protected $casts = [
        'sold_at' => 'datetime',
        'commission' => 'decimal:2',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(CarImage::class)
            ->orderBy('position');
    }
}