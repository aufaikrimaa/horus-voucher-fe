import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/comp/Navbar";
import Sidebar from "@/components/comp/Sidebar";

function VouchersDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (!token) {
      navigate("/");
      alert(
        "Sesi sudah berakhir /anda belum login, Silahkan login terlebih dahulu!"
      );
    }
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  );
}
export default VouchersDashboard;
