import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api/axios"

function EditCarPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    color: "",
    transmission: "automatic",
    fuel_type: "petrol",
    condition: "used",
    description: "",
    status: "available",
  })

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [existingImages, setExistingImages] = useState([])
  const [newImages, setNewImages] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.get(`/cars/${id}`)

        const car = response.data
        setExistingImages(car.images || [])

        setFormData({
          brand: car.brand ?? "",
          model: car.model ?? "",
          year: car.year ?? "",
          price: car.price ?? "",
          mileage: car.mileage ?? "",
          color: car.color ?? "",
          transmission: car.transmission ?? "automatic",
          fuel_type: car.fuel_type ?? "petrol",
          condition: car.condition ?? "used",
          description: car.description ?? "",
          status: car.status ?? "available",
        })
      } catch (error) {
        console.error(error)
        setError("تعذر تحميل بيانات السيارة")
      } finally {
        setLoading(false)
      }
    }

    fetchCar()
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDeleteImage = async (imageId) => {
    try {

        await api.delete(`/car-images/${imageId}`)

        setExistingImages((currentImages) =>
        currentImages.filter(
            (image) => image.id !== imageId
        )
        )

    } catch (error) {
        console.error("Error deleting image:", error)
        setError("حدث خطأ أثناء حذف الصورة")
    }
    }

    const handleRemoveNewImage = (indexToRemove) => {
      setNewImages((currentImages) =>
        currentImages.filter(
          (_, index) => index !== indexToRemove
        )
      )
    }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    setSubmitting(true)

    try {
      await api.put(`/cars/${id}`, formData)
      if (newImages.length > 0) {

        const imageData = new FormData()

        newImages.forEach((image) => {
            imageData.append("images[]", image)
        })

        await api.post(
            `/cars/${id}/images`,
            imageData
        )
        }

      navigate("/admin")
    } catch (error) {
      console.error(error)
      setError("حدث خطأ أثناء تعديل السيارة")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <p className="p-10 text-center">
        جاري تحميل السيارة...
      </p>
    )
  }

  return (
  <main
    dir="rtl"
    className="min-h-screen bg-[#F6F8FB]"
  >
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B3B82]">
          تعديل السيارة
        </h1>

        <p className="mt-2 text-gray-500">
          عدّل معلومات السيارة والصور وحالة الإعلان
        </p>
      </div>


      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >

        {/* ========================= */}
        {/* Basic Information */}
        {/* ========================= */}

        <section>

          <h2 className="mb-6 text-xl font-bold text-gray-900">
            المعلومات الأساسية
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            {/* Brand */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                الماركة *
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0B3B82] focus:ring-1 focus:ring-[#0B3B82]"
              />
            </div>


            {/* Model */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                الموديل *
              </label>

              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0B3B82] focus:ring-1 focus:ring-[#0B3B82]"
              />
            </div>


            {/* Year */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                سنة الصنع *
              </label>

              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0B3B82] focus:ring-1 focus:ring-[#0B3B82]"
              />
            </div>


            {/* Price */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                السعر ($) *
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0B3B82] focus:ring-1 focus:ring-[#0B3B82]"
              />
            </div>


            {/* Mileage */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                المسافة المقطوعة (كم)
              </label>

              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0B3B82] focus:ring-1 focus:ring-[#0B3B82]"
              />
            </div>


            {/* Color */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                اللون
              </label>

              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0B3B82] focus:ring-1 focus:ring-[#0B3B82]"
              />
            </div>

          </div>

        </section>


        {/* Divider */}
        <div className="my-8 border-t border-gray-200" />


        {/* ========================= */}
        {/* Car Specifications */}
        {/* ========================= */}

        <section>

          <h2 className="mb-6 text-xl font-bold text-gray-900">
            مواصفات السيارة
          </h2>

          <div className="grid gap-5 md:grid-cols-3">

            {/* Transmission */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                ناقل الحركة
              </label>

              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#0B3B82]"
              >
                <option value="automatic">
                  أوتوماتيك
                </option>

                <option value="manual">
                  عادي
                </option>
              </select>
            </div>


            {/* Fuel */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                نوع الوقود
              </label>

              <select
                name="fuel_type"
                value={formData.fuel_type}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#0B3B82]"
              >
                <option value="petrol">
                  بنزين
                </option>

                <option value="diesel">
                  ديزل
                </option>

                <option value="hybrid">
                  هجين
                </option>

                <option value="electric">
                  كهرباء
                </option>
              </select>
            </div>


            {/* Condition */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                الحالة
              </label>

              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#0B3B82]"
              >
                <option value="used">
                  مستعملة
                </option>

                <option value="new">
                  جديدة
                </option>
              </select>
            </div>

          </div>

        </section>


        {/* Divider */}
        <div className="my-8 border-t border-gray-200" />


        {/* ========================= */}
        {/* Description */}
        {/* ========================= */}

        <section>

          <h2 className="mb-5 text-xl font-bold text-gray-900">
            وصف السيارة
          </h2>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="اكتب وصفاً مختصراً للسيارة..."
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 leading-7 outline-none transition focus:border-[#0B3B82] focus:ring-1 focus:ring-[#0B3B82]"
          />

        </section>


        {/* Divider */}
        <div className="my-8 border-t border-gray-200" />


        {/* ========================= */}
        {/* Existing Images */}
        {/* ========================= */}

        <section>

          <h2 className="mb-2 text-xl font-bold text-gray-900">
            الصور الحالية
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            يمكنك حذف الصور التي لم تعد تريد عرضها
          </p>


          {existingImages.length === 0 ? (

            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
              لا توجد صور لهذه السيارة
            </div>

          ) : (

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

              {existingImages.map((image) => (

                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                >

                  <img
                    src={image.image_url}
                    alt="صورة السيارة"
                    className="h-32 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteImage(image.id)
                    }
                    className="absolute left-2 top-2 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-bold text-white shadow transition hover:bg-red-700"
                  >
                    حذف
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* Divider */}
        <div className="my-8 border-t border-gray-200" />


        {/* ========================= */}
        {/* New Images */}
        {/* ========================= */}

        <section>

          <h2 className="mb-2 text-xl font-bold text-gray-900">
            إضافة صور جديدة
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            يمكنك اختيار عدة صور وإضافتها إلى صور السيارة الحالية
          </p>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition hover:border-[#0B3B82] hover:bg-blue-50/30">

            <span className="font-bold text-[#0B3B82]">
              اختر صور السيارة
            </span>

            <span className="mt-2 text-sm text-gray-500">
              يمكنك اختيار أكثر من صورة
            </span>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setNewImages(
                  Array.from(e.target.files)
                )
              }
              className="hidden"
            />

          </label>


          {newImages.length > 0 && (

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

              {newImages.map((image, index) => (

                <div
                  key={`${image.name}-${index}`}
                  className="relative overflow-hidden rounded-xl border border-gray-200"
                >

                  <img
                    src={URL.createObjectURL(image)}
                    alt={`صورة جديدة ${index + 1}`}
                    className="h-28 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveNewImage(index)
                    }
                    className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 font-bold text-white shadow hover:bg-red-700"
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* Divider */}
        <div className="my-8 border-t border-gray-200" />


        {/* ========================= */}
        {/* Advertisement Status */}
        {/* ========================= */}

        <section>

          <h2 className="mb-5 text-xl font-bold text-gray-900">
            حالة الإعلان
          </h2>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#0B3B82]"
          >
            <option value="available">
              متوفرة
            </option>

            <option value="unavailable">
              غير متوفرة
            </option>
          </select>

        </section>


        {/* Error */}
        {error && (

          <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </div>

        )}


        {/* ========================= */}
        {/* Actions */}
        {/* ========================= */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-xl bg-[#0B3B82] px-6 py-3.5 font-bold text-white transition hover:bg-[#082E66] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "جاري حفظ التعديلات..."
              : "حفظ التعديلات"}
          </button>


          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="rounded-xl border border-gray-300 bg-white px-8 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
          >
            إلغاء
          </button>

        </div>

      </form>

    </div>
  </main>
)
}

export default EditCarPage