"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import Navbar from "../components/navbar/Navbar";

export default function Home() {
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-blue-200 text-gray-800">
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen px-6 sm:px-12 md:px-16 lg:px-24">
        {isAuthenticated && user?.name ? (
          <>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 text-center leading-tight animate__animated animate__fadeIn animate__delay-1s">
              Hello {user.name}
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 text-center leading-tight animate__animated animate__fadeIn animate__delay-1s">
              Your player ID is: {user.id}
            </p>
          </>
        ) : null}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 text-center leading-tight animate__animated animate__fadeIn animate__delay-1s">
          Welcome to Habya!
        </h1>

        <p className="mt-4 italic text-lg sm:text-xl md:text-2xl text-center max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1.5s animate__slow">
          With 8 editions of fierce competition and unforgettable moments behind
          us, this year's tournament is set to get even better! Are you ready to
          join the action?
        </p>

        {/* Interactive Get Started Button */}
        <div className="mt-8 flex justify-center sm:justify-start animate__animated animate__fadeIn animate__delay-2s">
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-full shadow-xl transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-teal-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
