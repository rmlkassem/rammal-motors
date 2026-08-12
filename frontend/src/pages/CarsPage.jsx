import { useEffect, useState } from "react"
import api from "../api/axios"

import CarFilter from "../components/CarFilter"
import AvailableCars from "../components/AvailableCars"

function CarsPage() {
  const [cars, setCars] = useState([])

  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    year: "",
    condition: "",
    minPrice: "",
    maxPrice: "",
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/cars")

        setCars(response.data)
      } catch (error) {
        console.error(error)
        setError("حدث خطأ أثناء تحميل السيارات")
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  return (
    <main className="min-h-screen bg-[#F7F9FC]">

      {/* Page heading */}
      <section className="mx-auto max-w-7xl px-6 pt-12">

        <h1 className="text-3xl font-bold text-[#0B3B82] md:text-4xl">
          جميع السيارات
        </h1>

        <p className="mt-2 text-gray-600">
          ابحث وتصفّح السيارات المتوفرة حالياً
        </p>

      </section>


      {/* Filter */}
      <CarFilter
        filters={filters}
        setFilters={setFilters}
        cars={cars}
      />

      {/* Cars */}
      <AvailableCars
        cars={cars}
        filters={filters}
        loading={loading}
        error={error}
      />

    </main>
  )
}

export default CarsPage