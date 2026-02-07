import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebase";
import { UserRole } from "../../types/user";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // new
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("company");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setError(null);

      // 1️⃣ Create user in Firebase Auth
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // 2️⃣ Update displayName in Firebase Auth (optional, nice for profile)
      await updateProfile(cred.user, { displayName: username });

      // 3️⃣ Save to Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        email,
        username, // new
        role,
        photoURL: null, // can be updated later
      });

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

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

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
