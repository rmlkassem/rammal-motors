<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function index()
    {
        // General statistics
        $totalCars = Car::count();

        $availableCars = Car::where(
            'status',
            'available'
        )->count();

        $soldCars = Car::where(
            'status',
            'sold'
        )->count();

        $totalCommission = Car::where(
            'status',
            'sold'
        )->sum('commission');

        $salesHistory = Car::where('status', 'sold')
            ->whereNotNull('sold_at')
            ->orderByDesc('sold_at')
            ->get([
                'id',
                'brand',
                'model',
                'year',
                'price',
                'commission',
                'sold_at',
            ]);


        // Monthly sales + commission
        $monthlySales = Car::where('status', 'sold')
            ->whereNotNull('sold_at')
            ->select(
                DB::raw("YEAR(sold_at) as year"),
                DB::raw("MONTH(sold_at) as month"),
                DB::raw("COUNT(*) as cars_sold"),
                DB::raw("COALESCE(SUM(commission), 0) as commission")
            )
            ->groupBy(
                DB::raw("YEAR(sold_at)"),
                DB::raw("MONTH(sold_at)")
            )
            ->orderBy(
                DB::raw("YEAR(sold_at)")
            )
            ->orderBy(
                DB::raw("MONTH(sold_at)")
            )
            ->get();


        return response()->json([
            'total_cars' => $totalCars,
            'available_cars' => $availableCars,
            'sold_cars' => $soldCars,
            'total_commission' => $totalCommission,
            'monthly_sales' => $monthlySales,
            'sales_history' => $salesHistory,
        ]);
    }
}