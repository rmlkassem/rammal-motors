import { BrowserRouter, Routes, Route } from "react-router-dom"

import CarsPage from "./pages/CarsPage"
import CarDetailsPage from "./pages/CarDetailsPage"

import AdminCarsPage from "./pages/admin/AdminCarsPage"
import AddCarPage from "./pages/admin/AddCarPage"
import EditCarPage from "./pages/admin/EditCarPage"
import AdminLoginPage from "./pages/admin/AdminLoginPage"

import ProtectedRoute from "./components/ProtectedRoute"

import PublicLayout from "./layout/PublicLayout"
import HomePage from "./pages/HomePage"

import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"

import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public */}
        <Route element={<PublicLayout />}>

          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/cars"
            element={<CarsPage />}
          />

          <Route
            path="/cars/:id"
            element={<CarDetailsPage />}
          />

          <Route
            path="/about"
            element={<AboutPage />}
          />

          <Route
            path="/contact"
            element={<ContactPage />}
          />

        </Route>


        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLoginPage />}
        />


        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminCarsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/cars/new"
          element={
            <ProtectedRoute>
              <AddCarPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/cars/:id/edit"
          element={
            <ProtectedRoute>
              <EditCarPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <AdminAnalyticsPage />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App