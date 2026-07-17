import MainLayout from "../../components/layout/MainLayout";
import SalesChart from "../../components/dashboard/SalesChart";
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaCoffee,
  FaUsers,
  FaArrowUp,
  FaTrophy
} from "react-icons/fa";

export default function Dashboard() {
  const cards = [
    {
      title: "Total Penjualan",
      value: "Rp 12.850.000",
      icon: <FaMoneyBillWave />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      trend: "+12%",
    },
    {
      title: "Transaksi Hari Ini",
      value: "128",
      icon: <FaShoppingCart />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      trend: "+8%",
    },
    {
      title: "Total Produk",
      value: "48",
      icon: <FaCoffee />,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
      trend: "+2%",
    },
    {
      title: "Total Pengguna",
      value: "5",
      icon: <FaUsers />,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      trend: "+1",
    },
  ];

  const products = [
    { nama: "Cappuccino", terjual: 145 },
    { nama: "Cafe Latte", terjual: 132 },
    { nama: "Americano", terjual: 120 },
    { nama: "French Fries", terjual: 95 },
  ];

  const transaksi = [
    { no: "TRX001", pelanggan: "Andi", total: "Rp 45.000", status: "Lunas" },
    { no: "TRX002", pelanggan: "Budi", total: "Rp 68.000", status: "Lunas" },
    { no: "TRX003", pelanggan: "Citra", total: "Rp 27.000", status: "Lunas" },
    { no: "TRX004", pelanggan: "Doni", total: "Rp 52.000", status: "Proses" },
  ];

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Selamat datang kembali di Coffee POS ☕
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 flex justify-between items-start border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                {card.title}
              </p>
              <h2 className="text-2xl font-bold text-gray-800">
                {card.value}
              </h2>
              <p className="text-green-500 text-xs font-semibold flex items-center gap-1 mt-2">
                <FaArrowUp className="text-[10px]" />
                {card.trend} <span className="text-gray-400 font-normal ml-1">bulan ini</span>
              </p>
            </div>
            <div
              className={`${card.bgColor} ${card.textColor} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid: Chart & Top Products */}
      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              Grafik Penjualan
            </h2>
            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none">
              <option>7 Hari Terakhir</option>
              <option>Bulan Ini</option>
              <option>Tahun Ini</option>
            </select>
          </div>
          {/* Menggunakan komponen SalesChart yang sudah Anda import */}
          <div className="w-full h-72">
            <SalesChart />
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <FaTrophy className="text-yellow-500 text-xl" />
            <h2 className="text-lg font-bold text-gray-800">
              Produk Terlaris
            </h2>
          </div>
          <div className="space-y-4">
            {products.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {item.nama}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Terjual {item.terjual} porsi
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-800">
                  {item.terjual}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">
            Transaksi Terbaru
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
            Lihat Semua
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-y border-gray-100">
                <th className="p-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  No Transaksi
                </th>
                <th className="p-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Pelanggan
                </th>
                <th className="p-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Total
                </th>
                <th className="p-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {transaksi.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors duration-150"
                >
                  <td className="p-4 text-gray-800 font-medium">
                    {item.no}
                  </td>
                  <td className="p-4 text-gray-600">
                    {item.pelanggan}
                  </td>
                  <td className="p-4 font-semibold text-gray-800">
                    {item.total}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        item.status === "Lunas"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}