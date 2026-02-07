import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Waves } from "lucide-react";
import { AuthContext } from "@/auth/AuthContext";
import GuesthouseCard from "@/components/guesthouse/GuesthouseCard";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";

// Dummy guesthouse data
const guesthouses = [
  {
    id: "1",
    name: "Ocean Breeze Guesthouse",
    location: "Maafushi",
    price: 120,
    image: "https://source.unsplash.com/400x300/?beach,hotel",
  },
  {
    id: "2",
    name: "Sunny Stay",
    location: "Maafushi",
    price: 95,
    image: "https://source.unsplash.com/400x300/?resort,hotel",
  },
  {
    id: "3",
    name: "Lagoon View Guesthouse",
    location: "Maafushi",
    price: 150,
    image: "https://source.unsplash.com/400x300/?lagoon,hotel",
  },
];

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simplified Navbar */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-md">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-ocean flex items-center justify-center">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">Unwind</span>
        </Link>

        <div className="hidden md:flex items-center gap-3 relative">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* Clickable username + PFP */}
              <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <span className="font-medium text-sm">Welcome, {user.username}</span>
                <img
                  src={user.photoURL || "https://i.pravatar.cc/40"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg flex flex-col z-50">
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 text-sm hover:bg-gray-100 text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-100 text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Guesthouse Listings</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guesthouses.map((gh) => (
            <GuesthouseCard
              key={gh.id}
              name={gh.name}
              island={gh.location}
              image={gh.image}
              rating={gh.price}
              pricePerNight={gh.price}
              amenities={[]}
              offpeakDiscount={0}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
