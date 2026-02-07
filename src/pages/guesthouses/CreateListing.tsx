import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/auth/AuthContext";
import { db } from "@/services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";

const CreateListing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    island: "",
    image: "",
    pricePerNight: 0,
    rating: 0,
    amenities: "",
    offpeakDiscount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert numeric fields to numbers
    const numericFields = ["pricePerNight", "rating", "offpeakDiscount"];
    setForm({
      ...form,
      [name]: numericFields.includes(name) ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const guesthouseCol = collection(db, "guesthouses");

      await addDoc(guesthouseCol, {
        ...form,
        amenities: form.amenities.split(",").map((a) => a.trim()),
        ownerId: user.uid,
        createdAt: serverTimestamp(),
      });

      console.log("Listing created successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Error creating listing:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Guesthouse Listing</h1>
      <form className="flex flex-col gap-4 max-w-md" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Guesthouse Name"
          value={form.name}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="island"
          placeholder="Island"
          value={form.island}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="pricePerNight"
          type="number"
          placeholder="Price per Night"
          value={form.pricePerNight}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="rating"
          type="number"
          placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="amenities"
          placeholder="Amenities (comma separated)"
          value={form.amenities}
          onChange={handleChange}
          className="input"
        />
        <input
          name="offpeakDiscount"
          type="number"
          placeholder="Offpeak Discount (%)"
          value={form.offpeakDiscount}
          onChange={handleChange}
          className="input"
        />
        <Button type="submit">Create Listing</Button>
      </form>
    </div>
  );
};

export default CreateListing;
