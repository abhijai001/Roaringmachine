"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

interface Bike {
  _id: string;
  title: string;
  brand: string;
  model?: string;
  year: number;
  price: number;
  images: string[];
}

export default function DashboardPage() {
  const [myBikes, setMyBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBikes();
  }, []);

  const fetchMyBikes = async () => {
    try {
      const res = await api.get("/bikes");
      setMyBikes(res.data);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to load your listings"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/bikes/${id}`);

      setMyBikes((prev) => prev.filter((bike) => bike._id !== id));

      toast.success("Listing deleted successfully");
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to delete listing"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-white">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Seller Dashboard
        </h1>

        <Link
          href="/sell"
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded transition"
        >
          Add New Listing
        </Link>
      </div>

      {myBikes.length === 0 ? (
        <p className="text-zinc-400">
          You haven't listed any superbikes yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBikes.map((bike) => (
            <div
              key={bike._id}
              className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full bg-zinc-800">
                  {bike.images &&
                  bike.images.length > 0 &&
                  bike.images[0] ? (
                    <Image
  src={bike.images[0]}
  alt={bike.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover object-center"
/>
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-500">
                      No Image Available
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold text-white">
                    {bike.title}
                  </h2>

                  <p className="text-zinc-400 mt-1">
                    {bike.brand}
                    {bike.model ? ` • ${bike.model}` : ""}
                  </p>

                  <p className="text-zinc-400">
                    Year: {bike.year}
                  </p>

                  <p className="text-emerald-400 font-bold text-lg">
  ₹ {bike.price.toLocaleString("en-IN")}
</p>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-zinc-800 p-4">
                <Link
                  href={`/bikes/${bike._id}`}
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleDelete(bike._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}