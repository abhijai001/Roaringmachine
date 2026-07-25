// client/src/app/page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import BrandMarquee from "@/components/BrandMarquee";
interface Bike {
  _id: string;
  title: string;
  price: number;
  images: string[];
  isFeatured: boolean;
  isAvailable: boolean;
}
export default function Home() {
  const [featuredBikes, setFeaturedBikes] = useState<Bike[]>([]);

useEffect(() => {
  const fetchFeaturedBikes = async () => {
    try {
      const res = await api.get("/bikes");
      
      
setFeaturedBikes(
  res.data
    .filter(
      (bike: Bike) =>
        bike.isFeatured && bike.isAvailable
    )
    .slice(0, 3)
);
    } catch (error) {
      console.error(error);
    }
  };

  fetchFeaturedBikes();
}, []);


  return (
    <main className="bg-black text-white">

      {/* ================= HERO ================= */}

<section className="relative overflow-hidden min-h-screen flex items-center">

  {/* Background Image */}
  <Image
    src="/hero-bg.jpg"
    alt="Background"
    fill
    priority
    sizes="100vw"
    className="object-cover scale-105 blur-sm opacity-70"
  />

  {/* Dark Glass Overlay */}
  <div className="absolute inset-0 bg-black/45" />

  {/* Gold Ambient Lights */}
  <div className="absolute top-20 right-20 h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[180px]" />
  <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-yellow-500/5 blur-[150px]" />

  {/* Extra Gradient for Text */}
  
<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />  {/* Hero Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full">

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

      {/* Left Side */}
      <div>

        <span className="inline-flex items-center rounded-full border border-yellow-500/40 bg-yellow-500/10 px-5 py-2 text-sm font-semibold tracking-wide text-yellow-400 backdrop-blur-md">
          Delhi's Premier Pre-Owned Superbike Showroom
        </span>

        <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black leading-tight uppercase">
          PRE-OWNED
          <br />
          <span className="text-yellow-500">
            LUXURY
          </span>
          <br />
          SUPERBIKES
        </h1>

        <p className="mt-8 max-w-xl text-base sm:text-lg text-gray-300 leading-7 sm:leading-8">
          Roaring Machines is Delhi's trusted destination for premium pre-owned
          superbikes. From Kawasaki and Ducati to BMW, Yamaha, Honda and Suzuki,
          every motorcycle is carefully inspected before reaching its next rider.
        </p>

        <div className="flex flex-wrap gap-5 mt-10">

          <Link
            href="/bikes"
            className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition flex items-center gap-2 shadow-[0_0_25px_rgba(234,179,8,0.35)]"
          >
            Explore Bikes
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/sell"
            className="border border-yellow-500/50 bg-white/5 backdrop-blur-md text-yellow-500 px-8 py-4 rounded-full hover:bg-yellow-500 hover:text-black transition"
          >
            Sell Your Bike
          </Link>

        </div>

      </div>

      {/* Right Side */}
      <div className="relative h-[320px] sm:h-[450px] lg:h-[600px]">

        <Image
          src="/hero-bike.jpg"
          alt="Superbike"
          fill
          priority
          className="object-contain w-full h-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
        />

      </div>

    </div>

  </div>

</section>
<BrandMarquee />
      {/* ================= TRUST SECTION ================= */}

<section className="py-20 bg-[#080808] border-y border-yellow-500/10">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-14">
      <p className="text-yellow-500 uppercase tracking-[0.35em] text-sm font-semibold">
        WHY CHOOSE ROARING MACHINES
      </p>

      <h2 className="mt-4 text-4xl lg:text-5xl font-black text-white">
        Trusted By Superbike Enthusiasts
      </h2>

      <p className="mt-4 max-w-2xl mx-auto text-gray-400 leading-7">
        Every motorcycle is professionally inspected and offered with complete
        transparency, making Roaring Machines one of Delhi's trusted destinations
        for premium pre-owned superbikes.
      </p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

      <div className="rounded-3xl border border-yellow-500/20 bg-zinc-900/60 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500 hover:shadow-[0_0_35px_rgba(212,175,55,0.15)]">
        <h3 className="text-5xl font-black text-yellow-500">4.9★</h3>
        <p className="mt-3 text-gray-400">Google Rating</p>
      </div>

      <div className="rounded-3xl border border-yellow-500/20 bg-zinc-900/60 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500 hover:shadow-[0_0_35px_rgba(212,175,55,0.15)]">
        <h3 className="text-5xl font-black text-yellow-500">Buy</h3>
        <p className="mt-3 text-gray-400">Premium Superbikes</p>
      </div>

      <div className="rounded-3xl border border-yellow-500/20 bg-zinc-900/60 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500 hover:shadow-[0_0_35px_rgba(212,175,55,0.15)]">
        <h3 className="text-5xl font-black text-yellow-500">Sell</h3>
        <p className="mt-3 text-gray-400">Best Market Value</p>
      </div>

      <div className="rounded-3xl border border-yellow-500/20 bg-zinc-900/60 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500 hover:shadow-[0_0_35px_rgba(212,175,55,0.15)]">
        <h3 className="text-5xl font-black text-yellow-500">Exchange</h3>
        <p className="mt-3 text-gray-400">Easy Upgrade Options</p>
      </div>

    </div>

  </div>

</section>

     {/* ================= FEATURED BIKES ================= */}

<section className="py-24 bg-black">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">

      <div>

        <span className="text-yellow-500 uppercase tracking-[0.35em] text-sm font-semibold">
          Featured Collection
        </span>

        <h2 className="mt-4 text-4xl lg:text-5xl font-black">
          Premium Superbikes
        </h2>

        <p className="mt-5 max-w-2xl text-gray-400 leading-7">
          Every motorcycle at Roaring Machines is inspected and verified before
          reaching its next owner. Explore our premium collection of superbikes.
        </p>

      </div>

      <Link
        href="/bikes"
        className="mt-8 lg:mt-0 border border-yellow-500 text-yellow-500 px-6 py-3 rounded-full hover:bg-yellow-500 hover:text-black transition"
      >
        View Inventory
      </Link>

    </div>

    {/* Cards */}
    
    {featuredBikes.length === 0 ? (
  <div className="text-center py-16">
    <h3 className="text-2xl font-bold text-white">
      No Featured Bikes Available
    </h3>
    <p className="mt-3 text-gray-400">
      Check back soon for our latest premium superbikes.
    </p>
  </div>
) : (
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
    {featuredBikes.map((bike) => (
  <div
    key={bike._id}
    className="group overflow-hidden rounded-3xl border border-yellow-500/20 bg-zinc-900 hover:border-yellow-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(212,175,55,0.15)]"
  >
          <div className="relative h-64 overflow-hidden">

            <Image
              src={bike.images[0] || "/hero.png"}
              alt={bike.title}
              fill
              className="object-cover group-hover:scale-110 transition duration-500"
            />

          </div>

          <div className="p-8">

            <h3 className="text-2xl font-bold">
              {bike.title}
            </h3>

            <p className="mt-3 text-yellow-500 text-xl font-semibold">
              ₹ {bike.price.toLocaleString("en-IN")}
            </p>

            <div className="mt-8 flex gap-4">

              <Link
  href={`/bikes/${bike._id}`}
  className="flex-1 bg-yellow-500 text-black py-3 rounded-full text-center font-semibold hover:bg-yellow-400 transition"
>
  View Details
</Link>
              <Link
                href="/contact"
                className="flex-1 border border-yellow-500 text-yellow-500 py-3 rounded-full text-center hover:bg-yellow-500 hover:text-black transition"
              >
                Enquire
              </Link>

            </div>

          </div>

        </div>

         ))}
  </div>
)}
  

  </div>

</section>
{/* ================= SHOWROOM ================= */}

<section className="py-28 bg-[#050505]">

  <div className="max-w-7xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* Image */}

      <div className="relative h-[500px] overflow-hidden rounded-3xl border border-yellow-500/20">

        <Image
          src="/showroom.jpg"
          alt="Roaring Machines Showroom"
          fill
          className="object-cover"
        />

      </div>

      {/* Content */}

      <div>

        <span className="text-yellow-500 uppercase tracking-[0.35em] text-sm font-semibold">
          OUR SHOWROOM
        </span>

        <h2 className="mt-5 text-4xl lg:text-5xl font-black leading-tight">
          Experience Premium
          <span className="text-yellow-500"> Superbikes</span>
          <br />
          Like Never Before
        </h2>

        <p className="mt-8 text-gray-400 leading-8 text-lg">
          Roaring Machines is Delhi's destination for premium pre-owned
          superbikes. Whether you're buying your first litre-class motorcycle
          or upgrading to your dream machine, our team ensures complete
          transparency, quality inspection and a smooth ownership experience.
        </p>

        <div className="grid grid-cols-2 gap-6 mt-10">

          <div className="rounded-2xl bg-zinc-900 border border-yellow-500/20 p-5">
            <h3 className="text-yellow-500 font-bold">
              ✓ Verified Bikes
            </h3>

            <p className="text-gray-400 mt-2 text-sm">
              Professionally inspected inventory.
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 border border-yellow-500/20 p-5">
            <h3 className="text-yellow-500 font-bold">
              ✓ Buy • Sell • Exchange
            </h3>

            <p className="text-gray-400 mt-2 text-sm">
              Everything under one roof.
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 border border-yellow-500/20 p-5">
            <h3 className="text-yellow-500 font-bold">
              ✓ Warranty
            </h3>

            <p className="text-gray-400 mt-2 text-sm">
              Peace of mind with selected motorcycles.
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 border border-yellow-500/20 p-5">
            <h3 className="text-yellow-500 font-bold">
              ✓ Expert Guidance
            </h3>

            <p className="text-gray-400 mt-2 text-sm">
              Helping riders choose the perfect superbike.
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>

</section>
{/* ================= GALLERY ================= */}

<section className="py-28 bg-black">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <span className="text-yellow-500 uppercase tracking-[0.35em] text-sm font-semibold">
        GALLERY
      </span>

      <h2 className="mt-4 text-4xl lg:text-5xl font-black">
        Inside Roaring Machines
      </h2>

      <p className="mt-5 max-w-2xl mx-auto text-gray-400">
        Take a look inside our showroom and explore the premium motorcycles
        waiting for their next rider.
      </p>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

      {[
        "/gallery1.jpg",
        "/gallery2.jpg",
        "/gallery3.jpg",
        "/gallery4.jpg",
      ].map((image, index) => (

        <div
          key={index}
          className="group relative h-72 overflow-hidden rounded-3xl border border-yellow-500/20"
        >

          <Image
            src={image}
            alt={`Gallery ${index + 1}`}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />

        </div>

      ))}

    </div>

  </div>

</section>
{/* ================= CONTACT CTA ================= */}

<section className="py-24 bg-[#080808] border-t border-yellow-500/10">

  <div className="max-w-5xl mx-auto px-6 text-center">

    <span className="text-yellow-500 uppercase tracking-[0.35em] text-sm font-semibold">
      READY TO RIDE?
    </span>

    <h2 className="mt-5 text-4xl lg:text-5xl font-black">
      Visit Roaring Machines Today
    </h2>

    <p className="mt-6 text-lg text-gray-400 leading-8">
      Explore our latest inventory, inspect motorcycles in person, or get expert
      assistance in buying, selling, or exchanging your superbike.
    </p>

    <div className="mt-10 flex flex-wrap justify-center gap-5">

      <Link
        href="/bikes"
        className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition"
      >
        Browse Inventory
      </Link>

      <Link
        href="/contact"
        className="border border-yellow-500 text-yellow-500 px-8 py-4 rounded-full hover:bg-yellow-500 hover:text-black transition"
      >
        Contact Us
      </Link>

    </div>

  </div>

</section>
<WhatsAppButton />
</main>
  );

}