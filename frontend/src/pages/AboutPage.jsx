import { CarFront, Eye, MessageCircle, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"

function AboutPage() {
  return (
    <main dir="rtl" className="bg-white">

      {/* Page Header */}
      <section className="bg-[#F5F8FC] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">

          <p className="mb-3 font-semibold text-[#0B3B82]">
            Rammal Motors
          </p>

          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            من نحن
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-gray-600">
            نساعدك على اكتشاف السيارات المتوفرة بطريقة سهلة وواضحة،
            مع إمكانية مشاهدة الصور والمواصفات والأسعار قبل التواصل.
          </p>

        </div>
      </section>


      {/* About */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">

          {/* Text */}
          <div>

            <h2 className="text-3xl font-bold text-[#0B3B82]">
              ما هي Rammal Motors؟
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Rammal Motors هي منصة تساعد على تسهيل التواصل بين
              الأشخاص المهتمين بشراء السيارات وأصحاب السيارات
              المعروضة للبيع.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              بدلاً من طلب الصور والسعر والمواصفات في كل مرة،
              يمكنك تصفح السيارات المتوفرة على الموقع والاطلاع على
              المعلومات الأساسية لكل سيارة بسهولة.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              عند العثور على سيارة تناسبك، يمكنك التواصل معنا مباشرة
              للحصول على المزيد من التفاصيل.
            </p>

          </div>


          {/* Visual Card */}
          <div className="rounded-3xl bg-[#F5F8FC] p-10">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B3B82] text-white">
              <CarFront size={32} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-gray-900">
              هدفنا بسيط
            </h3>

            <p className="mt-4 leading-8 text-gray-600">
              جعل البحث عن السيارة أكثر وضوحاً وسهولة، وتقليل الوقت
              اللازم للحصول على الصور والمواصفات والمعلومات الأساسية.
            </p>

          </div>

        </div>
      </section>


      {/* How it works */}
      <section className="bg-[#F8FAFC] py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">

            <h2 className="text-3xl font-bold text-[#0B3B82]">
              كيف نساعدك؟
            </h2>

            <p className="mt-3 text-gray-600">
              خطوات بسيطة للوصول إلى السيارة المناسبة
            </p>

          </div>


          <div className="grid gap-6 md:grid-cols-3">

            {/* Step 1 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">

              <Eye
                size={30}
                className="text-[#0B3B82]"
              />

              <p className="mt-6 text-sm font-bold text-[#0B3B82]">
                01
              </p>

              <h3 className="mt-2 text-xl font-bold">
                تصفّح السيارات
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                شاهد السيارات المتوفرة والصور والمعلومات الأساسية
                لكل سيارة.
              </p>

            </div>


            {/* Step 2 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">

              <CheckCircle2
                size={30}
                className="text-[#0B3B82]"
              />

              <p className="mt-6 text-sm font-bold text-[#0B3B82]">
                02
              </p>

              <h3 className="mt-2 text-xl font-bold">
                اختر السيارة
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                قارن بين السيارات واختر السيارة التي تناسب احتياجاتك
                وميزانيتك.
              </p>

            </div>


            {/* Step 3 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">

              <MessageCircle
                size={30}
                className="text-[#0B3B82]"
              />

              <p className="mt-6 text-sm font-bold text-[#0B3B82]">
                03
              </p>

              <h3 className="mt-2 text-xl font-bold">
                تواصل معنا
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                تواصل معنا مباشرة للاستفسار عن السيارة والحصول على
                المزيد من المعلومات.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="py-20">

        <div className="mx-auto max-w-5xl px-6">

          <div className="rounded-3xl bg-[#0B3B82] px-8 py-14 text-center text-white md:px-16">

            <h2 className="text-3xl font-bold">
              هل تبحث عن سيارتك القادمة؟
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-8 text-blue-100">
              تصفّح السيارات المتوفرة واكتشف الصور والمواصفات
              والأسعار بسهولة.
            </p>

            <Link
              to="/cars"
              className="mt-7 inline-block rounded-xl bg-white px-8 py-3 font-bold text-[#0B3B82] transition hover:bg-gray-100"
            >
              تصفّح السيارات
            </Link>

          </div>

        </div>

      </section>

    </main>
  )
}

export default AboutPage