import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Swal from "sweetalert2";
import { 
  FaSearch, 
  FaFilter, 
  FaCalendarAlt, 
  FaEye, 
  FaPrint,
  FaFileDownload
} from "react-icons/fa";

// Data Dummy Transaksi
const DUMMY_TRANSACTIONS = [
  { 
    id: "TRX-1092", date: "17 Jul 2026", time: "10:30", customer: "Walk-in", 
    cashier: "Kasir 1", method: "Tunai", total: 48000, status: "Berhasil",
    items: [{ name: "Cafe Latte", qty: 2, price: 24000 }]
  },
  { 
    id: "TRX-1091", date: "17 Jul 2026", time: "10:15", customer: "GoFood (Andi)", 
    cashier: "Kasir 1", method: "QRIS", total: 125000, status: "Berhasil",
    items: [{ name: "Espresso", qty: 1, price: 15000 }, { name: "Croissant", qty: 2, price: 40000 }]
  },
  { 
    id: "TRX-1090", date: "17 Jul 2026", time: "09:45", customer: "Budi", 
    cashier: "Kasir 2", method: "Kartu Debit", total: 39000, status: "Berhasil",
    items: [{ name: "Matcha Latte", qty: 1, price: 26000 }, { name: "French Fries", qty: 1, price: 13000 }]
  },
  { 
    id: "TRX-1089", date: "16 Jul 2026", time: "20:10", customer: "Walk-in", 
    cashier: "Kasir 2", method: "Tunai", total: 24000, status: "Dibatalkan",
    items: [{ name: "Cafe Latte", qty: 1, price: 24000 }]
  },
  { 
    id: "TRX-1088", date: "16 Jul 2026", time: "19:30", customer: "GrabFood", 
    cashier: "Kasir 1", method: "QRIS", total: 85000, status: "Berhasil",
    items: [{ name: "Red Velvet", qty: 2, price: 52000 }]
  },
];

export default function Transaksi() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Filter Data
  const filteredTransactions = DUMMY_TRANSACTIONS.filter((trx) => {
    const matchSearch = trx.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        trx.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "Semua" || trx.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Aksi Lihat Detail (Pop-up Struk)
  const handleViewDetails = (trx) => {
    let itemsHtml = trx.items.map(item => `
      <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 4px;">
        <span>${item.qty}x ${item.name}</span>
        <span>${formatRupiah(item.price * item.qty)}</span>
      </div>
    `).join('');

    Swal.fire({
      title: 'Detail Transaksi',
      html: `
        <div style="text-align: left; padding: 10px; background: #f9fafb; border-radius: 8px; font-family: monospace;">
          <p style="text-align: center; font-weight: bold; margin-bottom: 15px;">KEDAI KOPI POS</p>
          <p><strong>No TRX:</strong> ${trx.id}</p>
          <p><strong>Waktu:</strong> ${trx.date}, ${trx.time}</p>
          <p><strong>Kasir:</strong> ${trx.cashier}</p>
          <p><strong>Metode:</strong> ${trx.method}</p>
          <hr style="border-top: 1px dashed #ccc; margin: 10px 0;">
          ${itemsHtml}
          <hr style="border-top: 1px dashed #ccc; margin: 10px 0;">
          <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 16px;">
            <span>TOTAL</span>
            <span>${formatRupiah(trx.total)}</span>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: "#6F4E37",
      cancelButtonColor: "#6b7280",
      confirmButtonText: '<i class="fas fa-print"></i> Cetak Struk',
      cancelButtonText: 'Tutup'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Berhasil", "Struk sedang dicetak...", "success");
      }
    });
  };

  return (
    <MainLayout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Riwayat Transaksi</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Pantau semua aktivitas penjualan dan pemasukan.</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
          <FaFileDownload className="text-[#6F4E37]" />
          Export Data
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Toolbar: Search & Filter */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari No. TRX atau Pelanggan..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/30 text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="date" 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/30"
              />
            </div>
            <select
              className="w-full md:w-40 py-2 px-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/30 text-gray-700 cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Semua">Semua Status</option>
              <option value="Berhasil">Berhasil</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="p-4 pl-6">ID Transaksi</th>
                <th className="p-4">Waktu</th>
                <th className="p-4">Pelanggan</th>
                <th className="p-4">Pembayaran</th>
                <th className="p-4">Total</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 pr-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 pl-6 font-bold text-gray-800">
                      {trx.id}
                    </td>
                    <td className="p-4 text-gray-600">
                      <div className="font-medium text-gray-800">{trx.date}</div>
                      <div className="text-xs">{trx.time}</div>
                    </td>
                    <td className="p-4 text-gray-700 font-medium">
                      {trx.customer}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium border border-gray-200 inline-block">
                        {trx.method}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-[#6F4E37]">
                      {formatRupiah(trx.total)}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                        trx.status === "Berhasil" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {trx.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 flex justify-end gap-2">
                      <button 
                        onClick={() => handleViewDetails(trx)}
                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Lihat Struk"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Cetak Ulang"
                        onClick={() => Swal.fire("Mencetak...", "Mencetak ulang struk ke printer thermal.", "info")}
                      >
                        <FaPrint />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-10 text-center text-gray-400">
                    <FaSearch className="text-3xl mx-auto mb-3 opacity-20" />
                    <p>Tidak ada transaksi yang ditemukan.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination Simple */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
          <p>Menampilkan <span className="font-semibold text-gray-700">{filteredTransactions.length}</span> dari <span className="font-semibold text-gray-700">{DUMMY_TRANSACTIONS.length}</span> transaksi</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 bg-white rounded-md hover:bg-gray-50 disabled:opacity-50">Sebelumnnya</button>
            <button className="px-3 py-1 border border-gray-200 bg-white rounded-md hover:bg-gray-50">Selanjutnya</button>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}