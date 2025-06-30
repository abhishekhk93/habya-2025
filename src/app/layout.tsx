import "./styles/globals.css";
import "animate.css";
import { Providers } from "./Providers";
import Footer from "@/components/footer/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Habya 2025",
  description:
    "One app. All the fun — events, shirts, food, sponsors & more! 🎉📲",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        ></script>
      </head>
      <body className="flex flex-col min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
        <Providers>
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
