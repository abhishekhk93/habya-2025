"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ChevronDown, ChevronUp } from "lucide-react";
import { eventIdToName } from "@/lib/events-utils/eventRules";

interface Registration {
  event_id: number;
  player1_name: string;
  player2_name: string | null;
}

interface Stats {
  zero: number;
  atLeast1: number;
  atLeast2: number;
  atLeast3: number;
}

interface ApiResponse {
  registrations: Registration[];
  stats: Stats;
}

export default function AdminRegistrations() {
  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = user?.role === "admin";

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>(
    {}
  );

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

    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const groupedByEvent =
    data?.registrations.reduce((acc, reg) => {
      if (!acc[reg.event_id]) acc[reg.event_id] = [];
      acc[reg.event_id].push(reg);
      return acc;
    }, {} as Record<number, Registration[]>) || {};

  const toggleAccordion = (eventId: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

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
          <div className="text-center mt-10">
            <div
              className="text-2xl font-semibold text-red-400"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              🚫 You do not have access to this page.
            </div>
            <p
              className="text-gray-500 text-2xl mt-2"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Please contact an administrator.
            </p>
          </div>
        ) : loading ? (
          <div className="text-center text-xl">Loading...</div>
        ) : (
          <div>
            {/* STATS */}

            {/* REGISTRATIONS */}
            <div>
              <h2
                className="text-3xl text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
              >
                Registrations by Event
              </h2>

              {Object.entries(groupedByEvent).map(([eventIdStr, regs]) => {
                const eventId = Number(eventIdStr);
                const isOpen = openAccordions[eventId] ?? false;

                return (
                  <div
                    key={eventId}
                    className="mb-6 border-2 rounded-lg overflow-hidden transition-all"
                    style={{
                      borderImage:
                        "linear-gradient(to right, #2dd4bf, #3b82f6) 1",
                    }}
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => toggleAccordion(eventId)}
                      className="w-full text-left text-2xl font-semibold px-4 py-3 text-white"
                      style={{
                        fontFamily: "'Alumni Sans Pinstripe', cursive",
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span>
                          {eventIdToName[eventId] || `Event #${eventId}`} (
                          {regs.length})
                        </span>
                        <span className="transform transition-transform duration-300">
                          {isOpen ? (
                            <ChevronUp size={24} />
                          ) : (
                            <ChevronDown size={24} />
                          )}
                        </span>
                      </div>
                    </button>

                    {/* Accordion Content */}
                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        isOpen
                          ? "max-h-[1000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-4 space-y-3">
                        {regs.map((reg, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-md bg-gradient-to-r from-white/10 via-white/5 to-white/10"
                            style={{
                              fontFamily: "'Alumni Sans Pinstripe', cursive",
                            }}
                          >
                            <p className="text-2xl text-white">
                              {reg.player1_name}
                              {reg.player2_name && ` & ${reg.player2_name}`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <h2
              className="text-3xl text-center mt-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Players with event count
            </h2>
            <p
              className="text-gray-300 italic text-xl m-2"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Read it as number of players playing exactly one event, two events, three events and who are yet to register.
            </p>
            <div
              className="mb-10 overflow-x-auto rounded-xl border-2"
              style={{
                borderImage: "linear-gradient(to right, #2dd4bf, #2563eb) 1",
                fontFamily: "'Alumni Sans Pinstripe', cursive",
              }}
            >
              <table className="min-w-full text-white text-left">
                <thead>
                  <tr className=" text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 text-2xl">
                    <th className="px-4 py-2">No. of Players</th>
                    <th className="px-4 py-2">No. of Events</th>
                  </tr>
                </thead>
                <tbody className="text-xl">
                  {data &&
                    Object.entries(data.stats).map(([label, count], idx) => (
                      <tr
                        key={label}
                        className={`${
                          idx % 2 === 0 ? "bg-white/5" : "bg-white/10"
                        } border-b border-white/10`}
                      >
                        <td className="px-4 py-2">{count}</td>
                        <td className="px-4 py-2 capitalize">
                          {label.replace("exactly", " ")}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
