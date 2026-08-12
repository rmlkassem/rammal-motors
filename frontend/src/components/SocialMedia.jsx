import { ArrowLeft } from "lucide-react"

import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa"

function SocialMedia() {
  return (
    <section dir="rtl" className="bg-[#F8FAFC] py-20">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">

          <h2 className="text-3xl font-bold text-[#0B3B82] md:text-4xl">
            تابع Rammal Motors
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            تابع صفحاتنا على مواقع التواصل الاجتماعي
            للاطلاع على السيارات والإعلانات الجديدة.
          </p>

        </div>


        {/* Social Media Cards */}
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">

          {/* Instagram */}
          <a
            href="https://instagram.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <FaInstagram
                  size={24}
                  className="text-[#0B3B82]"
                />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Instagram
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  تابع آخر السيارات
                </p>
              </div>

            </div>

            <ArrowLeft
              size={20}
              className="text-gray-400 transition group-hover:text-[#0B3B82]"
            />

          </a>


          {/* Facebook */}
          <a
            href="https://facebook.com/YOUR_PAGE"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <FaFacebookF
                  size={24}
                  className="text-[#0B3B82]"
                />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Facebook
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  شاهد الإعلانات الجديدة
                </p>
              </div>

            </div>

            <ArrowLeft
              size={20}
              className="text-gray-400 transition group-hover:text-[#0B3B82]"
            />

          </a>


          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@maherrammell?_r=1&_t=ZS-98lhZTKVOFT"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <FaTiktok
                  size={24}
                  className="text-[#0B3B82]"
                />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  TikTok
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  اكتشف أحدث السيارات
                </p>
              </div>

            </div>

            <ArrowLeft
              size={20}
              className="text-gray-400 transition group-hover:text-[#0B3B82]"
            />

          </a>

        </div>

      </div>

    </section>
  )
}

export default SocialMedia