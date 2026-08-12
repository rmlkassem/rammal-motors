import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/axios"

function AdminLoginPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    setLoading(true)

    try {
      const response = await api.post("/login", formData)

      localStorage.setItem(
        "admin_token",
        response.data.token
      )

      navigate("/admin")

    } catch (error) {
      console.error(error)

      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-gray-100 px-4"
      dir="rtl"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            تسجيل دخول الإدارة
          </h1>

          <p className="mt-2 text-gray-500">
            أدخل بيانات حساب الإدارة
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="mb-2 block font-medium">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              كلمة المرور
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3 outline-none focus:border-black"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black p-3 font-bold text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>

        </form>

      </div>
    </main>
  )
}

export default AdminLoginPage