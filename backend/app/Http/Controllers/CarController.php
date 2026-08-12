<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use App\Models\CarImage;
use Illuminate\Support\Facades\Storage;
use ImageKit\ImageKit;

class CarController extends Controller
{
    private function imageKit(): ImageKit
    {
        return new ImageKit(
            config('services.imagekit.public_key'),
            config('services.imagekit.private_key'),
            config('services.imagekit.url_endpoint')
        );
    }
    public function index()
    {
        $cars = Car::with('images')
            ->where('status', 'available')
            ->latest()
            ->get();

        return response()->json($cars);
    }

    public function show($id)
    {
        $car = Car::with('images')->find($id);

        if (!$car) {
            return response()->json([
                'message' => 'Car not found'
            ], 404);
        }

        return response()->json($car);
    }
    public function markAsSold(Request $request, Car $car)
    {
        $validated = $request->validate([
            'commission' => ['required', 'numeric', 'min:0'],
            'sold_at' => ['required', 'date'],
        ]);

        $car->update([
            'status' => 'sold',
            'commission' => $validated['commission'],
            'sold_at' => $validated['sold_at'],
        ]);

        return response()->json([
            'message' => 'Car marked as sold successfully.',
            'car' => $car->fresh(),
        ]);
    }

    public function markAsAvailable(Car $car)
    {
        $car->update([
            'status' => 'available',
            'commission' => null,
            'sold_at' => null,
        ]);

        return response()->json([
            'message' => 'Car marked as available successfully.',
            'car' => $car->fresh(),
        ]);
    }

    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:2100',
            'price' => 'required|numeric|min:0',
            'mileage' => 'nullable|integer|min:0',
            'color' => 'nullable|string|max:255',
            'transmission' => 'nullable|string|max:255',
            'fuel_type' => 'nullable|string|max:255',
            'condition' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|max:255',
            'images' => 'nullable|array|max:15',
            'images.*' => 'image|mimes:jpeg,jpg,png,webp|max:5120',
        ]);

        $car = Car::create($validated);

        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $index => $image) {

                $result = $this->imageKit()->upload([
                    'file' => base64_encode(file_get_contents($image->getRealPath())),
                    'fileName' => uniqid() . '_' . $image->getClientOriginalName(),
                    'folder' => '/rammal-motors/cars',
                ]);

                CarImage::create([
                    'car_id' => $car->id,
                    'image_path' => $result->result->url,
                    'imagekit_file_id' => $result->result->fileId,
                    'position' => $index,
                ]);
            }
        }

        $car->load('images');

        return response()->json($car, 201);
    }
    public function adminIndex()
    {
        $cars = Car::with('images')
            ->latest()
            ->get();

        return response()->json($cars);
    }
    public function update(Request $request, $id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json([
                'message' => 'Car not found'
            ], 404);
        }

        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:2100',
            'price' => 'required|numeric|min:0',
            'mileage' => 'nullable|integer|min:0',
            'color' => 'nullable|string|max:255',
            'transmission' => 'nullable|string|max:255',
            'fuel_type' => 'nullable|string|max:255',
            'condition' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|max:255',
        ]);

        $car->update($validated);

        return response()->json($car);
    }
    public function destroy($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json([
                'message' => 'Car not found'
            ], 404);
        }

        $car->delete();

        return response()->json([
            'message' => 'Car deleted successfully'
        ]);
    }
    public function addImages(Request $request, $id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json([
                'message' => 'Car not found'
            ], 404);
        }

        $request->validate([
            'images' => 'required|array|max:15',
            'images.*' => 'image|mimes:jpeg,jpg,png,webp|max:5120',
        ]);

        $currentPosition = $car->images()->max('position') ?? -1;

        foreach ($request->file('images') as $index => $image) {

            $result = $this->imageKit()->upload([
            'file' => base64_encode(
                file_get_contents($image->getRealPath())
            ),
            'fileName' => uniqid() . '_' . $image->getClientOriginalName(),
            'folder' => '/rammal-motors/cars',
        ]);

        CarImage::create([
            'car_id' => $car->id,
            'image_path' => $result->result->url,
            'imagekit_file_id' => $result->result->fileId,
            'position' => $currentPosition + $index + 1,
        ]);
        }

        $car->load('images');

        return response()->json($car);
    }
    public function deleteImage($id)
    {
        $image = CarImage::find($id);

        if (!$image) {
            return response()->json([
                'message' => 'Image not found'
            ], 404);
        }

        if ($image->imagekit_file_id) {
            $this->imageKit()->deleteFile(
                $image->imagekit_file_id
            );
        }

        $image->delete();

        return response()->json([
            'message' => 'Image deleted successfully'
        ]);
    }
}