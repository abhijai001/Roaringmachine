"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";

export default function SellPage() {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
  sellerName: "",
  phone: "",
  email: "",

  title: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  price: "",
  mileage: "",
  engineCapacity: "",
  description: "",
});

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
  toast.error("Please select at least one image.");
  return;
}

    setSubmitting(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value.toString());
      });

      imageFiles.forEach((image) => {
  data.append("image", image);
});

      const response = await api.post("/sell-request", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    console.log("Sell Request Submitted:", response.data);

toast.success(
  "Your request has been submitted successfully. Our team will review it and contact you soon."
);

router.push("/");
    } catch (error: any) {
      console.error("Add Bike Error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to list superbike";

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">
        List Your Superbike
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <div>
    <label className="block text-sm font-medium text-zinc-400 mb-1">
      Seller Name
    </label>

    <input
      type="text"
      name="sellerName"
      required
      value={formData.sellerName}
      onChange={handleChange}
      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-zinc-400 mb-1">
      Phone Number
    </label>

    <input
      type="text"
      name="phone"
      required
      value={formData.phone}
      onChange={handleChange}
      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
    />
  </div>

</div>

<div>

  <label className="block text-sm font-medium text-zinc-400 mb-1">
    Email
  </label>

  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
  />

</div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">
            Listing Title
          </label>

          <input
            type="text"
            name="title"
            required
            placeholder="e.g. Ducati Panigale V4"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Brand
            </label>

            <input
              type="text"
              name="brand"
              required
              placeholder="Ducati"
              value={formData.brand}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Model
            </label>

            <input
              type="text"
              name="model"
              placeholder="Panigale V4"
              value={formData.model}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Year
            </label>

            <input
              type="number"
              name="year"
              required
              value={formData.year}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Price
            </label>

            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Mileage
            </label>

            <input
              type="number"
              name="mileage"
              required
              value={formData.mileage}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">
            Engine Capacity
          </label>

          <input
            type="text"
            name="engineCapacity"
            required
            placeholder="1103cc"
            value={formData.engineCapacity}
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">
            Description
          </label>

          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your bike..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">
            Bike Image
          </label>

          <input
  type="file"
  accept="image/*"
  multiple
  required
  onChange={(e) =>
    setImageFiles(Array.from(e.target.files || []))
  }
  className="w-full text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700"
/>

</div>

<button
          type="submit"
          disabled={submitting}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded transition-colors disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}