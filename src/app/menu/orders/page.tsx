import Navbar from "@/components/navbar/Navbar";

export default function MyRegistrationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-blue-200 text-gray-800">
      <Navbar />

      <div className="flex flex-col justify-center items-center h-[calc(100vh-4rem)] px-4">
        <h1
          className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 text-center"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          🚧 Page Under Construction
        </h1>
        <p
          className="mt-4 text-2xl sm:text-xl text-center max-w-xl italic"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          We’re working hard to bring this page to life. Please check back soon!
        </p>
      </div>
    </div>
  );
}
