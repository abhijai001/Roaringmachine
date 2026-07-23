import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">

        <p className="text-yellow-500 text-lg tracking-[0.4em] uppercase mb-4">
          Error 404
        </p>

        <h1 className="text-7xl md:text-8xl font-black">
          Page Not
          <span className="text-yellow-500"> Found</span>
        </h1>

        <p className="mt-8 text-gray-400 text-lg leading-8">
          The page you're looking for doesn't exist or may have been moved.
          Explore our premium superbike collection or return to the homepage.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <Link
            href="/"
            className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition"
          >
            Back to Home
          </Link>

          <Link
            href="/bikes"
            className="border border-yellow-500 text-yellow-500 px-8 py-4 rounded-full hover:bg-yellow-500 hover:text-black transition"
          >
            Browse Bikes
          </Link>

        </div>

      </div>
    </main>
  );
}