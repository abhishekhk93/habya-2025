// app/redirect/page.tsx
import { Suspense } from "react";
import ClientRedirectingPage from "@/components/redirect/RedirectingPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-8 text-center">Redirecting...</div>}>
      <ClientRedirectingPage />
    </Suspense>
  );
}
