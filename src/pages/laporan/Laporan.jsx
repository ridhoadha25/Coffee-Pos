import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Swal from "sweetalert2";
import { 
  FaCalendarAlt, 
  FaDownload, 
  FaFilePdf, 
  FaFileExcel,
  FaMoneyBillWave,
  FaShoppingCart,
  FaChartLine,
  FaStar
} from "react-icons/fa";

// Data Dummy Ringkasan Laporan
const SUMMARY_METRICS = [
  { title: "Total Pendapatan", value: "Rp 45.850.000", icon: <FaMoneyBillWave />, color: "text-green-600", bg: "bg-green-100" },
  { title: "Total Transaksi", value: "1,245", icon: <FaShoppingCart />, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Rata-rata Transaksi", value: "Rp 36.800", icon: <FaChartLine />, color: "text-purple-600", bg: "bg-purple-100" },
  { title: "Menu Terlaris", value: "Cafe Latte", icon: <FaStar />, color: "text-yellow-600", bg: "bg-yellow-100" },
];

// Data Dummy Tabel Laporan Harian
const REPORT_DATA = [
  { date: "17 Jul 2026", totalTrx: 85, income: 3450000, topItem: "Cafe Latte" },
  { date: "16 Jul 2026", totalTrx: 92, income: 3820000, topItem: "Espresso" },
  { date: "15 Jul 2026", totalTrx: 78, income: 2950000, topItem: "Matcha Latte" },
  { date: "14 Jul 2026", totalTrx: 105, income: 4200000, topItem: "Croissant" },
  { date: "13 Jul 2026", totalTrx: 88, income: 3600000, topItem: "Cafe Latte" },
  { date: "12 Jul 2026", totalTrx: 110, income: 4850000, topItem: "Red Velvet" },
  { date: "11 Jul 2026", totalTrx: 95, income: 3980000, topItem: "Americano" },
];

export default function Laporan() {
  const [period, setPeriod] = useState("Minggu Ini");

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Simulasi Ekspor Data
  const handleExport = (type) => {
    Swal.fire({
      title: `Mengekspor ke ${type}`,
      text: "Mohon tunggu sebentar, data sedang diproses...",
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      Swal.fire({
        title: "Berhasil!",
        text: `Laporan berhasil diunduh dalam format ${type}.`,
        icon: "success",
        confirmButtonColor: "#6F4E37",
      });
    });
  };

  return (
    <MainLayout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Laporan Penjualan</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Analisis pendapatan, transaksi, dan performa produk.</p>
        </div>
        
        {/* Tombol Export */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleExport("Excel")}
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-green-100 transition-all shadow-sm text-sm"
          >
            <FaFileExcel />
            Excel
          </button>
          <button 
            onClick={() => handleExport("PDF")}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-red-100 transition-all shadow-sm text-sm"
          >
            <FaFilePdf />
            PDF
          </button>
        </div>
      </div>

      {/* Toolbar Filter Laporan */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 bg-[#6F4E37]/10 text-[#6F4E37] rounded-lg flex items-center justify-center">
            <FaCalendarAlt />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">Periode Laporan</h3>
            <p className="text-xs text-gray-500">Pilih rentang waktu data</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select 
            className="w-full sm:w-48 py-2 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/30 text-gray-700 font-medium"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="Hari Ini">Hari Ini</option>
            <option value="Minggu Ini">7 Hari Terakhir</option>
            <option value="Bulan Ini">Bulan Ini</option>
            <option value="Tahun Ini">Tahun Ini</option>
          </select>
          <input 
            type="date" 
            className="py-2 px-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/30 text-gray-700"
          />
        </div>
      </div>

      {/* Grid: Ringkasan Metrik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {SUMMARY_METRICS.map((metric, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${metric.bg} ${metric.color}`}>
                {metric.icon}
              </div>
              <p className="text-gray-500 text-sm font-medium">{metric.title}</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{metric.value}</h2>
          </div>
        ))}
      </div>

      {/* Grid: Grafik & Tabel Data */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Grafik Penjualan (Mockup) */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaChartLine className="text-[#6F4E37]" />
            Grafik Penjualan
          </h2>
          <div className="flex-1 flex items-end justify-between gap-2 h-48 bg-gray-50 rounded-xl border border-gray-100 p-4">
            {/* Mockup Bar Chart */}
            {[50, 70, 45, 95, 80, 110, 85].map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center justify-end h-full gap-2 group">
                <div 
                  className="w-full bg-[#6F4E37]/30 rounded-t-md hover:bg-[#6F4E37] transition-colors relative"
                  style={{ height: `${height}%` }}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {height}k
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-400 font-medium px-2">
            <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
          </div>
        </div>

        {/* Tabel Rincian */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <h2 className="text-lg font-bold text-gray-800">Rincian Pendapatan</h2>
            <button className="text-sm font-semibold text-[#6F4E37] hover:underline">
              Lihat Detail Penuh
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 pl-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Total TRX</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Menu Terlaris</th>
                  <th className="p-4 pr-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Pendapatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {REPORT_DATA.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 pl-6 font-medium text-gray-700">{data.date}</td>
                    <td className="p-4 text-center">
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-semibold text-xs border border-blue-100">
                        {data.totalTrx}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{data.topItem}</td>
                    <td className="p-4 pr-6 font-bold text-[#6F4E37] text-right">
                      {formatRupiah(data.income)}
                    </td>
                  </tr>
                ))}
                {/* Baris Total */}
                <tr className="bg-gray-50 font-bold border-t-2 border-gray-200">
                  <td colSpan="3" className="p-4 pl-6 text-right text-gray-700">Total Keseluruhan</td>
                  <td className="p-4 pr-6 text-[#6F4E37] text-right text-base">
                    {formatRupiah(26850000)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}