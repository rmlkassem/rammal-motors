import {
  Phone,
  MessageCircle,
  Clock3,
} from "lucide-react"

import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa"

function ContactPage() {
  return (
    <main dir="rtl" className="bg-white">

      {/* Header */}
      <section className="bg-[#F5F8FC] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">

          <p className="mb-3 font-semibold text-[#0B3B82]">
            Rammal Motors
          </p>

          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            تواصل معنا
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-gray-600">
            هل لديك سؤال حول إحدى السيارات؟
            تواصل معنا مباشرة وسنساعدك بالمعلومات المتوفرة.
          </p>

        </div>
      </section>


      {/* Contact Methods */}
      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-6 md:grid-cols-3">

            {/* WhatsApp */}
            <a
              href="https://wa.me/96176068805"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-gray-200 bg-white p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                <FaWhatsapp
                  size={30}
                  className="text-[#0B3B82]"
                />
              </div>

              <h2 className="mt-6 text-xl font-bold text-gray-900">
                واتساب
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                تواصل معنا مباشرة للاستفسار عن سيارة محددة.
              </p>

              <span className="mt-5 inline-block font-semibold text-[#0B3B82]">
                ابدأ المحادثة
              </span>

            </a>


            {/* Phone */}
            <a
              href="tel:+96176068805"
              className="group rounded-2xl border border-gray-200 bg-white p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                <Phone
                  size={29}
                  className="text-[#0B3B82]"
                />
              </div>

              <h2 className="mt-6 text-xl font-bold text-gray-900">
                اتصال مباشر
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                يمكنك التواصل معنا هاتفياً للحصول على المزيد من التفاصيل.
              </p>

              <span
                dir="ltr"
                className="mt-5 inline-block font-semibold text-[#0B3B82]"
              >
                +961 76 068 805
              </span>

            </a>


            {/* Availability */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                <Clock3
                  size={29}
                  className="text-[#0B3B82]"
                />
              </div>

              <h2 className="mt-6 text-xl font-bold text-gray-900">
                أرسل استفسارك
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                إذا لم نتمكن من الرد مباشرة، أرسل رسالة وسنتواصل معك عند الإمكان.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Main CTA */}
      <section className="bg-[#F8FAFC] py-20">

        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">

          {/* Text */}
          <div className="flex flex-col justify-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B3B82] text-white">
              <MessageCircle size={27} />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-[#0B3B82]">
              مهتم بإحدى السيارات؟
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-gray-600">
              عند التواصل معنا، أرسل اسم السيارة أو رابط صفحة السيارة
              لتسهيل معرفة الإعلان الذي تستفسر عنه.
            </p>

            <a
              href="https://wa.me/96176068805"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-fit items-center gap-3 rounded-xl bg-[#0B3B82] px-7 py-3 font-bold text-white transition hover:bg-[#082E66]"
            >
              <FaWhatsapp size={20} />

              تواصل عبر واتساب
            </a>

          </div>


          {/* Info card */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">

            <h3 className="text-2xl font-bold text-gray-900">
              قبل التواصل
            </h3>

            <div className="mt-6 space-y-5 text-gray-600">

              <div className="rounded-xl bg-[#F8FAFC] p-5">
                <p className="font-bold text-gray-900">
                  1. اختر السيارة
                </p>

                <p className="mt-2">
                  افتح صفحة السيارة التي تهمك وراجع الصور والمواصفات.
                </p>
              </div>


              <div className="rounded-xl bg-[#F8FAFC] p-5">
                <p className="font-bold text-gray-900">
                  2. تأكد من التفاصيل
                </p>

                <p className="mt-2">
                  راجع السعر والسنة والمسافة وباقي المعلومات المتوفرة.
                </p>
              </div>


              <div className="rounded-xl bg-[#F8FAFC] p-5">
                <p className="font-bold text-gray-900">
                  3. تواصل معنا
                </p>

                <p className="mt-2">
                  أرسل استفسارك مباشرة عبر واتساب للحصول على المزيد من المعلومات.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Social Media */}
      <section className="py-20">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <h2 className="text-3xl font-bold text-[#0B3B82]">
            تابعنا على مواقع التواصل
          </h2>

          <p className="mt-4 text-gray-600">
            تابع أحدث السيارات والإعلانات على صفحات Rammal Motors.
          </p>


          <div className="mt-8 flex justify-center gap-4">

            <a
              href="https://instagram.com/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-50 text-[#0B3B82] transition hover:bg-[#0B3B82] hover:text-white"
            >
              <FaInstagram size={22} />
            </a>

            <a
              href="https://facebook.com/YOUR_PAGE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-50 text-[#0B3B82] transition hover:bg-[#0B3B82] hover:text-white"
            >
              <FaFacebookF size={20} />
            </a>

            <a
              href="https://tiktok.com/@YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-50 text-[#0B3B82] transition hover:bg-[#0B3B82] hover:text-white"
            >
              <FaTiktok size={20} />
            </a>

          </div>

        </div>

      </section>

    </main>
  )
}

export default ContactPage