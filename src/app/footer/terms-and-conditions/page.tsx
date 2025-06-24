"use client";

import Navbar from "@/components/navbar/Navbar";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-6 sm:px-12 md:px-16 lg:px-24">
      <Navbar />

      <div className="px-4 py-12 max-w-4xl mx-auto">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-center leading-tight mb-8"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Terms & Conditions
        </h1>

        <div
          className="max-w-4xl mx-auto text-gray-200 text-xl sm:text-xl"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          <p className="mb-6">
            By using Habya, you agree to the following terms. Please read them
            carefully.
          </p>

          <h2 className="text-2xl text-cyan-400 font-semibold mt-10 mb-2">
            1. Eligibility
          </h2>
          <p className="mb-4">
            Users must provide accurate information during registration. False
            or misleading info can result in disqualification.
          </p>

          <h2 className="text-2xl text-cyan-400 font-semibold mt-10 mb-2">
            2. Refund & Cancellation
          </h2>
          <ul className="list-disc list-inside mb-4">
            <li>
              Cancellation and refunds are not processed on the portal. Contact
              the admins if you seek cancellation of events.
            </li>
            <li>
              No refunds for events within 24 hours of tournament start date.
            </li>
            <li>
              Email requests to{" "}
              <a
                href="mailto:habyacoreteam@gmail.com"
                className="underline text-indigo-400"
              >
                habyacoreteam@gmail.com
              </a>
            </li>
          </ul>

          <h2 className="text-2xl text-cyan-400 font-semibold mt-10 mb-2">
            3. Shipping
          </h2>
          <p className="mb-4">
            We do not offer physical shipping. All services are digital or
            in-person event-based.
          </p>

          <h2 className="text-2xl text-cyan-400 font-semibold mt-10 mb-2">
            4. Response Time
          </h2>
          <p className="mb-4">
            Support queries are answered within 1–2 business days.
          </p>

          <h2 className="text-2xl text-cyan-400 font-semibold mt-10 mb-2">
            5. Updates
          </h2>
          <p className="mb-4">
            We may revise these terms. Continued use means you agree to the
            latest version.
          </p>
        </div>
      </div>
    </div>
  );
}
