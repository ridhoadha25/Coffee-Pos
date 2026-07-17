import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import { 
  FaMoneyBillWave, 
  FaShoppingCart, 
  FaBox, 
  FaUsers, 
  FaArrowUp, 
  FaArrowDown,
  FaTrophy,
  FaChartLine
} from "react-icons/fa";

export default function Dashboard() {
  // --- Data Dummy ---
  const stats = [
    {
      title: "Pendapatan Hari Ini",
      value: "Rp 3.450.000",
      trend: "+15%",
      isUp: true,
      icon: <FaMoneyBillWave />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Total Transaksi",
      value: "85",
      trend: "+5%",
      isUp: true,
      icon: <FaShoppingCart />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Total Menu",
      value: "48",
      trend: "Tetap",
      isUp: true,
      icon: <FaBox />,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      title: "Shift Kasir",
      value: "3 Orang",
      trend: "-1",
      isUp: false,
      icon: <FaUsers />,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];

  const topProducts = [
    { id: 1, name: "Cafe Latte", sold: 42, price: "Rp 24.000" },
    { id: 2, name: "Espresso", sold: 38, price: "Rp 15.000" },
    { id: 3, name: "Matcha Latte", sold: 25, price: "Rp 26.000" },
    { id: 4, name: "Croissant", sold: 20, price: "Rp 20.000" },
  ];

  const recentTransactions = [
    { id: "TRX-1092", time: "10:30", customer: "Walk-in", total: "Rp 48.000", status: "Selesai", payment: "Tunai" },
    { id: "TRX-1091", time: "10:15", customer: "GoFood", total: "Rp 125.000", status: "Selesai", payment: "QRIS" },
    { id: "TRX-1090", time: "09:45", customer: "Budi", total: "Rp 39.000", status: "Selesai", payment: "Tunai" },
    { id: "TRX-1089", time: "09:10", customer: "Walk-in", total: "Rp 24.000", status: "Selesai", payment: "Kartu Debit" },
    { id: "TRX-1088", time: "08:30", customer: "GrabFood", total: "Rp 85.000", status: "Selesai", payment: "QRIS" },
  ];

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">Ringkasan performa penjualan kedai hari ini.</p>
      </div>

      {/* Grid 1: Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <div className="flex items-center gap-1 mt-2 text-xs font-semibold">
                {stat.isUp ? (
                  <FaArrowUp className="text-green-500" />
                ) : (
                  <FaArrowDown className="text-red-500" />
                )}
                <span className={stat.isUp ? "text-green-500" : "text-red-500"}>
                  {stat.trend}
                </span>
                <span className="text-gray-400 font-normal ml-1">dari kemarin</span>
              </div>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${stat.bgColor} ${stat.textColor}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Grid 2: Chart & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Placeholder Grafik Penjualan */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaChartLine className="text-[#6F4E37]" />
              Trend Penjualan
            </h2>
            <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#6F4E37]">
              <option>Hari Ini</option>
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
            </select>
          </div>
          
          {/* Ini adalah mockup visual untuk chart. Nantinya Anda bisa ganti dengan komponen Recharts / Chart.js */}
          <div className="flex-1 bg-gray-50 rounded-xl border border-gray-100 flex items-end justify-between p-4 gap-2 h-64">
             {[40, 70, 45, 90, 65, 85, 110].map((height, i) => (
               <div key={i} className="w-full bg-[#6F4E37]/20 rounded-t-md relative group hover:bg-[#6F4E37]/40 transition-colors" style={{ height: `${height}%` }}>
                 <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                   {height} Trx
                 </div>
               </div>
             ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-3 px-2">
            <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-6">
            <FaTrophy className="text-yellow-500" />
            Menu Terlaris
          </h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-[#6F4E37]/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-yellow-200 text-yellow-700' : index === 1 ? 'bg-gray-300 text-gray-700' : index === 2 ? 'bg-orange-200 text-orange-800' : 'bg-gray-200 text-gray-600'}`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#6F4E37]">{product.sold}</p>
                  <p className="text-xs text-gray-500">Terjual</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-[#6F4E37] font-semibold hover:bg-[#6F4E37]/10 rounded-lg transition-colors">
            Lihat Semua Menu
          </button>
        </div>

      </div>

      {/* Grid 3: Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Transaksi Terbaru</h2>
          <button className="text-sm text-[#6F4E37] font-semibold hover:underline">Lihat Riwayat</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 pl-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Transaksi</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Waktu</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pelanggan</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pembayaran</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="p-4 pr-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentTransactions.map((trx, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 pl-6 text-sm font-medium text-gray-800">{trx.id}</td>
                  <td className="p-4 text-sm text-gray-600">{trx.time}</td>
                  <td className="p-4 text-sm text-gray-600">{trx.customer}</td>
                  <td className="p-4 text-sm">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium border border-gray-200">
                      {trx.payment}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-800">{trx.total}</td>
                  <td className="p-4 pr-6 text-right">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      {trx.status}
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