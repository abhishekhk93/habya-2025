"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Registration } from "./types";
import { eventIdToName } from "@/lib/events-utils/eventRules";

interface Props {
  registrations: Registration[];
}

export default function RegistrationsByEvent({ registrations }: Props) {
  const groupedByEvent = registrations.reduce((acc, reg) => {
    if (!acc[reg.event_id]) acc[reg.event_id] = [];
    acc[reg.event_id].push(reg);
    return acc;
  }, {} as Record<number, Registration[]>);

  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>(
    {}
  );

  const toggleAccordion = (eventId: number) => {
    setOpenAccordions((prev) => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  return (
    <div>
      <h2
        className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600"
        style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
      >
        Registrations by Event ({registrations?.length ?? 0})
      </h2>

      {Object.entries(groupedByEvent).map(([eventIdStr, regs]) => {
        const eventId = Number(eventIdStr);
        const isOpen = openAccordions[eventId] ?? false;

        return (
          <div
            key={eventId}
            className="mb-6 border-b rounded-lg overflow-hidden transition-all"
            style={{
              borderImage: "linear-gradient(to right, #2dd4bf, #3b82f6) 1",
            }}
          >
            <button
              onClick={() => toggleAccordion(eventId)}
              className="w-full text-left text-2xl font-semibold px-4 py-3 text-white"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              <div className="flex justify-between items-center">
                <span>
                  {eventIdToName[eventId] || `Event #${eventId}`} ({regs.length}
                  )
                </span>
                <span>
                  {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </span>
              </div>
            </button>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-2 space-y-3">
                {regs.map((reg, idx) => (
                  <div
                    key={idx}
                    className="p-2 my-2 rounded-md bg-gradient-to-r from-white/10 via-white/5 to-white/10"
                    style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                  >
                    <p className="text-2xl text-white">
                      {idx + 1}. {reg.player1_name}
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
  );
}
