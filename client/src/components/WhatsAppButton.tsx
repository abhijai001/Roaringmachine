"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "917317316464"; // Replace with showroom number
  const message = encodeURIComponent(
    "Hello! I'm interested in your superbikes. Can you help me?"
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition duration-300"
    >
      <MessageCircle size={34} />
    </a>
  );
}