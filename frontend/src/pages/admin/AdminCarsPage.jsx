import { useEffect, useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Car,
  CheckCircle,
  CircleDollarSign,
} from "lucide-react"

import api from "../../api/axios"

function AdminCarsPage() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [carToDelete, setCarToDelete] = useState(null)
  const [search, setSearch] = useState("")
  const [carToSell, setCarToSell] = useState(null)
  const [commission, setCommission] = useState("")
  const [soldDate, setSoldDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [selling, setSelling] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/admin/cars")
        setCars(response.data)
      } catch (error) {
        console.error("Error loading cars:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  const handleDelete = async () => {
    if (!carToDelete) return

    try {
      await api.delete(`/cars/${carToDelete.id}`)

      setCars((currentCars) =>
        currentCars.filter(
          (car) => car.id !== carToDelete.id
        )
      )

      setCarToDelete(null)
    } catch (error) {
      console.error("Error deleting car:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await api.post("/logout")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("admin_token")
      navigate("/admin/login")
    }
  }

  const handleStatusChange = async (car) => {
  // If already sold, restore it to available
    if (car.status === "sold") {
      try {
        const response = await api.put(
          `/cars/${car.id}/available`
        )

        setCars((currentCars) =>
          currentCars.map((currentCar) =>
            currentCar.id === car.id
              ? response.data.car
              : currentCar
          )
        )
      } catch (error) {
        console.error(
          "Error changing car to available:",
          error
        )
      }

      return
    }

    // If available, open the sale modal
    setCarToSell(car)
    setCommission("")
    setSoldDate(
      new Date().toISOString().split("T")[0]
    )
  }

  const handleConfirmSale = async () => {
    if (!carToSell || !commission || !soldDate) {
      return
    }

    try {
      setSelling(true)

      const response = await api.put(
        `/cars/${carToSell.id}/sold`,
        {
          commission: Number(commission),
          sold_at: soldDate,
        }
      )

      setCars((currentCars) =>
        currentCars.map((currentCar) =>
          currentCar.id === carToSell.id
            ? response.data.car
            : currentCar
        )
      )

      setCarToSell(null)
      setCommission("")
    } catch (error) {
      console.error(
        "Error marking car as sold:",
        error
      )
    } finally {
      setSelling(false)
    }
  }
  

  const availableCars = cars.filter(
    (car) => car.status === "available"
  ).length

  const filteredCars = cars.filter((car) => {
  const searchValue = search.toLowerCase().trim()

  if (!searchValue) return true

  return (
    car.brand?.toLowerCase().includes(searchValue) ||
    car.model?.toLowerCase().includes(searchValue) ||
    String(car.year).includes(searchValue)
  )
})

  const soldCars = cars.filter(
    (car) => car.status === "sold"
  ).length

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-gray-50"
      >
        <p className="text-gray-500">
          جاري تحميل السيارات...
        </p>
      </div>
    )
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F6F8FB]"
    >
      <div className="mx-auto max-w-7xl px-5 py-10">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-[#0B3B82]">
              إدارة السيارات
            </h1>

            <p className="mt-2 text-gray-500">
              أضف السيارات وعدّل معلوماتها وتحكّم بحالة الإعلانات
            </p>
          </div>


          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/cars/add"
              className="flex items-center gap-2 rounded-xl bg-[#0B3B82] px-5 py-3 font-bold text-white transition hover:bg-[#082E66]"
            >
              <Plus size={18} />
              إضافة سيارة
            </Link>

            <Link
              to="/admin/analytics"
              className="rounded-xl border border-[#0B3B82] bg-white px-5 py-3 font-bold text-[#0B3B82] transition hover:bg-blue-50"
            >
              الإحصائيات
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              تسجيل الخروج
            </button>

          </div>

        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0B3B82]">
              <Car size={21} />
            </div>

            <p className="text-sm text-gray-500">
              إجمالي السيارات
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {cars.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CheckCircle size={21} />
            </div>

            <p className="text-sm text-gray-500">
              السيارات المتوفرة
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {availableCars}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <CircleDollarSign size={21} />
            </div>

            <p className="text-sm text-gray-500">
              السيارات المباعة
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {soldCars}
            </p>
          </div>

        </div>

        {/* Cars */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-lg font-bold text-gray-900">
              قائمة السيارات
            </h2>
            <div className="border-b border-gray-100 p-5">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث بالماركة أو الموديل أو السنة..."
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#0B3B82] focus:ring-1 focus:ring-[#0B3B82]"
              />
            </div>
          </div>

          {cars.length === 0 ? (
              <div className="p-12 text-center">
                <Car
                  size={40}
                  className="mx-auto mb-3 text-gray-300"
                />

                <p className="font-semibold text-gray-600">
                  لا توجد سيارات حالياً
                </p>
              </div>

            ) : filteredCars.length === 0 ? (

              <div className="p-12 text-center">
                <Car
                  size={40}
                  className="mx-auto mb-3 text-gray-300"
                />

                <p className="font-semibold text-gray-600">
                  لا توجد سيارات مطابقة للبحث
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  جرّب البحث باسم ماركة أو موديل أو سنة أخرى
                </p>
              </div>

            ) : (

            <div className="divide-y divide-gray-100">

              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="flex flex-col gap-5 p-5 transition hover:bg-gray-50 md:flex-row md:items-center md:justify-between"
                >

                  {/* Car */}
                  <div className="flex items-center gap-4">

                    {car.images?.length > 0 ? (
                      <img
                        src={car.images[0].image_url}
                        alt={`${car.brand} ${car.model}`}
                        className="h-20 w-28 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-28 items-center justify-center rounded-xl bg-gray-100">
                        <Car
                          size={28}
                          className="text-gray-300"
                        />
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {car.brand} {car.model}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {car.year}
                      </p>

                      <p className="mt-1 font-bold text-[#0B3B82]">
                        $
                        {Number(car.price).toLocaleString(
                          "en-US"
                        )}
                      </p>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">

                    <button
                      onClick={() =>
                        handleStatusChange(car)
                      }
                      className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                        car.status === "available"
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {car.status === "available"
                        ? "متوفرة"
                        : "مباعة"}
                    </button>

                    <Link
                      to={`/admin/cars/${car.id}/edit`}
                      className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-bold text-[#0B3B82] transition hover:bg-blue-100"
                    >
                      <Pencil size={16} />
                      تعديل
                    </Link>

                    <button
                      onClick={() =>
                        setCarToDelete(car)
                      }
                      className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                      حذف
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

      {/* Sale Modal */}
{carToSell && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

      <h2 className="text-xl font-bold text-[#0B3B82]">
        تسجيل عملية البيع
      </h2>

      <p className="mt-2 text-gray-600">
        {carToSell.brand} {carToSell.model}
      </p>


      {/* Commission */}
      <div className="mt-6">

        <label className="mb-2 block font-semibold text-gray-700">
          قيمة العمولة ($)
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={commission}
          onChange={(e) =>
            setCommission(e.target.value)
          }
          placeholder="مثال: 75"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0B3B82]"
        />

      </div>


      {/* Sale date */}
      <div className="mt-5">

              <label className="mb-2 block font-semibold text-gray-700">
                تاريخ البيع
              </label>

              <input
                type="date"
                value={soldDate}
                onChange={(e) =>
                  setSoldDate(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0B3B82]"
              />

            </div>


            <div className="mt-7 flex gap-3">

              <button
                type="button"
                onClick={handleConfirmSale}
                disabled={
                  selling ||
                  commission === "" ||
                  soldDate === ""
                }
                className="flex-1 rounded-xl bg-[#0B3B82] px-4 py-3 font-bold text-white transition hover:bg-[#082E66] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {selling
                  ? "جاري التسجيل..."
                  : "تأكيد البيع"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setCarToSell(null)
                  setCommission("")
                }}
                disabled={selling}
                className="flex-1 rounded-xl bg-gray-100 px-4 py-3 font-bold text-gray-700 transition hover:bg-gray-200"
              >
                إلغاء
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Delete Modal */}
      {carToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <h2 className="text-xl font-bold text-gray-900">
              حذف السيارة
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              هل أنت متأكد من حذف{" "}
              <strong>
                {carToDelete.brand}{" "}
                {carToDelete.model}
              </strong>
              ؟
            </p>

            <p className="mt-2 text-sm text-red-600">
              لا يمكن التراجع عن هذه العملية.
            </p>

            <div className="mt-6 flex gap-3">

              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-bold text-white transition hover:bg-red-700"
              >
                نعم، حذف
              </button>

              <button
                onClick={() =>
                  setCarToDelete(null)
                }
                className="flex-1 rounded-xl bg-gray-100 px-4 py-3 font-bold text-gray-700 transition hover:bg-gray-200"
              >
                إلغاء
              </button>

            </div>

          </div>
        </div>
      )}

    </main>
  )
}

export default AdminCarsPage