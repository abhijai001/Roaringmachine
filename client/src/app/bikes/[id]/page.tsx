"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";

interface Bike {
  _id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage?: string;
  engineCapacity?: string;
  images: string[];
}

export default function BikeDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const res = await api.get(`/bikes/${id}`);
        setBike(res.data);
      } catch (err) {
        toast.error("Unable to load bike details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBike();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 mt-6">
            Loading Motorcycle...
          </p>
        </div>
      </main>
    );
  }

  if (!bike) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">

          <h1 className="text-5xl font-black text-white">
            Bike Not Found
          </h1>

          <p className="mt-5 text-gray-400">
            This motorcycle may have been sold or removed.
          </p>

          <button
            onClick={() => router.push("/bikes")}
            className="mt-8 bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition"
          >
            Browse Bikes
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-yellow-500 transition mb-10"
        >
          ← Back to Showroom
        </button>

        <div className="grid lg:grid-cols-2 gap-14">

          {/* Images */}

          <div>

            <div className="relative h-[520px] rounded-3xl overflow-hidden border border-yellow-500/20 bg-[#111]">

              {bike.images?.length ? (
                <Image
                  src={bike.images[selectedImage]}
                  alt={bike.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No Image Available
                </div>
              )}

            </div>

            {bike.images?.length > 1 && (

              <div className="grid grid-cols-4 gap-4 mt-5">

                {bike.images.map((image, index) => (

                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-xl overflow-hidden border transition ${
                      selectedImage === index
                        ? "border-yellow-500"
                        : "border-zinc-800"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Bike ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>

                ))}

              </div>

            )}

          </div>

          {/* Details */}

          <div>

            <p className="uppercase tracking-[0.35em] text-yellow-500 text-sm">
              Premium Pre-Owned Superbike
            </p>

            <h1 className="text-5xl font-black mt-4">
              {bike.title || `${bike.brand} ${bike.model}`}
            </h1>

            <p className="text-4xl font-bold text-yellow-500 mt-6">
              ₹ {bike.price.toLocaleString("en-IN")}
            </p>

            <p className="mt-8 text-gray-400 leading-8">
              Professionally inspected motorcycle from Roaring Machines.
              Contact us today for availability, financing options,
              exchange offers, and test ride information.
            </p>
                        <div className="grid grid-cols-2 gap-5 mt-10">

              <div className="bg-[#111] border border-yellow-500/20 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">Brand</p>
                <p className="font-semibold mt-1">{bike.brand}</p>
              </div>

              <div className="bg-[#111] border border-yellow-500/20 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">Model</p>
                <p className="font-semibold mt-1">{bike.model}</p>
              </div>

              <div className="bg-[#111] border border-yellow-500/20 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">Year</p>
                <p className="font-semibold mt-1">{bike.year}</p>
              </div>

              <div className="bg-[#111] border border-yellow-500/20 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">Mileage</p>
                <p className="font-semibold mt-1">
                  {bike.mileage || "Not Available"}
                </p>
              </div>

              <div className="bg-[#111] border border-yellow-500/20 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">Engine Capacity</p>
                <p className="font-semibold mt-1">
                  {bike.engineCapacity || "Not Available"}
                </p>
              </div>

              <div className="bg-[#111] border border-yellow-500/20 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">Dealer</p>
                <p className="font-semibold mt-1">
                  Roaring Machines
                </p>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/918447777225?text=${encodeURIComponent(
                      `Hi, I'm interested in ${bike.title || `${bike.brand} ${bike.model}`}.`
                    )}`,
                    "_blank"
                  )
                }
                className="flex-1 bg-yellow-500 text-black py-4 rounded-full font-bold hover:bg-yellow-400 transition"
              >
                WhatsApp Enquiry
              </button>

              <a
                href="tel:+917317316464"
                className="flex-1 border border-yellow-500 text-yellow-500 py-4 rounded-full text-center font-semibold hover:bg-yellow-500 hover:text-black transition"
              >
                Call Now
              </a>

            </div>

            <a
              href="https://www.facebook.com/hayabusaharleydavidson/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-5 text-center border border-yellow-500/20 rounded-full py-4 text-gray-300 hover:border-yellow-500 hover:text-yellow-500 transition"
            >
              Visit Our Facebook Page
            </a>

            <div className="mt-12 bg-[#111] border border-yellow-500/20 rounded-3xl p-6">

              <h2 className="text-2xl font-bold mb-6">
                Visit Our Showroom
              </h2>

              <div className="space-y-3 text-gray-400">

                <p>
                  📍 Y-11, Loha Mandi, Block Y,
                  <br />
                  Naraina Industrial Area Phase 1,
                  <br />
                  Naraina, Delhi – 110028
                </p>

                <p>
                  🕒 Tuesday – Sunday
                  <br />
                  9:00 AM – 7:00 PM
                </p>

                <p>
                  🚫 Monday Closed
                </p>

              </div>

              <a
                href="https://maps.app.goo.gl/1KWjLPCUt53USYXu9?g_st=iw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
              >
                Open in Google Maps
              </a>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}