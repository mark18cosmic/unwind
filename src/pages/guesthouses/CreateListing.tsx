import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/auth/AuthContext";
import { db } from "@/services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import UnwindLogo from "@/assets/Unwind.png";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";

const availableAmenities = [
  "WiFi",
    "Air Conditioning",
    "Swimming Pool",
    "Free Parking",
    "Breakfast Included",
    "Gym",
    "Laundry Service",
    "Ocean View",
    "Kitchen",
    "24/7 Front Desk"
];

const CreateListing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    island: "",
    image: "",
    pricePerNight: "",
    rating: 0,
    amenities: [] as string[],
    offpeakDiscount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleAmenity = (amenity: string) => {
    if (form.amenities.includes(amenity)) {
      setForm({
        ...form,
        amenities: form.amenities.filter((a) => a !== amenity),
      });
    } else {
      setForm({ ...form, amenities: [...form.amenities, amenity] });
    }
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
        rating: form.rating,
        amenities: form.amenities,
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
        {/* Logo */}
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
          {/* Name */}
          <input
            name="name"
            placeholder="Guesthouse Name"
            value={form.name}
            onChange={handleChange}
            required
            className="input px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Island */}
          <input
            name="island"
            placeholder="Island"
            value={form.island}
            onChange={handleChange}
            required
            className="input px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Image */}
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            required
            className="input px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Price Slider */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Price per Night
            </label>

            <div className="flex items-center gap-3">
              {/* Slider */}
              <Slider
                value={[Number(form.pricePerNight) || 0]}
                min={0}
                max={500}
                step={1}
                onValueChange={(val: number[]) =>
                  setForm({ ...form, pricePerNight: val[0].toString() })
                }
                className="flex-1"
              />

              {/* Manual Input */}
              <input
                type="number"
                inputMode="numeric" // 📱 opens numpad
                min={0}
                max={500}
                value={form.pricePerNight}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^\d*$/.test(v)) {
                    // allow only digits
                    setForm({ ...form, pricePerNight: v });
                  }
                }}
                className="
        w-20
        border
        rounded-lg
        px-2
        py-1
        text-right
        font-medium
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "
              />
              $
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setForm({ ...form, rating: star })}
                  className="focus:outline-none"
                >
                  {form.rating >= star ? (
                    <Star className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <Star className="w-6 h-6 text-gray-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {availableAmenities.map((amenity) => (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
                    form.amenities.includes(amenity)
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Off-peak Discount */}
          <input
            name="offpeakDiscount"
            type="number"
            placeholder="Off-peak Discount (%)"
            value={form.offpeakDiscount}
            onChange={handleChange}
            className="input px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Submit Button */}
          <Button type="submit" className="mt-2 w-full">
            Create Listing
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
