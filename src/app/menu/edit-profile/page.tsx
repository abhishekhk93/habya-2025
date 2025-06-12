import Navbar from "@/components/navbar/Navbar";
import EditProfileForm from "@/components/profile-setup/EditProfileForm";

export default function EditProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />

      <div className="flex items-center justify-center">
        <div className="w-full max-w-xl mx-2 p-4 sm:p-6 rounded-lg shadow-lg border-2 border-transparent transition-all duration-300">
          <h1
            className="text-3xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-10 leading-tight"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Edit Profile
          </h1>
          <EditProfileForm />
        </div>
      </div>
    </div>
  );
}
