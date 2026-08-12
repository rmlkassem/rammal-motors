import { RotateCcw } from "lucide-react"

function CarFilter({ filters, setFilters, cars = [] }) {

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "brand") {
      setFilters({
        ...filters,
        brand: value,
        model: "",
      })

      return
    }

    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const resetFilters = () => {
    setFilters({
      brand: "",
      model: "",
      year: "",
      condition: "",
      minPrice: "",
      maxPrice: "",
    })
  }


  // Get unique brands from cars
  const brands = [
    ...new Set(
      cars
        .map((car) => car.brand)
        .filter(Boolean)
    ),
  ].sort()


  // Get unique years from cars
  const years = [
    ...new Set(
      cars
        .map((car) => car.year)
        .filter(Boolean)
    ),
  ].sort((a, b) => b - a)

  // Get models based on selected brand
const models = [
  ...new Set(
    cars
      .filter((car) => {
        if (!filters.brand) {
          return true
        }

        return (
          car.brand?.toLowerCase() ===
          filters.brand.toLowerCase()
        )
      })
      .map((car) => car.model)
      .filter(Boolean)
  ),
].sort()


  return (
    <section dir="rtl" className="bg-[#F8FAFC]">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

          {/* Header */}
          <div className="mb-7">

            <h2 className="text-2xl font-bold text-[#0B3B82]">
              ابحث عن سيارتك
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              استخدم خيارات البحث للوصول إلى السيارة المناسبة
            </p>

          </div>


          {/* Filters */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                الماركة
              </label>

              <select
                name="brand"
                value={filters.brand}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-[#0B3B82]"
              >

                <option value="">
                  جميع الماركات
                </option>

                {brands.map((brand) => (
                  <option
                    key={brand}
                    value={brand}
                  >
                    {brand}
                  </option>
                ))}

              </select>

            </div>


            {/* Model */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                الموديل
              </label>

              <select
                name="model"
                value={filters.model}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-[#0B3B82]"
              >
                <option value="">
                  جميع الموديلات
                </option>

                {models.map((model) => (
                  <option
                    key={model}
                    value={model}
                  >
                    {model}
                  </option>
                ))}
              </select>

            </div>


            {/* Year */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                السنة
              </label>

              <select
                name="year"
                value={filters.year}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-[#0B3B82]"
              >

                <option value="">
                  جميع السنوات
                </option>

                {years.map((year) => (
                  <option
                    key={year}
                    value={year}
                  >
                    {year}
                  </option>
                ))}

              </select>

            </div>


            {/* Condition */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                الحالة
              </label>

              <select
                name="condition"
                value={filters.condition}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-[#0B3B82]"
              >

                <option value="">
                  الكل
                </option>

                <option value="new">
                  جديدة
                </option>

                <option value="used">
                  مستعملة
                </option>

              </select>

            </div>

            {/* Minimum Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                السعر من
              </label>

              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                min="0"
                placeholder="مثال: 10000"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-[#0B3B82]"
              />
            </div>


            {/* Maximum Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                السعر إلى
              </label>

              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                min="0"
                placeholder="مثال: 50000"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-[#0B3B82]"
              />
            </div>


            {/* Reset */}
            <div className="flex items-end">

              <button
                type="button"
                onClick={resetFilters}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#0B3B82] px-5 py-3 font-semibold text-[#0B3B82] transition hover:bg-blue-50"
              >

                <RotateCcw size={18} />

                مسح الفلاتر

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default CarFilter