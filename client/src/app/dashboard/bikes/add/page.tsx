"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { api } from "@/lib/axios";
import { Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddBikePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

 const [previews, setPreviews] = useState<string[]>([]);

const [images, setImages] = useState<File[]>([]);

  const [form, setForm] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    engineCapacity: "",
    description: "",
    isAvailable: "true",
  });

const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.length) return;

  const files = Array.from(e.target.files);

  setImages(files);

  setPreviews(files.map((file) => URL.createObjectURL(file)));
};

 const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (images.length === 0) {
  toast.error("Please select at least one image.");
  return;
}

    try {
      setLoading(true);

      const data = new FormData();

      images.forEach((image) => {
  data.append("image", image);
});

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      await api.post("/add-bike", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Bike added successfully.");

      router.push("/dashboard/bikes");
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to add bike."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">

      <Link
        href="/dashboard/bikes"
        className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 mb-8"
      >
        <ArrowLeft size={20} />
        Back to Inventory
      </Link>

      <div className="bg-[#111] border border-yellow-500/20 rounded-3xl p-8">

        <h1 className="text-4xl font-black mb-2">
          Add New Bike
        </h1>

        <p className="text-gray-400 mb-10">
          Fill in the bike details below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
                  {/* Image Upload */}

          <div>

            <label className="block mb-3 font-semibold">
              Bike Image
            </label>

            <label className="cursor-pointer">

              <input
  type="file"
  accept="image/*"
  multiple
  onChange={handleImage}
  className="hidden"
/>

              <div className="border-2 border-dashed border-yellow-500/30 rounded-2xl h-72 flex items-center justify-center overflow-hidden hover:border-yellow-500 transition">

                {previews.length > 0 ? (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 w-full h-full overflow-y-auto">
    {previews.map((preview, index) => (
      <div
        key={index}
        className="relative h-32 rounded-xl overflow-hidden"
      >
        <Image
          src={preview}
          alt={`Preview ${index + 1}`}
          fill
          className="object-cover"
        />
      </div>
    ))}
  </div>
) : (
                  <div className="text-center">

                    <Upload
                      size={60}
                      className="mx-auto text-yellow-500"
                    />

                    <p className="mt-4 text-lg font-semibold">
                      Click to upload bike image
                    </p>

                    <p className="text-gray-400 text-sm mt-2">
                      JPG, PNG or WEBP
                    </p>

                  </div>
                )}

              </div>

            </label>

          </div>

          {/* Form Fields */}

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2">Title</label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 focus:border-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2">Brand</label>

              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 focus:border-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2">Model</label>

              <input
                type="text"
                name="model"
                value={form.model}
                onChange={handleChange}
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 focus:border-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2">Year</label>

              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                required
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 focus:border-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2">Price (₹)</label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 focus:border-yellow-500 outline-none"
              />
            </div>
            <div>
  <label className="block text-sm font-medium mb-2">
    Status
  </label>

  <select
    name="isAvailable"
    value={form.isAvailable}
    onChange={handleChange}
    className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 focus:border-yellow-500 outline-none"
  >
    <option value="true">Available</option>
    <option value="false">Sold Out</option>
  </select>
</div>
            <div>
              <label className="block mb-2">Mileage (km)</label>

              <input
                type="number"
                name="mileage"
                value={form.mileage}
                onChange={handleChange}
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 focus:border-yellow-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2">Engine Capacity</label>

              <input
                type="text"
                name="engineCapacity"
                value={form.engineCapacity}
                onChange={handleChange}
                placeholder="e.g. 998cc"
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 focus:border-yellow-500 outline-none"
              />
            </div>

          </div>

          {/* Description */}

          <div>

            <label className="block mb-2">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 resize-none focus:border-yellow-500 outline-none"
            />

          </div>

          {/* Submit */}

          <button
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black py-4 rounded-xl font-bold text-lg transition"
          >
            {loading ? "Adding Bike..." : "Add Bike"}
          </button>

        </form>

      </div>

    </div>
  );
}