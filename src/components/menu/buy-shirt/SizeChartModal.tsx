import React from "react";

type Props = {
  onClose: () => void;
};

export function SizeChartModal({ onClose }: Props) {
  const sizeChart = [
    { size: "S", width: "38", length: "27", sleeve: "8.5", shoulder: "16.5" },
    { size: "M", width: "40", length: "28", sleeve: "8.75", shoulder: "17" },
    { size: "L", width: "42", length: "29", sleeve: "9", shoulder: "18" },
    { size: "XL", width: "44", length: "30", sleeve: "9.25", shoulder: "18.5"},
    { size: "XXL", width: "46", length: "31", sleeve: "9.5", shoulder: "19" },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 bg-opacity-80 flex items-center justify-center z-50">
      <div
        className="rounded-lg p-6 max-w-md w-full shadow-lg border-2 border-transparent bg-gradient-to-r from-gray-900 via-black to-gray-900 mx-4"
        style={{
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
        }}
      >
        <h3
          className="text-2xl font-semibold mb-4 text-center text-white"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Size Chart (in inches)
        </h3>

        <div className="overflow-x-auto">
          <table
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            className="min-w-full text-sm text-white text-left border-collapse border border-gray-500"
          >
            <thead className="text-xl text-white">
              <tr>
                <th className="border px-3 py-2 text-center">Size</th>
                <th className="border px-3 py-2 text-center">Width</th>
                <th className="border px-3 py-2 text-center">Length</th>
                <th className="border px-3 py-2 text-center">Sleeve</th>
                <th className="border px-3 py-2 text-center">Shoulder</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr
                  key={row.size}
                  className="hover:bg-cyan-900 hover:bg-opacity-30 transition text-lg"
                >
                  <td className="border px-3 py-2 text-center">{row.size}</td>
                  <td className="border px-3 py-2 text-center">{row.width}</td>
                  <td className="border px-3 py-2 text-center">{row.length}</td>
                  <td className="border px-3 py-2 text-center">{row.sleeve}</td>
                  <td className="border px-3 py-2 text-center">
                    {row.shoulder}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 text-white text-xl rounded-full border transition-transform duration-150 active:scale-95 hover:scale-102"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              borderImageSlice: 1,
              borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
