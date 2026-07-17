import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">

      <div>

        <h2 className="text-2xl font-bold text-gray-700">

          Dashboard

        </h2>

        <p className="text-gray-500 text-sm">

          Selamat datang di Coffee POS

        </p>

      </div>

      <div className="flex items-center gap-5">

        <button className="relative">

          <FaBell size={22} className="text-gray-600" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">

            3

          </span>

        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle size={38} className="text-[#6F4E37]" />

          <div>

            <h4 className="font-semibold">

              Admin

            </h4>

            <p className="text-sm text-gray-500">

              Administrator

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}