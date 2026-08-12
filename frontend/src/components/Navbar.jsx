import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import logo from "../assets/logo.png"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const linkClass = (path) => {
    const active = location.pathname === path

    return active
      ? "font-semibold text-[#0B3B82]"
      : "font-semibold text-gray-700 transition hover:text-[#0B3B82]"
  }

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 border-b border-gray-100 bg-white"
    >
      {/* Main Navbar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:h-24 md:px-6">

        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 md:gap-3"
        >
          <img
            src={logo}
            alt="Rammal Motors"
            className="h-12 w-16 object-contain md:h-16 md:w-20"
          />

          <span
            dir="ltr"
            className="text-xl font-extrabold text-[#0B3B82] md:text-3xl"
          >
            Rammal Motors
          </span>
        </Link>


        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className={linkClass("/")}>
            الرئيسية
          </Link>

          <Link to="/cars" className={linkClass("/cars")}>
            السيارات
          </Link>

          <Link to="/about" className={linkClass("/about")}>
            من نحن
          </Link>

          <Link to="/contact" className={linkClass("/contact")}>
            تواصل معنا
          </Link>
        </nav>


        {/* Desktop WhatsApp */}
        <a
          href="https://wa.me/96176068805"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-xl bg-[#0B3B82] px-5 py-3 font-bold text-white transition hover:bg-[#082E66] md:flex"
        >
          <FaWhatsapp size={19} />
          واتساب
        </a>


        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="فتح القائمة"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-[#0B3B82] md:hidden"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

      </div>


      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-4 md:hidden">

          <nav className="flex flex-col gap-1">

            <Link
              to="/"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#0B3B82]"
            >
              الرئيسية
            </Link>

            <Link
              to="/cars"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#0B3B82]"
            >
              السيارات
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#0B3B82]"
            >
              من نحن
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#0B3B82]"
            >
              تواصل معنا
            </Link>

          </nav>


          <a
            href="https://wa.me/96176068805"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B3B82] px-5 py-3 font-bold text-white"
          >
            <FaWhatsapp size={20} />
            تواصل عبر واتساب
          </a>

        </div>
      )}

    </header>
  )
}

export default Navbar