import CarCard from "./CarCard"

function AvailableCars({
  cars,
  filters,
  loading,
  error,
}) {

  // Filter cars
  const filteredCars = cars.filter((car) => {
    if (car.status !== "available") {
      return false
    }

    // Brand
    const matchesBrand =
      !filters.brand ||
      car.brand?.toLowerCase() === filters.brand.toLowerCase()

    // Model
    const matchesModel =
      !filters.model ||
      car.model
        ?.toLowerCase()
        .includes(filters.model.toLowerCase())

    // Year
    const matchesYear =
      !filters.year ||
      String(car.year) === filters.year

    // Condition
    const matchesCondition =
      !filters.condition ||
      car.condition?.toLowerCase() ===
        filters.condition.toLowerCase()

    // Minimum price
    const matchesMinPrice =
      !filters.minPrice ||
      Number(car.price) >= Number(filters.minPrice)

    // Maximum price
    const matchesMaxPrice =
      !filters.maxPrice ||
      Number(car.price) <= Number(filters.maxPrice)

    return (
      matchesBrand &&
      matchesModel &&
      matchesYear &&
      matchesCondition &&
      matchesMinPrice &&
      matchesMaxPrice
    )
  })


  return (
    <section
      dir="rtl"
      className="bg-[#F8FAFC] py-14"
    >

      <div className="mx-auto max-w-7xl px-6">

        {/* Section title */}
        <div className="mb-8">

            <h2 className="text-3xl font-bold text-[#0B3B82]">
              السيارات المتوفرة
            </h2>

            {!loading && !error && (
              <p className="mt-2 text-gray-600">
               عدد السيارات: {filteredCars.length}
              </p>
            )}

        </div>


        {/* Loading */}
        {loading && (
          <p className="py-10 text-center text-gray-500">
            جاري تحميل السيارات...
          </p>
        )}


        {/* Error */}
        {error && (
          <p className="py-10 text-center text-red-600">
            {error}
          </p>
        )}


        {/* No matching cars */}
        {!loading && !error && filteredCars.length === 0 && (
          <div className="rounded-xl bg-white px-6 py-12 text-center">

            <p className="font-semibold text-gray-700">
              لا توجد سيارات مطابقة لخيارات البحث
            </p>

            <p className="mt-2 text-sm text-gray-500">
              جرّب تغيير خيارات البحث لعرض المزيد من السيارات
            </p>

          </div>
        )}


        {/* Cars */}
        {!loading && !error && filteredCars.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
              />
            ))}

          </div>
        )}

      </div>

    </section>
  )
}

export default AvailableCars