"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import {
  Phone,
  Mail,
  Calendar,
  Bike,
} from "lucide-react";

interface SellRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  bikeBrand: string;
  bikeModel: string;
  year: number;
  expectedPrice: number;
  createdAt: string;
}

export default function EnquiriesPage() {
  const [requests, setRequests] = useState<SellRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/sell-request");

      setRequests(res.data);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load enquiries."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-yellow-500 text-xl">
        Loading enquiries...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <p className="uppercase tracking-[0.35em] text-yellow-500 text-sm">
          Customer Enquiries
        </p>

        <h1 className="text-5xl font-black mt-3">
          Sell Requests
        </h1>
      </div>
            {requests.length === 0 ? (
        <div className="bg-[#111] border border-yellow-500/20 rounded-3xl p-16 text-center">

          <Bike
            size={60}
            className="mx-auto text-yellow-500 mb-6"
          />

          <h2 className="text-3xl font-bold">
            No Sell Requests
          </h2>

          <p className="text-gray-400 mt-4">
            Customer enquiries will appear here once someone submits a request.
          </p>

        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">

          {requests.map((request) => (

            <div
              key={request._id}
              className="bg-[#111] border border-yellow-500/20 rounded-3xl p-7 hover:border-yellow-500 transition"
            >

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold">
                  {request.name}
                </h2>

                <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
                  New
                </span>

              </div>

              <div className="mt-8 space-y-5">

                <div className="flex items-center gap-4">

                  <Mail
                    className="text-yellow-500"
                    size={20}
                  />

                  <span className="text-gray-300">
                    {request.email}
                  </span>

                </div>

                <div className="flex items-center gap-4">

                  <Phone
                    className="text-yellow-500"
                    size={20}
                  />

                  <span className="text-gray-300">
                    {request.phone}
                  </span>

                </div>

                <div className="flex items-center gap-4">

                  <Bike
                    className="text-yellow-500"
                    size={20}
                  />

                  <span className="text-gray-300">
                    {request.bikeBrand} {request.bikeModel}
                  </span>

                </div>

                <div className="flex items-center gap-4">

                  <Calendar
                    className="text-yellow-500"
                    size={20}
                  />

                  <span className="text-gray-300">
                    {new Date(request.createdAt).toLocaleDateString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="bg-black rounded-xl p-4 border border-yellow-500/10">

                  <p className="text-gray-400 text-sm">
                    Year
                  </p>

                  <p className="text-xl font-bold mt-2">
                    {request.year}
                  </p>

                </div>

                <div className="bg-black rounded-xl p-4 border border-yellow-500/10">

                  <p className="text-gray-400 text-sm">
                    Expected Price
                  </p>

                  <p className="text-xl font-bold text-yellow-500 mt-2">
                    ₹ {request.expectedPrice.toLocaleString("en-IN")}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}