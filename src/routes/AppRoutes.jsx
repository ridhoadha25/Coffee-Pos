import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/dashboard/Dashboard";
import Kasir from "../pages/kasir/Kasir";
import Produk from "../pages/produk/Produk";
import Transaksi from "../pages/transaksi/Transaksi";
import Laporan from "../pages/laporan/Laporan";
import Pengguna from "../pages/pengguna/Pengguna";
import Pengaturan from "../pages/pengaturan/Pengaturan";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Kasir */}
      <Route
        path="/kasir"
        element={
          <ProtectedRoute>
            <Kasir />
          </ProtectedRoute>
        }
      />

      {/* Produk */}
      <Route
        path="/produk"
        element={
          <ProtectedRoute>
            <Produk />
          </ProtectedRoute>
        }
      />

      {/* Transaksi */}
      <Route
        path="/transaksi"
        element={
          <ProtectedRoute>
            <Transaksi />
          </ProtectedRoute>
        }
      />

      {/* Laporan */}
      <Route
        path="/laporan"
        element={
          <ProtectedRoute>
            <Laporan />
          </ProtectedRoute>
        }
      />

      {/* Pengguna */}
      <Route
        path="/pengguna"
        element={
          <ProtectedRoute>
            <Pengguna />
          </ProtectedRoute>
        }
      />

      {/* Pengaturan */}
      <Route
        path="/pengaturan"
        element={
          <ProtectedRoute>
            <Pengaturan />
          </ProtectedRoute>
        }
      />

      {/* Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}