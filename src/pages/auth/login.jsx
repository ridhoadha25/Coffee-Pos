import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock, FaCoffee, FaInfoCircle } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Admin
    if (email === "admin@coffee.com" && password === "admin123") {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("role", "admin");
      localStorage.setItem("name", "Administrator");

      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat datang Admin",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    }
    // Kasir
    else if (email === "kasir@coffee.com" && password === "kasir123") {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("role", "kasir");
      localStorage.setItem("name", "Kasir");

      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat datang Kasir",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    }
    // Salah
    else {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Email atau Password salah",
        confirmButtonColor: "#6F4E37",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4 font-sans">
      <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-[2rem] shadow-2xl border border-stone-100">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#6F4E37] rounded-2xl flex items-center justify-center shadow-lg shadow-[#6F4E37]/30 mb-4 transform -rotate-6">
            <FaCoffee className="text-3xl text-white transform rotate-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight">
            Coffee POS
          </h1>
          <p className="text-stone-500 mt-2 text-sm font-medium">
            Masuk ke akun kasir atau admin
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-stone-700 ml-1">
              Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-stone-400 group-focus-within:text-[#6F4E37] transition-colors" />
              </div>
              <input
                type="email"
                required
                placeholder="Masukkan email Anda"
                className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/20 focus:border-[#6F4E37] transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-stone-700 ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-stone-400 group-focus-within:text-[#6F4E37] transition-colors" />
              </div>
              <input
                type="password"
                required
                placeholder="Masukkan password Anda"
                className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/20 focus:border-[#6F4E37] transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#6F4E37] text-white font-semibold py-3.5 rounded-xl hover:bg-[#5A3A36] focus:ring-4 focus:ring-[#6F4E37]/30 transform active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#6F4E37]/20 mt-2"
          >
            Masuk Sekarang
          </button>
        </form>

        {/* Demo Credentials Info Box */}
        <div className="mt-8 bg-amber-50 rounded-xl p-4 border border-amber-100 text-sm">
          <div className="flex items-center gap-2 mb-3 text-amber-800 font-semibold">
            <FaInfoCircle />
            <span>Akun Uji Coba</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-amber-100">
              <p className="font-bold text-stone-700 mb-1">👑 Admin</p>
              <p className="text-stone-500 text-xs">admin@coffee.com</p>
              <p className="text-stone-500 text-xs">admin123</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-amber-100">
              <p className="font-bold text-stone-700 mb-1">🛒 Kasir</p>
              <p className="text-stone-500 text-xs">kasir@coffee.com</p>
              <p className="text-stone-500 text-xs">kasir123</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}