import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CertificateDetails() {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/certificates/${id}`);
        setCertificate(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch certificate details");
      }
    };

    fetchCertificate();
  }, [id]);

  if (!certificate)
    return <h1 className="text-center text-xl mt-10">Loading...</h1>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Certificate Details
        </h1>

        <div className="space-y-3">
          <p><strong>Certificate ID:</strong> {certificate.certificateId}</p>
          <p><strong>Filename:</strong> {certificate.filename}</p>
          <p><strong>SHA-256 Hash:</strong></p>
          <p className="break-all bg-gray-100 p-2 rounded">{certificate.hash}</p>

          <p>
            <strong>Uploaded At:</strong>{" "}
            {new Date(certificate.uploadedAt).toLocaleString()}
          </p>

          <a
            href={`http://localhost:5000/${certificate.path}`}
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded block text-center mt-4"
          >
            Download Certificate
          </a>
        </div>

        <button className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
          Generate Proof (Coming Soon)
        </button>
      </div>
    </div>
  );
}

export default CertificateDetails;