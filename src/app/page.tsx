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
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white transition-all duration-1000 ease-in-out">
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen px-6 sm:px-12 md:px-16 lg:px-24">
        {isAuthenticated && user?.name ? (
          <>
            <h1
              className="text-6xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-center leading-tight animate__animated animate__fadeIn animate__delay-1s px-4 py-4"
              style={{ fontFamily: "'Ephesis', cursive" }}
            >
              Dear {user.name}, <br /> Welcome to Habya!
            </h1>

            <p
              className="pt-8 text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-center leading-tight animate__animated animate__fadeIn animate__delay-1s px-4"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Your profile ID is: {user.id}
            </p>
          </>
        ) : (
          <h1
            className="text-6xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-center leading-tight animate__animated animate__fadeIn animate__delay-1s px-4 py-4"
            style={{ fontFamily: "'Ephesis', cursive" }}
          >
            Welcome to Habya!
          </h1>
        )}

        <p className="mt-4 italic text-lg sm:text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1.5s animate__slow">
          With 8 editions of fierce competition and unforgettable moments behind
          us, this year's tournament is set to get even better! Are you ready to
          join the action?
        </p>
      </div>
    </div>
  );
}
