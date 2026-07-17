import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Swal from "sweetalert2";
import { 
  FaStore, 
  FaPercentage, 
  FaPrint, 
  FaSave 
} from "react-icons/fa";

export default function Pengaturan() {
  // State untuk data pengaturan
  const [storeData, setStoreData] = useState({
    nama: "Coffee POS Indonesia",
    telepon: "0812-3456-7890",
    alamat: "Jl. Sudirman No. 123, Jakarta Selatan",
  });

  const [taxData, setTaxData] = useState({
    pajak: 10,
    biayaLayanan: 5,
  });

  const [receiptData, setReceiptData] = useState({
    header: "Terima kasih atas kunjungan Anda!",
    footer: "Kritik & Saran: info@coffeepos.com",
    ukuranKertas: "58mm",
  });

  // Aksi Simpan Pengaturan
  const handleSave = (e) => {
    e.preventDefault();
    
    // Tampilkan loading sebentar lalu sukses
    Swal.fire({
      title: 'Menyimpan Pengaturan...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Tersimpan!",
        text: "Pengaturan sistem berhasil diperbarui.",
        confirmButtonColor: "#6F4E37",
      });
    }, 1000); // delay 1 detik seolah-olah request ke server
  };

  return (
    <MainLayout>
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Pengaturan</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Konfigurasi identitas kedai, pajak, dan cetak struk.</p>
        </div>
        
        <button 
          onClick={handleSave}
          className="bg-[#6F4E37] text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-[#5A3A36] transition-all shadow-md active:scale-95 text-sm"
        >
          <FaSave />
          Simpan Perubahan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Kolom Kiri */}
        <div className="space-y-6">
          
          {/* Card: Profil Kedai */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-lg">
                <FaStore />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Profil Kedai</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Kedai</label>
                <input 
                  type="text" 
                  value={storeData.nama}
                  onChange={(e) => setStoreData({...storeData, nama: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6F4E37]/30 focus:border-[#6F4E37] text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Telepon</label>
                <input 
                  type="text" 
                  value={storeData.telepon}
                  onChange={(e) => setStoreData({...storeData, telepon: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6F4E37]/30 focus:border-[#6F4E37] text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Alamat Lengkap</label>
                <textarea 
                  rows="3"
                  value={storeData.alamat}
                  onChange={(e) => setStoreData({...storeData, alamat: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6F4E37]/30 focus:border-[#6F4E37] text-sm transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Card: Pajak & Biaya */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center text-lg">
                <FaPercentage />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Pajak & Biaya Lainnya</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">PPN (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={taxData.pajak}
                    onChange={(e) => setTaxData({...taxData, pajak: e.target.value})}
                    className="w-full pl-4 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6F4E37]/30 focus:border-[#6F4E37] text-sm transition-all"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Biaya Layanan (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={taxData.biayaLayanan}
                    onChange={(e) => setTaxData({...taxData, biayaLayanan: e.target.value})}
                    className="w-full pl-4 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6F4E37]/30 focus:border-[#6F4E37] text-sm transition-all"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">%</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">*Pajak dan biaya layanan akan otomatis ditambahkan ke total belanja pelanggan di halaman kasir.</p>
          </div>

        </div>

        {/* Kolom Kanan */}
        <div className="space-y-6">
          
          {/* Card: Pengaturan Struk Printer */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-lg">
                <FaPrint />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Format Struk Kasir</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ukuran Kertas Printer</label>
                <select 
                  value={receiptData.ukuranKertas}
                  onChange={(e) => setReceiptData({...receiptData, ukuranKertas: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6F4E37]/30 focus:border-[#6F4E37] text-sm transition-all cursor-pointer"
                >
                  <option value="58mm">Printer Thermal 58mm (Kecil)</option>
                  <option value="80mm">Printer Thermal 80mm (Besar)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Teks Header Struk</label>
                <textarea 
                  rows="2"
                  value={receiptData.header}
                  onChange={(e) => setReceiptData({...receiptData, header: e.target.value})}
                  placeholder="Misal: Selamat Datang di Kedai Kami"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6F4E37]/30 focus:border-[#6F4E37] text-sm transition-all resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Teks Footer Struk</label>
                <textarea 
                  rows="2"
                  value={receiptData.footer}
                  onChange={(e) => setReceiptData({...receiptData, footer: e.target.value})}
                  placeholder="Misal: Barang yang sudah dibeli tidak dapat ditukar"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6F4E37]/30 focus:border-[#6F4E37] text-sm transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* Preview Struk Mini */}
            <div className="mt-6 p-4 bg-gray-100 rounded-xl border border-gray-200 font-mono text-xs text-center text-gray-600">
              <p className="font-bold text-gray-800 text-sm mb-2">{storeData.nama}</p>
              <p>{storeData.alamat}</p>
              <p className="mb-2">Telp: {storeData.telepon}</p>
              <p className="border-t border-dashed border-gray-400 py-2">-- {receiptData.header} --</p>
              <p className="py-2">[ Daftar Pesanan ]</p>
              <p className="border-t border-dashed border-gray-400 py-2">-- {receiptData.footer} --</p>
            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}