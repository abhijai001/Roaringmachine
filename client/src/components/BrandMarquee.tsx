const brands = [
  "BMW",
  "DUCATI",
  "KAWASAKI",
  "YAMAHA",
  "HONDA",
  "SUZUKI",
  "TRIUMPH",
  "APRILIA",
  "KTM",
  "BENELLI",
];

export default function BrandMarquee() {
  return (
    <section className="overflow-hidden border-y border-yellow-500/10 py-6 bg-black">
      <div className="flex marquee whitespace-nowrap">
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={index}
            className="mx-12 text-2xl font-bold tracking-widest text-zinc-400 hover:text-[#D4AF37] transition duration-300"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}