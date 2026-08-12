import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/axios"


function AddCarPage() {
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

  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [images, setImages] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files))
  }
  const handleRemoveImage = (indexToRemove) => {
    setImages((currentImages) =>
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
      const data = new FormData()

      data.append("brand", formData.brand)
      data.append("model", formData.model)
      data.append("year", formData.year)
      data.append("price", formData.price)
      data.append("mileage", formData.mileage)
      data.append("color", formData.color)
      data.append("transmission", formData.transmission)
      data.append("fuel_type", formData.fuel_type)
      data.append("condition", formData.condition)
      data.append("description", formData.description)
      data.append("status", formData.status)

      images.forEach((image) => {
        data.append("images[]", image)
      })

      await api.post("/cars", data)

      navigate("/admin")

    } catch (error) {
      console.error(error)
      setError("حدث خطأ أثناء إضافة السيارة")
    } finally {
      setSubmitting(false)
    }
  }

  return (
  <main dir="rtl" className="min-h-screen bg-[#F6F8FB]">

    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-[#0B3B82]">
          إضافة سيارة جديدة
        </h1>

        <p className="mt-2 text-gray-500">
          أدخل معلومات السيارة وأضف الصور التي ستظهر للعملاء.
        </p>

      </div>


      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
      >

        {/* Basic information */}
        <div className="mb-8">

          <h2 className="mb-5 text-xl font-bold text-gray-900">
            المعلومات الأساسية
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">

            {/* Brand */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                الماركة *
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                placeholder="مثال: BMW"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0B3B82]"
              />
            </div>


            {/* Model */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                الموديل *
              </label>

              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                placeholder="مثال: X5"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0B3B82]"
              />
            </div>


            {/* Year */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                سنة الصنع *
              </label>

              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                min="1900"
                max="2100"
                placeholder="2023"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0B3B82]"
              />
            </div>


            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                السعر ($) *
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                placeholder="45000"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0B3B82]"
              />
            </div>


            {/* Mileage */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                المسافة المقطوعة (كم)
              </label>

              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                min="0"
                placeholder="28000"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0B3B82]"
              />
            </div>


            {/* Color */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                اللون
              </label>

              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="مثال: أبيض"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0B3B82]"
              />
            </div>

          </div>

        </div>


        {/* Car specifications */}
        <div className="mb-8 border-t border-gray-100 pt-8">

          <h2 className="mb-5 text-xl font-bold text-gray-900">
            مواصفات السيارة
          </h2>

          <div className="grid gap-5 sm:grid-cols-3">

            {/* Transmission */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
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
              <label className="mb-2 block text-sm font-semibold text-gray-700">
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
              <label className="mb-2 block text-sm font-semibold text-gray-700">
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

        </div>


        {/* Description */}
        <div className="mb-8 border-t border-gray-100 pt-8">

          <h2 className="mb-5 text-xl font-bold text-gray-900">
            وصف السيارة
          </h2>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="اكتب وصفاً مختصراً عن السيارة وحالتها ومميزاتها..."
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 leading-7 outline-none transition focus:border-[#0B3B82]"
          />

        </div>


        {/* Images */}
        <div className="mb-8 border-t border-gray-100 pt-8">

          <h2 className="mb-2 text-xl font-bold text-gray-900">
            صور السيارة
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            يمكنك اختيار عدة صور للسيارة.
          </p>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImagesChange}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
          />


          {images.length > 0 && (
            <div className="mt-5">

              <p className="mb-3 text-sm font-semibold text-gray-700">
                تم اختيار {images.length} صورة
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">

                {images.map((image, index) => (
  <div
                  key={`${image.name}-${index}`}
                  className="relative overflow-hidden rounded-xl border border-gray-200"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`صورة السيارة ${index + 1}`}
                    className="h-28 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white shadow transition hover:bg-red-700"
                    title="حذف الصورة"
                  >
                    ×
                  </button>

                  {index === 0 && (
                    <div className="absolute bottom-2 right-2 rounded-lg bg-[#0B3B82] px-2 py-1 text-xs font-bold text-white">
                      الصورة الرئيسية
                    </div>
                  )}
                </div>
              ))}

              </div>

            </div>
          )}

        </div>


        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}


        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row">

          <button
            type="button"
            onClick={() => navigate("/admin")}
            disabled={submitting}
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            إلغاء
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-xl bg-[#0B3B82] px-6 py-3 font-bold text-white transition hover:bg-[#082E66] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "جاري إضافة السيارة..."
              : "إضافة السيارة"}
          </button>

        </div>

      </form>

    </div>

  </main>
)
}

export default AddCarPage