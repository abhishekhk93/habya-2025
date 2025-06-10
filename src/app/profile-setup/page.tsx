// src/app/profile-setup/page.tsx
import ProfileForm from "@/components/profile-setup/ProfileForm";

export default function ProfileSetupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="w-full max-w-xl mx-2 p-4 sm:p-6 rounded-lg shadow-lg border-2 border-transparent transition-all duration-300">
        <h1
          className="text-3xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-10 leading-tight"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Profile
        </h1>
        <ProfileForm />
      </div>
    </div>
  );
}
