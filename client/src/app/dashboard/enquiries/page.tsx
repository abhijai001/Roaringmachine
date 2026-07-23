"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import Image from "next/image";

interface SellRequest {
  _id: string;
  sellerName: string;
  phone: string;
  email?: string;

  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engineCapacity: string;
  description: string;
  images: string[];

  status: "Pending" | "Approved" | "Rejected";
}

export default function SellRequestsPage() {
  const [requests, setRequests] = useState<SellRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/sell-request");
      setRequests(res.data);
    } catch {
      toast.error("Failed to load sell requests");
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (id: string) => {
    try {
      await api.put(`/sell-request/${id}/approve`);

      toast.success("Request approved");

      fetchRequests();
    } catch {
      toast.error("Approval failed");
    }
  };
const rejectRequest = async (id: string) => {
  try {
    await api.put(`/sell-request/${id}/reject`);

    toast.success("Request rejected");

    fetchRequests();
  } catch {
    toast.error("Rejection failed");
  }
};
  if (loading) {
    return (
      <div className="text-center py-20 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8 text-white">
        Sell Requests
      </h1>
{requests.filter(r => r.status === "Pending").length === 0 && (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
    <h2 className="text-2xl font-bold text-white">
      No Pending Enquiries
    </h2>

    <p className="text-zinc-400 mt-3">
      You're all caught up.
    </p>
  </div>
)}
      <div className="space-y-6">

        {requests
  .filter((request) => request.status === "Pending")
  .map((request) => (

          <div
            key={request._id}
            className="bg-zinc-900 rounded-xl border border-zinc-800 p-5"
          >

            {request.images?.length > 0 && (
              <div className="relative w-full h-64 mb-5">

                <Image
                  src={request.images[0]}
                  alt={request.title}
                  fill
                  className="object-cover rounded-lg"
                />

              </div>
            )}

            <h2 className="text-2xl font-bold text-white">
              {request.title}
            </h2>

            <p className="text-zinc-400">
              {request.brand} • {request.model}
            </p>

            <p className="text-white mt-2">
              ₹ {request.price.toLocaleString("en-IN")}
            </p>

            <p className="text-zinc-400">
              {request.year} • {request.mileage} km
            </p>

            <hr className="my-4 border-zinc-700" />

            <p className="text-white">
              <strong>Seller:</strong> {request.sellerName}
            </p>

            <p className="text-white">
              <strong>Phone:</strong> {request.phone}
            </p>

            {request.email && (
              <p className="text-white">
                <strong>Email:</strong> {request.email}
              </p>
            )}

            <div className="mt-6 flex gap-3">

  {request.status === "Pending" && (
    <>
      <button
        onClick={() => approveRequest(request._id)}
        className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-lg"
      >
        Approve
      </button>

      <button
        onClick={() => rejectRequest(request._id)}
        className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg"
      >
        Reject
      </button>
    </>
  )}

  {request.status === "Approved" && (
    <span className="bg-green-600 text-white px-4 py-2 rounded-lg">
      Approved
    </span>
  )}

  {request.status === "Rejected" && (
    <span className="bg-red-600 text-white px-4 py-2 rounded-lg">
      Rejected
    </span>
  )}

</div>

          </div>

        ))}

      </div>

    </div>
  );
}