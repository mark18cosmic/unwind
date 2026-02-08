import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Unwind from '@/assets/Unwind.png'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link to={"/"}>
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
          <img
            src={Unwind}
            alt="Unwind Logo"
            className="w-20 h-20 rounded-full shadow-lg"
          />
        </div></Link>

        {/* Form */}
        <div className="bg-white pt-14 pb-8 px-8 rounded-lg shadow-lg relative z-0">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />

          <Button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Sign In
          </Button>

          <p className="text-sm mt-4 text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
