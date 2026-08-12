import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import api from "../api/axios"

function CarDetailsPage() {
  const { id } = useParams()

  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.get(`/cars/${id}`)
        setCar(response.data)
      } catch (error) {
        console.error(error)
        setError("السيارة غير موجودة")
      } finally {
        setLoading(false)
      }
    }

    fetchCar()
  }, [id])

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-[60vh] items-center justify-center bg-[#F5F8FC]"
      >
        <p className="text-gray-600">
          جاري تحميل السيارة...
        </p>
      </main>
    )
  }

  if (error || !car) {
    return (
      <main
        dir="rtl"
        className="flex min-h-[60vh] items-center justify-center bg-[#F5F8FC]"
      >
        <div className="text-center">

          <h1 className="text-2xl font-bold text-gray-900">
            السيارة غير موجودة
          </h1>

          <Link
            to="/cars"
            className="mt-4 inline-block font-semibold text-[#0B3B82]"
          >
            العودة إلى السيارات
          </Link>

        </div>
      </main>
    )
  }

  const hasImages = car.images && car.images.length > 0

  return (
    <main dir="rtl" className="min-h-screen bg-[#F5F8FC]">

      <div className="mx-auto w-full max-w-5xl px-3 pb-12 pt-6 sm:px-6 sm:py-10">
        {/* Back */}
        <Link
          to="/cars"
          className="mb-5 inline-block text-sm font-medium text-gray-600 transition hover:text-[#0B3B82] sm:mb-6 sm:text-base"
        >
          العودة إلى السيارات
        </Link>


        {/* Main Card */}
        <div className="w-full overflow-hidden rounded-xl bg-white shadow-sm sm:rounded-2xl">

          {/* Gallery */}
          <div className="p-3 sm:p-4">

            {hasImages ? (
              <>
                {/* Main Image */}
                <img
                  src={car.images[selectedImage].image_url}
                  alt={`${car.brand} ${car.model}`}
                  className="h-64 w-full rounded-xl object-cover sm:h-96"
                />

                {/* Thumbnails */}
                {car.images.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-2 sm:mt-4 sm:gap-3">

                    {car.images.map((image, index) => (
                      <button
                        type="button"
                        key={image.id || index}
                        onClick={() => setSelectedImage(index)}
                        className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${
                          selectedImage === index
                            ? "border-[#0B3B82]"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={image.image_url}
                          alt={`${car.brand} ${car.model}`}
                          className="h-16 w-20 object-cover sm:h-20 sm:w-28"
                        />
                      </button>
                    ))}

                  </div>
                )}
              </>
            ) : (
              <div className="flex h-52 items-center justify-center rounded-xl bg-gray-200 sm:h-96">
                <p className="text-xl font-bold text-gray-400 sm:text-4xl">
                لا توجد صور
                </p>
              </div>
            )}

          </div>


          {/* Information */}
          <div className="p-4 sm:p-6">

            {/* Name and price */}
            <div className="mb-8">

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {car.brand} {car.model}
              </h1>

              <p className="mt-2 text-2xl font-bold text-[#0B3B82] sm:text-3xl">
                $
                {Number(car.price).toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </p>

            </div>


            {/* Specifications */}
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              مواصفات السيارة
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">

              {/* Year */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-sm text-gray-500">
                  سنة الصنع
                </p>

                <p className="mt-1 text-base font-bold text-gray-900">
                  {car.year}
                </p>
              </div>


              {/* Mileage */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-sm text-gray-500">
                  المسافة المقطوعة
                </p>

                <p className="mt-1 text-base font-bold text-gray-900">
                  {car.mileage
                    ? Number(car.mileage).toLocaleString("en-US")
                    : "غير محدد"}{" "}
                  {car.mileage && "كم"}
                </p>
              </div>


              {/* Color */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-sm text-gray-500">
                  اللون
                </p>

                <p className="mt-1 text-base font-bold text-gray-900">
                  {car.color || "غير محدد"}
                </p>
              </div>


              {/* Transmission */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-sm text-gray-500">
                  ناقل الحركة
                </p>

                <p className="mt-1 text-base font-bold text-gray-900">
                  {car.transmission === "automatic"
                    ? "أوتوماتيك"
                    : car.transmission === "manual"
                    ? "يدوي"
                    : car.transmission || "غير محدد"}
                </p>
              </div>


              {/* Fuel */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-sm text-gray-500">
                  نوع الوقود
                </p>

                <p className="mt-1 text-base font-bold text-gray-900">
                  {car.fuel_type === "petrol"
                    ? "بنزين"
                    : car.fuel_type === "diesel"
                    ? "ديزل"
                    : car.fuel_type === "electric"
                    ? "كهرباء"
                    : car.fuel_type === "hybrid"
                    ? "هجين"
                    : car.fuel_type || "غير محدد"}
                </p>
              </div>


              {/* Condition */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-sm text-gray-500">
                  الحالة
                </p>

                <p className="mt-1 text-base font-bold text-gray-900">
                  {car.condition === "used"
                    ? "مستعملة"
                    : car.condition === "new"
                    ? "جديدة"
                    : car.condition || "غير محدد"}
                </p>
              </div>

            </div>


            {/* Description */}
            <div className="mt-8">

              <h2 className="mb-3 text-xl font-bold text-gray-900">
                وصف السيارة
              </h2>

              <p className="text-base leading-8 text-gray-600">
                {car.description || "لا يوجد وصف متوفر لهذه السيارة."}
              </p>

            </div>


            {/* WhatsApp */}
            <a
              href={`https://wa.me/96176068805?text=${encodeURIComponent(
                `مرحبا، أنا مهتم بسيارة ${car.brand} ${car.model} موديل ${car.year}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block w-full rounded-xl bg-green-600 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-green-700 sm:text-lg"
            >
              تواصل عبر واتساب
            </a>

          </div>

        </div>

      </div>

    </main>
  )
}

export default CarDetailsPage