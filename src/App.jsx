import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VouchersDashboard from "./pages/VouchersDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<VouchersDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
