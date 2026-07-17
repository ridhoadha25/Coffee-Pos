import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Swal from "sweetalert2";
import { 
  FaSearch, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaUserShield, 
  FaUserTie, 
  FaKey,
  FaFilter
} from "react-icons/fa";

// Data Dummy Pengguna
const INITIAL_USERS = [
  { id: "USR-001", name: "Administrator", email: "admin@coffee.com", role: "Admin", status: "Aktif" },
  { id: "USR-002", name: "Sarah (Kasir 1)", email: "kasir@coffee.com", role: "Kasir", status: "Aktif" },
  { id: "USR-003", name: "Budi (Kasir 2)", email: "budi@coffee.com", role: "Kasir", status: "Aktif" },
  { id: "USR-004", name: "Citra (Kasir 3)", email: "citra@coffee.com", role: "Kasir", status: "Nonaktif" },
];

export default function Pengguna() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("Semua");

  // Filter Data
  const filteredUsers = users.filter((user) => {
    const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === "Semua" || user.role === filterRole;
    return matchSearch && matchRole;
  });

  // Aksi Hapus Pengguna
  const handleDelete = (id, name) => {
    if (id === "USR-001") {
      Swal.fire("Akses Ditolak", "Akun Administrator utama tidak dapat dihapus.", "error");
      return;
    }

    Swal.fire({
      title: "Hapus Pengguna?",
      text: `Anda yakin ingin menghapus akun ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter(u => u.id !== id));
        Swal.fire("Terhapus!", `Akun ${name} berhasil dihapus.`, "success");
      }
    });
  };

  // Aksi Tambah Pengguna (Simulasi)
  const handleAdd = () => {
    Swal.fire({
      title: "Tambah Pengguna Baru",
      text: "Formulir pendaftaran Admin/Kasir akan muncul di sini (Bisa menggunakan Modal).",
      icon: "info",
      confirmButtonColor: "#6F4E37"
    });
  };

  // Aksi Reset Password (Simulasi)
  const handleResetPassword = (name) => {
    Swal.fire({
      title: "Reset Password",
      text: `Kirim link reset password ke email ${name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6F4E37",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya, Kirim"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Terkirim!", "Instruksi reset password telah dikirim.", "success");
      }
    });
  };

  return (
    <MainLayout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Manajemen Pengguna</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Kelola hak akses untuk Admin dan Kasir.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-[#6F4E37] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-[#5A3A36] transition-all shadow-md hover:shadow-lg active:scale-95 text-sm"
        >
          <FaPlus />
          Tambah Pengguna
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Toolbar: Search & Filter */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/30">
          
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/30 text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <FaFilter className="text-gray-400" />
            <select
              className="w-full sm:w-40 py-2 px-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/30 text-gray-700 cursor-pointer"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="Semua">Semua Role</option>
              <option value="Admin">Admin</option>
              <option value="Kasir">Kasir</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="p-4 pl-6">ID</th>
                <th className="p-4">Nama Pengguna</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 pr-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 pl-6 font-medium text-gray-500 text-xs">
                      {user.id}
                    </td>
                    <td className="p-4 text-gray-800 font-semibold flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${user.role === 'Admin' ? 'bg-purple-500' : 'bg-[#6F4E37]'}`}>
                        {user.role === 'Admin' ? <FaUserShield /> : <FaUserTie />}
                      </div>
                      {user.name}
                    </td>
                    <td className="p-4 text-gray-600">
                      {user.email}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-md text-xs font-bold ${
                        user.role === "Admin" 
                          ? "bg-purple-100 text-purple-700 border border-purple-200" 
                          : "bg-orange-100 text-orange-700 border border-orange-200"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                        user.status === "Aktif" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Aktif' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 flex justify-end gap-2">
                      <button 
                        onClick={() => handleResetPassword(user.name)}
                        className="p-2 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
                        title="Reset Password"
                      >
                        <FaKey />
                      </button>
                      <button 
                        onClick={() => Swal.fire('Edit Pengguna', `Edit data ${user.name}`, 'info')}
                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit Data"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id, user.name)}
                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        title="Hapus Akun"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-gray-400">
                    <FaSearch className="text-3xl mx-auto mb-3 opacity-20" />
                    <p>Tidak ada pengguna yang ditemukan.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
          <p>Total Pengguna: <span className="font-semibold text-gray-700">{users.length}</span> Akun</p>
        </div>

      </div>
    </MainLayout>
  );
}