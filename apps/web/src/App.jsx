import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UploadCertificate from "./pages/UploadCertificate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<UploadCertificate />} />
    </Routes>
  );
}

export default App;