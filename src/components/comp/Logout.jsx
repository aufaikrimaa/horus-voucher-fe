import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";

function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("userData");
        alert(data.message);
        navigate("/");
      }
    } catch (error) {
      alert("error");
    }
  };
  return (
    <>
      <Button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-lg px-3 py-2 w-full"
        variant="destructive"
      >
        Logout
      </Button>
    </>
  );
}

export default Logout;
