import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Swal from "sweetalert2";
import { 
  FaSearch, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaFilter,
  FaCoffee,
  FaTimes,
  FaImage
} from "react-icons/fa";

const INITIAL_PRODUCTS = [
  { id: "PRD001", name: "Espresso", category: "Kopi", price: 15000, stock: 50, status: "Tersedia", image: null },
  { id: "PRD002", name: "Americano", category: "Kopi", price: 18000, stock: 45, status: "Tersedia", image: null },
  { id: "PRD003", name: "Cafe Latte", category: "Kopi", price: 24000, stock: 30, status: "Tersedia", image: null },
];

export default function Produk() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", category: "Kopi", price: "", stock: "", image: null
  });

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(number);
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === "Semua" || product.category === filterCategory;
    return matchSearch && matchCategory;
  });

  // Handle Gambar Upload Lokal (Preview)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Produk?", text: "Data produk ini tidak dapat dikembalikan!", icon: "warning",
      showCancelButton: true, confirmButtonColor: "#d33", confirmButtonText: "Ya, Hapus!"
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(products.filter(p => p.id !== id));
        Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
      }
    });
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: `PRD00${products.length + 1}`,
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock),
      status: parseInt(formData.stock) > 0 ? "Tersedia" : "Habis",
      image: formData.image // Menyimpan gambar
    };
    setProducts([newProduct, ...products]); // Tambah ke atas
    setIsModalOpen(false);
    setFormData({ name: "", category: "Kopi", price: "", stock: "", image: null });
    Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Produk berhasil ditambah.', timer: 1500, showConfirmButton: false });
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Produk</h1>
          <p className="text-gray-500">Kelola data menu kopi dan makanan.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#6F4E37] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#5A3A36]">
          <FaPlus /> Tambah Produk
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between">
          <div className="relative w-80">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Cari nama..." className="w-full pl-10 pr-4 py-2 border rounded-xl" onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select className="py-2 px-3 border rounded-xl" onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="Semua">Semua Kategori</option>
              <option value="Kopi">Kopi</option>
              <option value="Non-Kopi">Non-Kopi</option>
              <option value="Makanan">Makanan</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr className="text-xs uppercase text-gray-500">
                <th className="p-4 pl-6">ID</th>
                <th className="p-4">Nama Menu & Foto</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Harga</th>
                <th className="p-4">Stok</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4 pl-6 text-gray-600">{product.id}</td>
                  <td className="p-4 font-semibold flex items-center gap-3">
                    {/* MENAMPILKAN GAMBAR JIKA ADA */}
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500">
                        <FaCoffee />
                      </div>
                    )}
                    {product.name}
                  </td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4 font-medium text-[#6F4E37]">{formatRupiah(product.price)}</td>
                  <td className="p-4 text-gray-600">{product.stock}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === "Tersedia" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 flex justify-end gap-2">
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH PRODUK (DENGAN GAMBAR) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between bg-gray-50">
              <h2 className="text-lg font-bold">Tambah Menu Baru</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500"><FaTimes size={20} /></button>
            </div>

            <form onSubmit={handleSubmitProduct} className="p-6">
              
              {/* AREA UPLOAD GAMBAR */}
              <div className="mb-5 flex flex-col items-center">
                <div className="w-24 h-24 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden mb-2 relative group cursor-pointer">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center">
                      <FaImage size={24} className="mb-1" />
                      <span className="text-[10px] font-semibold uppercase">Upload</span>
                    </div>
                  )}
                  {/* File Input tersembunyi menutupi area kotak */}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-500">Klik kotak untuk tambah foto</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold mb-1">Nama Menu</label>
                  <input type="text" required className="w-full p-2 border rounded-xl" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Kategori</label>
                  <select className="w-full p-2 border rounded-xl" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="Kopi">Kopi</option>
                    <option value="Non-Kopi">Non-Kopi</option>
                    <option value="Makanan">Makanan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Harga (Rp)</label>
                  <input type="number" required className="w-full p-2 border rounded-xl" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold mb-1">Stok Awal</label>
                  <input type="number" required className="w-full p-2 border rounded-xl" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-xl bg-gray-100">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#6F4E37] text-white">Simpan Produk</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
}