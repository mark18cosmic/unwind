import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebase";
import { UserRole } from "../../types/user";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Unwind from "@/assets/Unwind.png"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("company");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setError(null);

      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(cred.user, { displayName: username });

      await setDoc(doc(db, "users", cred.user.uid), {
        email,
        username,
        role,
        photoURL: null,
      });

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
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />

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

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="company">Company</option>
            <option value="guesthouse">Guesthouse</option>
          </select>

          <Button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </Button>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
