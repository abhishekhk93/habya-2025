"use client";

import Navbar from "@/components/navbar/Navbar";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-6 sm:px-12 md:px-16 lg:px-24">
      <Navbar />

      <div className="px-4 py-12 max-w-4xl mx-auto">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-center leading-tight mb-8"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Privacy Policy
        </h1>

        <div
          className="max-w-4xl mx-auto text-gray-200 text-xl sm:text-xl"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          <p className="mb-6">
            This Privacy Policy describes how Habya (&quot;we&quot;,
            &quot;our&quot;, or &quot;us&quot;) collects, uses, and protects
            your information when you use our services.
          </p>

          <h2 className="text-2xl text-cyan-400 font-semibold mt-10 mb-2">
            1. What We Collect
          </h2>
          <ul className="list-disc list-inside mb-4">
            <li>Name and contact details</li>
            <li>Profile info like gender and age</li>
            <li>Payment info (via Razorpay)</li>
            <li>Event registration and usage data</li>
          </ul>

          <h2 className="text-2xl text-cyan-400 font-semibold mt-10 mb-2">
            2. How We Use It
          </h2>
          <p className="mb-4">
            We use your info to register you for events, personalize
            experiences, process payments, and improve our platform.
          </p>

          <h2 className="text-2xl text-cyan-400 font-semibold mt-10 mb-2">
            3. Data Security
          </h2>
          <p className="mb-4">
            Your data is protected through industry-standard practices.
            Sensitive data like payments are handled securely by Razorpay.
          </p>

          <h2 className="text-2xl text-cyan-400 font-semibold mt-10 mb-2">
            4. Your Rights
          </h2>
          <p className="mb-4">
            You can request to access or delete your data at any time by
            contacting us at{" "}
            <a
              href="mailto:habyacoreteam@gmail.com"
              className="underline text-indigo-400"
            >
              habyacoreteam@gmail.com
            </a>
            .
          </p>

          <h2 className="text-2xl text-cyan-400 font-semibold mt-10 mb-2">
            5. Changes
          </h2>
          <p className="mb-4">
            We may update this policy from time to time. Please review it
            periodically.
          </p>
        </div>
      </div>
    </div>
  );
}
