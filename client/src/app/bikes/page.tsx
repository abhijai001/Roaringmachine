// client/src/app/bikes/page.tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

interface Bike {
  _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  isAvailable: boolean;
}

export default function BikesPage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
const res = await api.get(
  `/bikes/paginated?search=${search}&brand=${brand}&page=${page}`
);
        setBikes(res.data.bikes);
setTotalPages(res.data.totalPages);
      } catch (error) {
        toast.error("Failed to load bikes");
      } finally {
        setLoading(false);
      }
    };
    fetchBikes();
  }, [search,brand,page]);
useEffect(() => {
  setPage(1);
}, [search, brand]);
  if (loading) {
    return <div className="text-center py-20 text-white">Loading machines...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">
  Available Bikes
</h1>

<div className="mb-8">
  <input
    type="text"
    placeholder="Search by brand or model..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none"
  />
</div>
<div className="mt-4">
  <select
    value={brand}
    onChange={(e) => setBrand(e.target.value)}
    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
  >
    <option value="">All Brands</option>
    <option value="BMW">BMW</option>
    <option value="Ducati">Ducati</option>
    <option value="Honda">Honda</option>
    <option value="Kawasaki">Kawasaki</option>
    <option value="Suzuki">Suzuki</option>
    <option value="Triumph">Triumph</option>
    <option value="Yamaha">Yamaha</option>
  </select>
</div>
{bikes.length === 0 ? (
        <p className="text-gray-400">No bikes in the showroom right now.</p>
      ) : (
<>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {bikes.map((bike) => (
      <Link
        key={bike._id}
        href={`/bikes/${bike._id}`}
        className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-lg hover:border-emerald-500 transition-colors block"
      >
        <div className="relative aspect-[4/3] w-full bg-zinc-800">
          {bike.images?.length > 0 ? (
            <Image
  src={bike.images[0]}
  alt={`${bike.brand} ${bike.model}`}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover object-center"
 />
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500">
              No Image
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {bike.brand} {bike.model}
              </h2>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  bike.isAvailable
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {bike.isAvailable ? "Available" : "Sold Out"}
              </span>
            </div>

            <span className="text-sm text-zinc-400">
              {bike.year}
            </span>
          </div>

          <p className="text-emerald-400 font-bold text-lg">
            ₹ {bike.price.toLocaleString("en-IN")}
          </p>
        </div>
      </Link>
    ))}
  </div>
{totalPages > 1 && (
  <div className="flex justify-center items-center gap-4 mt-10">
    <button
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      disabled={page === 1}
      className="px-4 py-2 rounded-lg bg-zinc-800 text-white disabled:opacity-50"
    >
      Previous
    </button>

    <span className="text-white">
      Page {page} of {totalPages}
    </span>

    <button
      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={page === totalPages}
      className="px-4 py-2 rounded-lg bg-zinc-800 text-white disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}
</>

)}
    </div>
  );
}