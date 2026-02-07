import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GuesthouseCard from "@/components/guesthouse/GuesthouseCard";
import { AuthContext } from "@/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Waves } from "lucide-react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase";

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

  // Dummy guesthouse data
  const dummyGuesthouses: Guesthouse[] = [
    {
      name: "Ocean Breeze Guesthouse",
      island: "Maafushi",
      image: "https://source.unsplash.com/400x300/?beach,hotel",
      rating: 4.5,
      pricePerNight: 120,
      amenities: ["Beach Access", "WiFi", "Restaurant"],
      offpeakDiscount: 15,
      ownerId: user?.uid || "guesthouse_1",
      createdAt: new Date(),
    },
    {
      name: "Sunny Stay",
      island: "Maafushi",
      image: "https://source.unsplash.com/400x300/?resort,hotel",
      rating: 4.2,
      pricePerNight: 95,
      amenities: ["WiFi", "Restaurant"],
      offpeakDiscount: 10,
      ownerId: user?.uid || "guesthouse_2",
      createdAt: new Date(),
    },
    {
      name: "Lagoon View Guesthouse",
      island: "Maafushi",
      image: "https://source.unsplash.com/400x300/?lagoon,hotel",
      rating: 4.7,
      pricePerNight: 150,
      amenities: ["Beach Access", "WiFi"],
      offpeakDiscount: 20,
      ownerId: user?.uid || "guesthouse_3",
      createdAt: new Date(),
    },
  ];

  // Fetch guesthouses from Firestore and seed if empty
  const fetchGuesthouses = async () => {
    try {
      const guesthouseCol = collection(db, "guesthouses");
      const snapshot = await getDocs(guesthouseCol);

      if (snapshot.empty) {
        console.log("No guesthouses found. Seeding dummy data...");
        for (const gh of dummyGuesthouses) {
          await addDoc(guesthouseCol, gh);
        }
      }

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

  // Delete guesthouse
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteDoc(doc(db, "guesthouses", id));
      setGuesthouses((prev) => prev.filter((gh) => gh.id !== id));
    } catch (err) {
      console.error("Failed to delete listing:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-md">
        <Link to="/" className="flex items-center gap-2">
        <img src="/src/assets/Unwind.png" alt="logo" className="w-10 h-10" />
          <span className="hidden md:block font-bold text-lg">Unwind</span>
        </Link>

        <div className="flex items-center gap-3">
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
            <span className="font-medium text-sm">
              Welcome, {user.username}
            </span>
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
