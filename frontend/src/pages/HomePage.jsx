import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api/axios"

import heroImage from "../assets/hero-cars.png"

import CarFilter from "../components/CarFilter"
import AvailableCars from "../components/AvailableCars"
import WhyUs from "../components/WhyUs"
import SocialMedia from "../components/SocialMedia"

function HomePage() {
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    year: "",
    condition: "",
    minPrice: "",
    maxPrice: "",
  })

  const [cars, setCars] = useState([])
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
    <main dir="rtl">

      {/* Hero */}
      <section
        className="relative min-h-[600px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-start justify-center px-6 pt-16 text-center">

          <div className="max-w-3xl">

            <h1 className="text-5xl font-extrabold text-[#082E66] md:text-6xl">
              سيارتك القادمة تبدأ من هنا
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-xl leading-9 text-gray-700">
              تصفّح السيارات المتوفرة، شاهد الصور والمواصفات والأسعار،
              <br className="hidden md:block" />
              وتواصل معنا مباشرة بكل سهولة.
            </p>

            <Link
              to="/cars"
              className="mt-8 inline-block rounded-xl bg-[#0B3B82] px-10 py-4 text-lg font-bold text-white shadow-md transition hover:bg-[#082E66]"
            >
              تصفّح السيارات
            </Link>

          </div>

        </div>
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


      <WhyUs />

      <SocialMedia />

    </main>
  )
}

export default HomePage