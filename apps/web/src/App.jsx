import { Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import UploadCertificate from "./pages/UploadCertificate.jsx";
import GenerateProof from "./pages/GenerateProof.jsx";
import VerifyProof from "./pages/VerifyProof.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<UploadCertificate />} />
      <Route path="/generate-proof" element={<GenerateProof />} />
      <Route path="/verify/:id" element={<VerifyProof />} />
    </Routes>
  );
}

export default App;