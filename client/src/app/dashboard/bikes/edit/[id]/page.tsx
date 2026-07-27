"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { api } from "@/lib/axios";

import {
  ArrowLeft,
  Upload,
} from "lucide-react";

interface Bike {
  _id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engineCapacity: string;
  description: string;
  images: string[];
}

export default function EditBikePage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

const [images, setImages] = useState<File[]>([]);

const [previews, setPreviews] = useState<string[]>([]);

  const [form, setForm] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    engineCapacity: "",
    description: "",
  });

  useEffect(() => {
    fetchBike();
  }, []);

  const fetchBike = async () => {
    try {
      const res = await api.get(`/bikes/${id}`);

      const bike: Bike = res.data;

      setForm({
        title: bike.title,
        brand: bike.brand,
        model: bike.model || "",
        year: String(bike.year),
        price: String(bike.price),
        mileage: String(bike.mileage || ""),
        engineCapacity: bike.engineCapacity || "",
        description: bike.description || "",
      });

      setPreviews(bike.images || []);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load bike."
      );
    } finally {
      setLoading(false);
    }
  };

const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.length) return;

  const files = Array.from(e.target.files);

  setImages(files);

  setPreviews(files.map((file) => URL.createObjectURL(file)));
};

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      images.forEach((image) => {
  data.append("image", image);
});

      await api.put(`/bikes/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Bike updated successfully.");

      router.push("/dashboard/bikes");
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update bike."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-yellow-500 text-xl">
        Loading bike...
      </div>
    );
  }

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
          Edit Bike
        </h1>

        <p className="text-gray-400 mb-10">
          Update the bike information.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >         {/* Image Upload */}

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

              <div className="border-2 border-dashed border-yellow-500/30 rounded-2xl h-72 overflow-hidden flex items-center justify-center hover:border-yellow-500 transition">

                {previews.length > 0 ? (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 w-full h-full overflow-y-auto">
    {previews.map((preview, index) => (
      <div
        key={index}
        className="relative h-32 rounded-xl overflow-hidden"
      >
        <Image
          src={preview}
          alt={`Bike ${index + 1}`}
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

                    <p className="mt-4 font-semibold">
                      Upload Bike Image
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
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 outline-none focus:border-yellow-500"
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
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block mb-2">Model</label>

              <input
                type="text"
                name="model"
                value={form.model}
                onChange={handleChange}
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 outline-none focus:border-yellow-500"
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
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 outline-none focus:border-yellow-500"
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
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block mb-2">Mileage (km)</label>

              <input
                type="number"
                name="mileage"
                value={form.mileage}
                onChange={handleChange}
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 outline-none focus:border-yellow-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2">
                Engine Capacity
              </label>

              <input
                type="text"
                name="engineCapacity"
                value={form.engineCapacity}
                onChange={handleChange}
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 outline-none focus:border-yellow-500"
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
              className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 resize-none outline-none focus:border-yellow-500"
            />

          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black py-4 rounded-xl font-bold text-lg transition"
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>

        </form>

      </div>

    </div>
  );
}