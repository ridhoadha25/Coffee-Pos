import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCashRegister,
  FaCoffee,
  FaReceipt,
  FaChartBar,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const menus = [
  { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
  { name: "Kasir", path: "/kasir", icon: <FaCashRegister /> },
  { name: "Produk", path: "/produk", icon: <FaCoffee /> },
  { name: "Transaksi", path: "/transaksi", icon: <FaReceipt /> },
  { name: "Laporan", path: "/laporan", icon: <FaChartBar /> },
  { name: "Pengguna", path: "/pengguna", icon: <FaUsers /> },
  { name: "Pengaturan", path: "/pengaturan", icon: <FaCog /> },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="w-72 h-screen sticky top-0 bg-gradient-to-b from-[#4B2E2B] to-[#2F1B18] text-white flex flex-col shadow-2xl">
      
      {/* Logo */}
      <div className="p-6 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          {/* PERBAIKAN: Menggunakan ikon FaCoffee diganti dari emoji */}
          <div className="w-14 h-14 rounded-xl bg-white text-[#4B2E2B] flex items-center justify-center text-3xl shadow-lg transform -rotate-6">
            <FaCoffee className="transform rotate-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              Coffee POS
            </h1>
            <p className="text-sm text-gray-300">
              Admin Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="px-6 py-5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div>
            <h3 className="font-semibold">
              Administrator
            </h3>
            <p className="text-xs text-green-300">
              ● Online
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 py-5 overflow-y-auto scrollbar-hide">
        <p className="px-6 mb-3 text-xs uppercase tracking-widest text-gray-400">
          Main Menu
        </p>

        {menus.map((menu) => {
          const active = location.pathname === menu.path;

          return (
            <Link
              key={menu.name}
              to={menu.path}
              className={`mx-3 mb-2 flex items-center gap-4 rounded-xl px-5 py-3 transition-all duration-300
              ${
                active
                  ? "bg-white text-[#4B2E2B] shadow-lg font-semibold"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }
              `}
            >
              <span className="text-lg">
                {menu.icon}
              </span>
              <span>
                {menu.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-5 border-t border-white/10 shrink-0">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </aside>
  );
}