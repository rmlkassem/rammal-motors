import { Link } from "react-router-dom"
import {
  CalendarDays,
  Gauge,
  Settings,
  ArrowLeft,
} from "lucide-react"

function CarCard({ car }) {

  const conditionText =
    car.condition === "new" ? "جديدة" : "مستعملة"

  return (
    <div
      dir="rtl"
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >

      {/* Car image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">

        <img
          src={
            car.images?.length > 0
              ? car.images[0].image_url
              : "https://placehold.co/600x400?text=No+Image"
          }
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Condition */}
        <span className="absolute right-4 top-4 rounded-full bg-white/95 px-4 py-1.5 text-sm font-bold text-[#0B3B82] shadow-sm">
          {conditionText}
        </span>

      </div>


      {/* Card information */}
      <div className="p-5">

        {/* Name */}
        <h2 className="text-xl font-bold text-gray-900">
          {car.brand} {car.model}
        </h2>


        {/* Price */}
        <p className="mt-2 text-2xl font-bold text-[#0B3B82]">
          $
          {Number(car.price).toLocaleString("en-US", {
            maximumFractionDigits: 0,
          })}
        </p>


        {/* Specifications */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-y border-gray-100 py-4">

          {/* Year */}
          <div className="flex flex-col items-center gap-2">
            <CalendarDays
              size={20}
              className="text-[#0B3B82]"
            />

            <span className="text-sm text-gray-600">
              {car.year}
            </span>
          </div>


          {/* Mileage */}
          <div className="flex flex-col items-center gap-2">
            <Gauge
              size={20}
              className="text-[#0B3B82]"
            />

            <span className="text-sm text-gray-600">
              {car.mileage
                ? Number(car.mileage).toLocaleString("en-US")
                : "غير محدد"}{" "}
              كم
            </span>
          </div>


          {/* Transmission */}
          <div className="flex flex-col items-center gap-2">
            <Settings
              size={20}
              className="text-[#0B3B82]"
            />

            <span className="text-sm text-gray-600">
              {car.transmission || "غير محدد"}
            </span>
          </div>

        </div>


        {/* Details */}
        <Link
          to={`/cars/${car.id}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B3B82] px-4 py-3 font-semibold text-white transition hover:bg-[#082E66]"
        >
          عرض التفاصيل
          <ArrowLeft size={18} />
        </Link>

      </div>

    </div>
  )
}

export default CarCard