import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import GuesthouseCard from "@/components/guesthouse/GuesthouseCard";
import { AuthContext } from "@/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/services/firebase";

interface Guesthouse {
  id?: string;
  name: string;
  island: string;
  image: string;
  rating: number;
  pricePerNight: number;
  amenities: string[];
  offpeakDiscount?: number;
  ownerId: string;
  createdAt: Date;
}

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [guesthouses, setGuesthouses] = useState<Guesthouse[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dummy guesthouses
  

  // Fetch guesthouses
  const fetchGuesthouses = async () => {
    try {
      const guesthouseCol = collection(db, "guesthouses");
      const snapshot = await getDocs(guesthouseCol);


      const allDocs = await getDocs(guesthouseCol);
      const allGuesthouses = allDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Guesthouse[];
      setGuesthouses(allGuesthouses);
    } catch (err) {
      console.error("Error fetching guesthouses:", err);
    }
  };

  useEffect(() => {
    fetchGuesthouses();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteDoc(doc(db, "guesthouses", id));
      setGuesthouses((prev) => prev.filter((gh) => gh.id !== id));
    } catch (err) {
      console.error("Failed to delete listing:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-md relative">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/Unwind.png" alt="logo" className="w-10 h-10" />
          <span className="hidden md:block font-bold text-lg">Unwind</span>
        </Link>

        <div className="flex items-center gap-3 relative">
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
            <div ref={dropdownRef} className="relative">
              <button
                className="flex items-center gap-1 font-medium text-sm focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.username}
                <ChevronDown className="w-4 h-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  {user.role === "guesthouse" && (
                    <Link
                      to="/guesthouse/create"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Create Listing
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Available Listings</h1>
          {user?.role === "guesthouse" && (
            <Button onClick={() => navigate("/guesthouse/create")}>
              + Create New Listing
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guesthouses.map((gh) => (
            <GuesthouseCard
              key={gh.id}
              id={gh.id || ""}
              ownerId={gh.ownerId}
              currentUserId={user?.uid || ""}
              onDelete={handleDelete}
              name={gh.name}
              island={gh.island}
              image={gh.image}
              rating={gh.rating}
              pricePerNight={gh.pricePerNight}
              amenities={gh.amenities}
              offpeakDiscount={gh.offpeakDiscount}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
