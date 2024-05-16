import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/comp/Navbar";
import SidebarClaimed from "@/components/comp/SidebarClaimed";

function History() {
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
      <Navbar
        selectedCategory={null}
        handleCategoryChange={null}
        remainingVouchers={{}}
      />
      <SidebarClaimed />
    </>
  );
}
export default History;
