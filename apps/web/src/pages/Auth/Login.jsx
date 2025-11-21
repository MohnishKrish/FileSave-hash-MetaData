import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      login(res.data.token);
      navigate("/upload");
    } catch {
      alert("Invalid login details");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input className="border p-2 w-full mb-3" type="email" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input className="border p-2 w-full mb-3" type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="bg-blue-600 w-full py-2 text-white rounded">Login</button>

        <p className="mt-2 text-sm text-center">
          No account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;