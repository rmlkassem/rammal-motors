import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  Car,
  CircleCheck,
  CircleDollarSign,
  ShoppingCart,
  ArrowRight,
} from "lucide-react"

import api from "../../api/axios"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"

import {
  Bar,
  Line,
} from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)


function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState("all")
  const monthNames = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
 ]
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get(
          "/admin/analytics"
        )

        setAnalytics(response.data)
      } catch (error) {
        console.error(
          "Error loading analytics:",
          error
        )

        setError("حدث خطأ أثناء تحميل الإحصائيات")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#F6F8FB]"
      >
        <p className="text-gray-500">
          جاري تحميل الإحصائيات...
        </p>
      </main>
    )
  }

  if (error || !analytics) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#F6F8FB]"
      >
        <p className="text-red-600">
          {error}
        </p>
      </main>
    )
  }

const allMonthlySales = analytics.monthly_sales || []

const availableYears = [
  ...new Set(
    allMonthlySales.map((item) =>
      Number(item.year)
    )
  ),
].sort((a, b) => b - a)

const monthlySales =
  selectedYear === "all"
    ? allMonthlySales
    : allMonthlySales.filter(
        (item) =>
          Number(item.year) === Number(selectedYear)
      )

const filteredSoldCars = monthlySales.reduce(
  (total, item) =>
    total + Number(item.cars_sold),
  0
)

const filteredCommission = monthlySales.reduce(
  (total, item) =>
    total + Number(item.commission),
  0
)

const labels = monthlySales.map((item) => {
    return `${monthNames[Number(item.month) - 1]} ${item.year}`
    })

const salesChartData = {
    labels,
    datasets: [
        {
        label: "السيارات المباعة",
        data: monthlySales.map((item) =>
            Number(item.cars_sold)
        ),
        },
    ],
    }

const commissionChartData = {
    labels,
    datasets: [
        {
        label: "العمولات ($)",
        data: monthlySales.map((item) =>
            Number(item.commission)
        ),
        },
    ],
    }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F6F8FB]"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-[#0B3B82]">
              الإحصائيات
            </h1>

            <p className="mt-2 text-gray-500">
              متابعة المبيعات والعمولات
            </p>
          </div>
          <div className="mt-5 flex items-center gap-3">

            <label className="font-semibold text-gray-700">
                السنة:
            </label>

            <select
                value={selectedYear}
                onChange={(e) =>
                setSelectedYear(e.target.value)
                }
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none focus:border-[#0B3B82]"
            >
                <option value="all">
                جميع السنوات
                </option>

                {availableYears.map((year) => (
                <option
                    key={year}
                    value={year}
                >
                    {year}
                </option>
                ))}

            </select>

            </div>

          <Link
            to="/admin"
            className="flex items-center gap-2 self-start rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowRight size={18} />
            إدارة السيارات
          </Link>

        </div>


        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total cars */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B3B82]">
              <Car size={22} />
            </div>

            <p className="text-sm font-medium text-gray-500">
              إجمالي السيارات
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {analytics.total_cars}
            </p>

          </div>


          {/* Available */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CircleCheck size={22} />
            </div>

            <p className="text-sm font-medium text-gray-500">
              السيارات المتوفرة
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {analytics.available_cars}
            </p>

          </div>


          {/* Sold */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <ShoppingCart size={22} />
            </div>

            <p className="text-sm font-medium text-gray-500">
              السيارات المباعة
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {selectedYear === "all"
                    ? analytics.sold_cars
                    : filteredSoldCars}
            </p>

          </div>


          {/* Commission */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CircleDollarSign size={22} />
            </div>

            <p className="text-sm font-medium text-gray-500">
              إجمالي العمولات
            </p>

            <p
              dir="ltr"
              className="mt-2 text-right text-3xl font-bold text-gray-900"
            >
              $
              {Number(
                selectedYear === "all"
                    ? analytics.total_commission
                    : filteredCommission
                ).toLocaleString("en-US", {
                maximumFractionDigits: 2,
                })}
            </p>

          </div>

        </div>


        {/* Charts placeholder */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              السيارات المباعة شهرياً
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              عدد السيارات المباعة لكل شهر
            </p>

            <div className="mt-6 h-72">
                {monthlySales.length > 0 ? (
                    <Bar
                    data={salesChartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                        legend: {
                            display: false,
                        },
                        },
                        scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                            precision: 0,
                            },
                        },
                        },
                    }}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center rounded-xl bg-gray-50 text-gray-400">
                    لا توجد بيانات مبيعات بعد
                    </div>
                )}
                </div>
          </div>


          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              العمولات الشهرية
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              إجمالي العمولة المحققة لكل شهر
            </p>

            <div className="mt-6 h-72">
            {monthlySales.length > 0 ? (
                <Line
                data={commissionChartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                    legend: {
                        display: false,
                    },
                    },
                    scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                        callback: (value) => `$${value}`,
                        },
                    },
                    },
                }}
                />
            ) : (
                <div className="flex h-full items-center justify-center rounded-xl bg-gray-50 text-gray-400">
                لا توجد بيانات عمولات بعد
                </div>
            )}
            </div>
          </div>

          {/* Sales History */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-5">
                <h2 className="text-xl font-bold text-gray-900">
                سجل المبيعات
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                جميع السيارات التي تم بيعها والعمولة المحققة
                </p>
            </div>

            {!analytics.sales_history ||
            analytics.sales_history.length === 0 ? (

                <div className="px-6 py-12 text-center text-gray-500">
                لا توجد مبيعات مسجلة حتى الآن
                </div>

            ) : (

                <div className="overflow-x-auto">

                <table className="w-full text-right">

                    <thead className="bg-gray-50 text-sm text-gray-600">
                    <tr>
                        <th className="px-6 py-4">
                        السيارة
                        </th>

                        <th className="px-6 py-4">
                        السنة
                        </th>

                        <th className="px-6 py-4">
                        السعر
                        </th>

                        <th className="px-6 py-4">
                        العمولة
                        </th>

                        <th className="px-6 py-4">
                        تاريخ البيع
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                    {analytics.sales_history.map((sale) => (

                        <tr
                        key={sale.id}
                        className="transition hover:bg-gray-50"
                        >

                        <td className="px-6 py-4 font-bold text-gray-900">
                            {sale.brand} {sale.model}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                            {sale.year}
                        </td>

                        <td className="px-6 py-4 font-semibold text-[#0B3B82]">
                            $
                            {Number(sale.price).toLocaleString("en-US")}
                        </td>

                        <td className="px-6 py-4 font-bold text-green-600">
                            $
                            {Number(sale.commission || 0).toLocaleString("en-US")}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                            {new Date(sale.sold_at).toLocaleDateString("en-GB")}
                        </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

                </div>

            )}

            </div>

        </div>

      </div>
    </main>
  )
}

export default AdminAnalyticsPage