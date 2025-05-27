// src/app/profile-setup/page.tsx
import ProfileForm from "@/components/profile-setup/ProfileForm";

export default function ProfileSetupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-blue-200 px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-6">
          Add Profile
        </h1>
        <ProfileForm />
      </div>
    </div>
  );
}
