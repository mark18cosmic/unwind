import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/auth/AuthContext";
import { db } from "@/services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import UnwindLogo from "@/assets/Unwind.png";

const CreateListing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    island: "",
    image: "",
    pricePerNight: "",
    rating: "",
    amenities: "",
    offpeakDiscount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const guesthouseCol = collection(db, "guesthouses");

      await addDoc(guesthouseCol, {
        name: form.name,
        island: form.island,
        image: form.image,
        pricePerNight: Number(form.pricePerNight),
        rating: Number(form.rating),
        amenities: form.amenities.split(",").map((a) => a.trim()),
        offpeakDiscount: Number(form.offpeakDiscount),
        ownerId: user.uid,
        createdAt: serverTimestamp(),
      });

      navigate("/home");
    } catch (err) {
      console.error("Error creating listing:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="relative w-full max-w-md bg-white p-8 pt-16 rounded-lg shadow-lg">
        {/* Logo overlapping top of form */}

        <Link to="/home">
          <img
            src={UnwindLogo}
            alt="Unwind Logo"
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full shadow-lg"
          />
        </Link>
        <h1 className="text-2xl font-bold text-center mb-6 mt-4">
          Add a New Listing
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Guesthouse Name"
            value={form.name}
            onChange={handleChange}
            required
            className="input px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            name="island"
            placeholder="Island"
            value={form.island}
            onChange={handleChange}
            required
            className="input px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            required
            className="input px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            name="pricePerNight"
            type="number"
            placeholder="Price per Night"
            value={form.pricePerNight}
            onChange={handleChange}
            className="input px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            name="rating"
            type="number"
            placeholder="Rating (e.g., 4.5)"
            value={form.rating}
            onChange={handleChange}
            className="input px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            name="amenities"
            placeholder="Amenities (comma separated)"
            value={form.amenities}
            onChange={handleChange}
            className="input px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            name="offpeakDiscount"
            type="number"
            placeholder="Off-peak Discount (%)"
            value={form.offpeakDiscount}
            onChange={handleChange}
            className="input px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" className="mt-2 w-full">
            Create Listing
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
