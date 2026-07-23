"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import {
  Bike,
  Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";

interface BikeData {
  _id: string;
  title: string;
  brand: string;
  model?: string;
  year: number;
  price: number;
  mileage?: number;
  engineCapacity?: string;
  description?: string;
  images: string[];
  isAvailable: boolean;
  isFeatured: boolean;
}

export default function BikesPage() {
  const [bikes, setBikes] = useState<BikeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const res = await api.get("/bikes");

      setBikes(res.data);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load bikes"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteBike = async (id: string) => {
    const confirmDelete = window.confirm(
      "Delete this bike permanently?"
    );
    

    if (!confirmDelete) return;

    try {
      await api.delete(`/bikes/${id}`);

      setBikes((prev) =>
        prev.filter((bike) => bike._id !== id)
      );

      toast.success("Bike deleted successfully");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete bike"
      );
    }
  };
const toggleAvailability = async (
  id: string,
  currentStatus: boolean
) => {
  try {
    const data = new FormData();
    data.append("isAvailable", String(!currentStatus));

    await api.put(`/bikes/${id}`, data, {
      
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Status Updated");
    setBikes((prev) =>
      prev.map((bike) =>
        bike._id === id
          ? { ...bike, isAvailable: !currentStatus }
          : bike
      )
    );

    toast.success("Bike status updated");
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "Failed to update status"
    );
  }
};
const toggleFeatured = async (
  id: string,
  currentStatus: boolean
) => {
  try {
    const data = new FormData();
    data.append("isFeatured", String(!currentStatus));

    await api.put(`/bikes/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setBikes((prev) =>
      prev.map((bike) =>
        bike._id === id
          ? { ...bike, isFeatured: !currentStatus }
          : bike
      )
    );

    toast.success("Featured status updated");
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "Failed to update featured status"
    );
  }
};
  const filteredBikes = useMemo(() => {
    return bikes.filter((bike) => {
      const query = search.toLowerCase();

      return (
        bike.title.toLowerCase().includes(query) ||
        bike.brand.toLowerCase().includes(query) ||
        bike.model?.toLowerCase().includes(query)
      );
    });
  }, [bikes, search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-yellow-500 text-xl">
        Loading bikes...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-6">

        <div>

          <p className="uppercase tracking-[0.35em] text-yellow-500 text-sm">
            Inventory
          </p>

          <h1 className="text-5xl font-black mt-3">
            Manage Bikes
          </h1>

        </div>

        <Link
          href="/dashboard/bikes/add"
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Bike
        </Link>

      </div>

      {/* Search */}

      <div className="relative">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, brand or model..."
          className="w-full bg-[#111] border border-yellow-500/20 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-yellow-500"
        />

      </div>
            {/* Bike Grid */}

      {filteredBikes.length === 0 ? (
        <div className="bg-[#111] border border-yellow-500/20 rounded-3xl p-16 text-center">

          <Bike
            size={60}
            className="mx-auto text-yellow-500 mb-6"
          />

          <h2 className="text-3xl font-bold">
            No Bikes Found
          </h2>

          <p className="text-gray-400 mt-4">
            {search
              ? "No bikes match your search."
              : "Start building your inventory by adding your first superbike."}
          </p>

          {!search && (
            <Link
              href="/dashboard/bikes/add"
              className="inline-flex mt-8 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold"
            >
              Add Your First Bike
            </Link>
          )}

        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredBikes.map((bike) => (

            <div
              key={bike._id}
              className="bg-[#111] border border-yellow-500/20 rounded-3xl overflow-hidden hover:border-yellow-500 transition"
            >

              {/* Image */}

              <div className="relative h-64 bg-zinc-900">

                {bike.images?.length > 0 ? (
                  <Image
                    src={bike.images[0]}
                    alt={bike.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

              </div>

              {/* Content */}

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  {bike.title}
                </h2>
                <div className="mt-2">
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      bike.isAvailable
        ? "bg-green-600 text-white"
        : "bg-red-600 text-white"
    }`}
  >
    {bike.isAvailable ? "Available" : "Sold Out"}
  </span>
</div>


                <p className="text-gray-400 mt-2">
                  {bike.brand}
                  {bike.model && ` • ${bike.model}`}
                </p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
  {bike.description}
</p>
                <div className="mt-5 space-y-2 text-sm text-gray-400">

                  <div className="flex justify-between">
                    <span>Year</span>
                    <span>{bike.year}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Mileage</span>
                    <span>{bike.mileage ?? "-"} km</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Engine</span>
                    <span>{bike.engineCapacity ?? "-"}</span>
                  </div>

                </div>

                <div className="mt-6">

                  <p className="text-yellow-500 text-3xl font-black">
                    ₹ {bike.price.toLocaleString("en-IN")}
                  </p>

                </div>

                {/* Actions */}

                <div className="grid grid-cols-4 gap-3 mt-8">

                  <Link
                    href={`/dashboard/bikes/edit/${bike._id}`}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
                  >
                    <Pencil size={18} />
                    Edit
                  </Link>
                  <button
  onClick={() =>
    toggleAvailability(bike._id, bike.isAvailable)
  }
  className={`py-3 rounded-xl font-semibold transition ${
    bike.isAvailable
      ? "bg-orange-500 hover:bg-orange-400 text-white"
      : "bg-green-600 hover:bg-green-500 text-white"
  }`}
>
  {bike.isAvailable
    ? "Mark Sold Out"
    : "Mark Available"}
</button>
<button
  onClick={() =>
    toggleFeatured(bike._id, bike.isFeatured)
  }
  className={`py-3 rounded-xl font-semibold transition ${
    bike.isFeatured
      ? "bg-yellow-500 hover:bg-yellow-400 text-black"
      : "border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
  }`}
>
  {bike.isFeatured
    ? "★ Featured"
    : "☆ Feature"}
</button>
                  <button
                    onClick={() => deleteBike(bike._id)}
                    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                  
                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}