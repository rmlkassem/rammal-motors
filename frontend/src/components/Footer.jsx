import { Link } from "react-router-dom"
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa"

function Footer() {
  return (
    <footer dir="rtl" className="border-t border-gray-200 bg-white">

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-[#0B3B82]">
              Rammal Motors
            </h2>

            <p className="mt-4 max-w-sm leading-7 text-gray-600">
              تصفّح السيارات المتوفرة، شاهد الصور والمواصفات
              والأسعار، وتواصل معنا مباشرة بكل سهولة.
            </p>
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-gray-900">
              روابط سريعة
            </h3>

            <div className="flex flex-col items-start gap-3 text-gray-600">

              <Link
                to="/"
                className="transition hover:text-[#0B3B82]"
              >
                الرئيسية
              </Link>

              <Link
                to="/cars"
                className="transition hover:text-[#0B3B82]"
              >
                السيارات
              </Link>

              <Link
                to="/about"
                className="transition hover:text-[#0B3B82]"
              >
                من نحن
              </Link>

              <Link
                to="/contact"
                className="transition hover:text-[#0B3B82]"
              >
                تواصل معنا
              </Link>

            </div>
          </div>


          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-gray-900">
              تواصل معنا
            </h3>

            <p className="mb-5 leading-7 text-gray-600">
              هل أنت مهتم بإحدى السيارات؟
              تواصل معنا مباشرة للحصول على المزيد من التفاصيل.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">

              <a
                href="https://wa.me/96176068805"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-[#0B3B82] transition hover:bg-[#0B3B82] hover:text-white"
              >
                <FaWhatsapp size={20} />
              </a>

              <a
                href="https://instagram.com/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-[#0B3B82] transition hover:bg-[#0B3B82] hover:text-white"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://facebook.com/YOUR_PAGE"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-[#0B3B82] transition hover:bg-[#0B3B82] hover:text-white"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://tiktok.com/@YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-[#0B3B82] transition hover:bg-[#0B3B82] hover:text-white"
              >
                <FaTiktok size={18} />
              </a>

            </div>
          </div>

        </div>


        {/* Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Rammal Motors. جميع الحقوق محفوظة.
        </div>

      </div>

    </footer>
  )
}

export default Footer