import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ name, email, password });
      alert("Account created!");
      navigate("/");
    } catch {
      alert("Failed to register");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow" onSubmit={handleRegister}>
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input className="border p-2 w-full mb-3" type="text" placeholder="Full Name"
          onChange={(e) => setName(e.target.value)} />

        <input className="border p-2 w-full mb-3" type="email" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input className="border p-2 w-full mb-3" type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="bg-blue-600 w-full py-2 text-white rounded">Register</button>

        <p className="mt-2 text-sm text-center">
          Already have an account? <Link to="/" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;