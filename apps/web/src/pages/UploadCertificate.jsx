import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadCertificate() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a certificate!");

    const formData = new FormData();
    formData.append("file", file); // MUST MATCH multer.single("file")

    try {
      const res = await axios.post(
        "http://localhost:5000/certificates/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(res.data);
      alert("Certificate uploaded successfully!");
      
      navigate(`/certificate/${res.data.certificateId}`);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">Upload Certificate</h1>

        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-3 rounded"
            accept=".pdf,.png,.jpg,.jpeg"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadCertificate;