import {
  CarFront,
  MessageCircle,
  BadgeCheck,
} from "lucide-react"

function WhyUs() {
  return (
    <section dir="rtl" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">

          <h2 className="text-3xl font-bold text-[#0B3B82] md:text-4xl">
            لماذا Rammal Motors؟
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            نوفر لك طريقة سهلة وواضحة لتصفح السيارات المتوفرة
           على مستوى لبنان ومعرفة أهم التفاصيل قبل التواصل.
          </p>

        </div>


        {/* Features */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Feature 1 */}
          <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-8 text-center transition hover:shadow-md">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <CarFront
                size={27}
                className="text-[#0B3B82]"
              />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              معلومات واضحة
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              شاهد صور السيارة والسعر والمواصفات الأساسية
              بشكل واضح قبل التواصل.
            </p>

          </div>


          {/* Feature 2 */}
          <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-8 text-center transition hover:shadow-md">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <BadgeCheck
                size={27}
                className="text-[#0B3B82]"
              />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              سيارات متوفرة
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              يتم تحديث حالة السيارات لتسهيل معرفة السيارات
              المتوفرة حالياً.
            </p>

          </div>


          {/* Feature 3 */}
          <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-8 text-center transition hover:shadow-md">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <MessageCircle
                size={27}
                className="text-[#0B3B82]"
              />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              تواصل سريع
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              اختر السيارة التي تناسبك وتواصل معنا مباشرة
              للحصول على المزيد من التفاصيل.
            </p>

          </div>

        </div>

      </div>
    </section>
  )
}

export default WhyUs