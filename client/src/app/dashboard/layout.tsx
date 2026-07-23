"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Bike,
  PlusCircle,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Manage Bikes",
    href: "/dashboard/bikes",
    icon: Bike,
  },
  {
    name: "Add Bike",
    href: "/dashboard/bikes/add",
    icon: PlusCircle,
  },
  {
    name: "Enquiries",
    href: "/dashboard/enquiries",
    icon: MessageSquare,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
const handleLogout = () => {
  localStorage.removeItem("token");
  router.replace("/admin/login");
};
 return (
  <ProtectedRoute>
    <div className="relative min-h-screen text-white overflow-hidden">
    <Image
  src="/dashboard-bg.jpg"
  alt="Dashboard Background"
  fill
  priority
  sizes="100vw"
  className="object-cover opacity-15 blur-sm scale-110"
/>

<div className="absolute inset-0 bg-black/85" />

<div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[180px]" />

<div className="absolute bottom-0 -left-32 h-[350px] w-[350px] rounded-full bg-yellow-500/5 blur-[150px]" />

<div className="relative z-10">
      {/* Mobile Header */}

      <header className="lg:hidden flex items-center justify-between p-5 border-b border-yellow-500/20">

        <h1 className="text-2xl font-black">
          <span className="text-yellow-500">Roaring</span> Machines
        </h1>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-yellow-500"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </header>

      <div className="flex">

        {/* Sidebar */}

        <aside
          className={`fixed lg:static top-0 left-0 z-50 h-screen w-72 bg-black/35 backdrop-blur-2xl border-r border-white/10 transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >

          <div className="p-8 border-b border-yellow-500/20">

            <h1 className="text-3xl font-black">
              <span className="text-yellow-500">Roaring</span>
              <br />
              Machines
            </h1>

            <p className="text-gray-400 mt-2 text-sm">
              Admin Dashboard
            </p>

          </div>

          <nav className="mt-8 px-4 space-y-2">

            {menuItems.map((item) => {

              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl transition ${
                    active
                      ? "bg-yellow-500 text-black font-semibold"
                      : "text-gray-400 hover:bg-zinc-900 hover:text-yellow-500"
                  }`}
                >
                  <Icon size={22} />
                  {item.name}
                </Link>
              );
            })}

          </nav>

          <div className="absolute bottom-8 left-6 right-6">

            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_35px_rgba(234,179,8,0.08)] p-5">

              <p className="text-yellow-500 font-bold">
                Premium Superbike Marketplace
              </p>

              <p className="text-gray-400 text-sm mt-2">
                Manage inventory, enquiries and customers from one place.
              </p>

            </div>

          </div>

        </aside>
                  {/* Mobile Overlay */}

          {mobileOpen && (
            <div
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}

        

        {/* Main Content */}

        <main className="flex-1 lg:ml-72 min-h-screen">

          {/* Top Bar */}

          <div className="border-b border-white/10 bg-black/30 backdrop-blur-2xl shadow-[0_10px_40px_rgba(234,179,8,0.06)]">

            <div className="px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between">

              <div>

                <h2 className="text-3xl font-bold">
                  Admin Dashboard
                </h2>

                <p className="text-gray-400 mt-2">
                  Welcome back! Manage your superbike inventory from here.
                </p>

              </div>

             <div className="mt-5 md:mt-0 flex gap-3">

  <Link
    href="/"
    className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-amber-400 text-black shadow-[0_0_25px_rgba(234,179,8,0.35)] px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
  >
    View Website
  </Link>

  <button
    onClick={handleLogout}
    className="px-6 py-3 rounded-full border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition"
  >
    Logout
  </button>

</div>

            </div>

          </div>

          {/* Dashboard Content */}

          <div className="p-8">

            {children}

          </div>

          {/* Footer */}

          <footer className="border-t border-yellow-500/20 px-8 py-6 text-center text-gray-500 text-sm">

            © {new Date().getFullYear()} Roaring Machines. All Rights Reserved.

          </footer>

        </main>

      </div>
    </div>
    </div>
    </ProtectedRoute>
  );
}

