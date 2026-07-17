import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Swal from "sweetalert2";
import { 
  FaSearch, 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaCoffee,
  FaMoneyBillWave,
  FaQrcode,
  FaCreditCard,
  FaTimes
} from "react-icons/fa";

// Data Dummy Produk
const DUMMY_PRODUCTS = [
  { id: 1, name: "Espresso", category: "Kopi", price: 15000 },
  { id: 2, name: "Americano", category: "Kopi", price: 18000 },
  { id: 3, name: "Cafe Latte", category: "Kopi", price: 24000 },
  { id: 4, name: "Cappuccino", category: "Kopi", price: 24000 },
  { id: 5, name: "Caramel Macchiato", category: "Kopi", price: 28000 },
  { id: 6, name: "Matcha Latte", category: "Non-Kopi", price: 26000 },
  { id: 7, name: "Red Velvet", category: "Non-Kopi", price: 26000 },
  { id: 8, name: "Chocolate", category: "Non-Kopi", price: 22000 },
  { id: 9, name: "French Fries", category: "Makanan", price: 15000 },
  { id: 10, name: "Croissant", category: "Makanan", price: 20000 },
  { id: 11, name: "Toast Bread", category: "Makanan", price: 18000 },
];

const CATEGORIES = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

export default function Kasir() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // State untuk Modal Checkout
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Tunai");
  const [cashAmount, setCashAmount] = useState("");

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number || 0);
  };

  const filteredProducts = DUMMY_PRODUCTS.filter((product) => {
    const matchCategory = activeCategory === "Semua" || product.category === activeCategory;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, amount) => {
    setCart(cart.map((item) => {
      if (item.id === id) {
        const newQty = item.qty + amount;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

  // Kalkulasi
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subTotal * 0.1;
  const total = subTotal + tax;
  const change = parseInt(cashAmount || 0) - total;

  // Fungsi Konfirmasi Pembayaran Final
  const submitPayment = () => {
    if (paymentMethod === "Tunai" && change < 0) {
      Swal.fire("Uang Kurang", "Nominal uang tunai tidak mencukupi!", "error");
      return;
    }

    setIsCheckoutOpen(false);
    setCart([]);
    setCashAmount("");
    setPaymentMethod("Tunai");

    Swal.fire({
      title: "Pembayaran Berhasil!",
      text: "Struk sedang dicetak...",
      icon: "success",
      confirmButtonColor: "#6F4E37",
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)]">
        
        {/* BAGIAN KIRI: MENU PRODUK */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Menu Kasir</h1>
              <p className="text-sm text-gray-500">Pilih menu untuk ditambahkan ke pesanan</p>
            </div>
            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari menu..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/30 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat ? "bg-[#6F4E37] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="border border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-md hover:border-[#6F4E37]/30 transition-all group bg-gray-50/50"
                >
                  <div className="w-full aspect-square bg-gray-200 rounded-xl mb-3 flex items-center justify-center text-gray-400 group-hover:bg-[#6F4E37]/10 transition-colors">
                    <FaCoffee className="text-3xl group-hover:text-[#6F4E37] transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{product.name}</h3>
                  <p className="text-[#6F4E37] font-bold mt-1 text-sm">{formatRupiah(product.price)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN: KERANJANG */}
        <div className="w-full lg:w-[400px] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Pesanan Saat Ini</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
                <FaCoffee className="text-4xl opacity-20" />
                <p className="text-sm">Belum ada pesanan</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                    <p className="text-[#6F4E37] text-xs font-medium">{formatRupiah(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg">
                      <button onClick={() => updateQty(item.id, -1)} className="p-2 text-gray-500 hover:text-[#6F4E37]"><FaMinus className="text-xs" /></button>
                      <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="p-2 text-gray-500 hover:text-[#6F4E37]"><FaPlus className="text-xs" /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><FaTrash className="text-sm" /></button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 bg-gray-50/50 rounded-b-2xl border-t border-gray-100">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span className="font-medium">{formatRupiah(subTotal)}</span></div>
              <div className="flex justify-between text-sm text-gray-600"><span>Pajak (10%)</span><span className="font-medium">{formatRupiah(tax)}</span></div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="font-bold text-gray-800">Total</span>
                <span className="text-xl font-extrabold text-[#6F4E37]">{formatRupiah(total)}</span>
              </div>
            </div>
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              disabled={cart.length === 0}
              className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 shadow-md ${cart.length > 0 ? "bg-[#6F4E37] text-white hover:bg-[#5A3A36]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            >
              Lanjut ke Pembayaran
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL CHECKOUT & METODE PEMBAYARAN --- */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-800">Proses Pembayaran</h2>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-400 hover:text-red-500"><FaTimes size={20} /></button>
            </div>

            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm mb-1">Total Tagihan</p>
                <h1 className="text-4xl font-extrabold text-[#6F4E37]">{formatRupiah(total)}</h1>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Metode Pembayaran</label>
                <div className="grid grid-cols-3 gap-3">
                  {/* Pilihan Tunai */}
                  <button onClick={() => setPaymentMethod("Tunai")} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'Tunai' ? 'border-[#6F4E37] bg-[#6F4E37]/10 text-[#6F4E37]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                    <FaMoneyBillWave size={24} />
                    <span className="text-sm font-semibold">Tunai</span>
                  </button>
                  {/* Pilihan QRIS */}
                  <button onClick={() => setPaymentMethod("QRIS")} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'QRIS' ? 'border-[#6F4E37] bg-[#6F4E37]/10 text-[#6F4E37]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                    <FaQrcode size={24} />
                    <span className="text-sm font-semibold">QRIS</span>
                  </button>
                  {/* Pilihan Kartu */}
                  <button onClick={() => setPaymentMethod("Kartu")} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'Kartu' ? 'border-[#6F4E37] bg-[#6F4E37]/10 text-[#6F4E37]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                    <FaCreditCard size={24} />
                    <span className="text-sm font-semibold">Kartu</span>
                  </button>
                </div>
              </div>

              {/* Jika Tunai, Tampilkan Input Nominal Uang */}
              {paymentMethod === "Tunai" && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Jumlah Uang Diterima (Rp)</label>
                    <input 
                      type="number"
                      placeholder="Masukkan nominal uang..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/30 font-semibold"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-600">Kembalian:</span>
                    <span className={`font-bold text-lg ${change < 0 ? 'text-red-500' : 'text-green-600'}`}>
                      {cashAmount ? formatRupiah(change) : 'Rp 0'}
                    </span>
                  </div>
                </div>
              )}

              {/* Jika QRIS */}
              {paymentMethod === "QRIS" && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6 flex flex-col items-center justify-center">
                  <FaQrcode className="text-6xl text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 font-medium text-center">Silakan arahkan pelanggan untuk scan QR Code di mesin kasir/EDC.</p>
                </div>
              )}

              <button 
                onClick={submitPayment}
                className="w-full py-4 rounded-xl font-bold text-white bg-[#6F4E37] hover:bg-[#5A3A36] transition-colors shadow-md text-lg"
              >
                Konfirmasi Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}