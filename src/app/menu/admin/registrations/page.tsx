"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Registration,
  Stats,
} from "@/components/menu/admin/registrations/types";
import RegistrationsByEvent from "@/components/menu/admin/registrations/RegistrationsByEvent";
import StatsTable from "@/components/menu/admin/registrations/StatsTable";
import Unauthorized from "@/components/menu/admin/Unauthorized";

interface ApiResponse {
  registrations: Registration[];
  stats: Stats;
}

export default function AdminRegistrations() {
  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = user?.role === "admin";

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/registrations");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch registrations", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) fetchData();
  }, [isAdmin]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-black to-gray-800 text-white">
      <Navbar />
      <div className="px-4 py-12 max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600 mb-12"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Registrations Overview
        </h1>

        {!isAdmin ? (
          <Unauthorized />
        ) : loading ? (
          <div
            className="text-center text-3xl"
            style={{
              borderImage: "linear-gradient(to right, #2dd4bf, #2563eb) 1",
              fontFamily: "'Alumni Sans Pinstripe', cursive",
            }}
          >
            Loading...
          </div>
        ) : (
          <>
            <RegistrationsByEvent registrations={data!.registrations} />
            <StatsTable stats={data!.stats} />
          </>
        )}
      </div>
    </div>
  );
}
