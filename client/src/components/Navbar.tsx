"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Menu, X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Inventory", href: "/bikes" },
  { name: "Sell Bike", href: "/sell" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
if (pathname.startsWith("/dashboard")) {
  return null;
}
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-yellow-600/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-16 sm:h-20 flex items-center justify-between">

            {/* LOGO */}

            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <Image
  src="/logo.png"
  alt="Roaring Machine"
  width={44}
  height={44}
  className="rounded-full border border-yellow-500/30 w-10 h-10 sm:w-12 sm:h-12"
/>

              <div>

                <h1 className="font-black text-base sm:text-lg tracking-[0.18em] sm:tracking-[0.25em] text-white">
                  ROARING
                </h1>

                <p className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.45em] text-yellow-500 uppercase">
                  Machines
                </p>

              </div>

            </Link>

            {/* Desktop Menu */}

            <div className="hidden lg:flex items-center gap-6 xl:gap-10">

              {links.map((item) => (

                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-sm uppercase tracking-widest text-zinc-300 hover:text-yellow-400 transition"
                >
                  {item.name}
                </Link>

              ))}

            </div>

            {/* CTA */}

            {/* CTA + Social */}

<div className="hidden lg:flex items-center gap-4 xl:gap-6">

  <div className="flex items-center gap-3">

    <span className="text-sm font-medium text-zinc-400">
      Follow Us
    </span>

    <a
      href="https://www.instagram.com/roaring_machines__?igsh=MTJhaGN3bGVqeWg1eQ=="
      target="_blank"
      rel="noopener noreferrer"
      title="Instagram"
      className="text-zinc-400 hover:text-[#D4AF37] transition duration-300"
    >
      <FaInstagram size={20} />
    </a>

    <a
      href="https://wa.me/917317316464"
      target="_blank"
      rel="noopener noreferrer"
      title="WhatsApp"
      className="text-zinc-400 hover:text-[#D4AF37] transition duration-300"
    >
      <FaWhatsapp size={20} />
    </a>

  </div>

  <Link
    href="/sell"
   className="group bg-yellow-500 hover:bg-yellow-400 text-black px-4 xl:px-6 py-2.5 xl:py-3 rounded-full font-semibold transition flex items-center gap-2 whitespace-nowrap"
  >
    List Your Bike

    <ChevronRight
      size={18}
      className="group-hover:translate-x-1 transition"
    />
  </Link>

</div>

            {/* Mobile */}

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>

        </div>

      </nav>

      {/* MOBILE MENU */}

      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-500 lg:hidden ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="pt-32 px-8">

          <div className="space-y-8">

            {links.map((item) => (

              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block text-3xl font-bold text-white hover:text-yellow-500 transition"
              >
                {item.name}
              </Link>

            ))}

          </div>

          <Link
            href="/sell"
            onClick={() => setOpen(false)}
            className="mt-16 inline-flex bg-yellow-500 text-black px-7 py-4 rounded-full font-bold"
          >
            Sell Your Bike
          </Link>

        </div>

      </div>
    </>
  );
}