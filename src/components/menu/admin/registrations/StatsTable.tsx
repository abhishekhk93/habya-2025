"use client";

import { Stats } from "./types";

export default function StatsTable({ stats }: { stats: Stats }) {
  return (
    <div>
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
        Read it as number of players playing exactly one event, two events,
        three events and who are yet to register.
      </p>
      <div
        className="mb-10 overflow-x-auto rounded-xl border-2"
        style={{
          borderImage: "linear-gradient(to right, #2dd4bf, #2563eb) 1",
          fontFamily: "'Alumni Sans Pinstripe', cursive",
        }}
      >
        <table className="min-w-full text-white text-center">
          <thead>
            <tr className=" text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 text-3xl">
              <th className="px-4 py-2">No. of Players</th>
              <th className="px-4 py-2">No. of Events</th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {Object.entries(stats).map(([label, count], idx) => (
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
  );
}
