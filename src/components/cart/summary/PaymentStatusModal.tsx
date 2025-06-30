//app/payment/PaymentStatusModal.tsx
import React from "react";

type Props = {
  status: "success" | "partial" | "fail";
  onClose: () => void;
};

const statusMessages: Record<Props["status"], { title: string; body: string }> = {
  success: {
    title: "Payment & Transaction Successful",
    body: "You’ve successfully completed the transaction. We look forward to seeing you!",
  },
  partial: {
    title: "Payment Successful, Orders Failed",
    body: "Your payment was processed, but processing of orders failed. Please contact the admins.",
  },
  fail: {
    title: "Payment Verification Failed",
    body: "We couldn’t verify your payment. Please try again or contact admins.",
  },
};

export default function PaymentStatusModal({ status, onClose }: Props) {
  const { title, body } = statusMessages[status];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-1000 ease-in-out bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <div
        className="rounded-lg p-6 max-w-sm w-full mx-4 shadow-lg bg-gradient-to-r from-gray-900 via-black to-gray-900"
        style={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
        }}
      >
        <h2
          className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 text-3xl font-extrabold text-center mb-4"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          {title}
        </h2>

        <p
          className="text-2xl text-center text-gray-300 mb-4"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          {body}
        </p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="relative inline-flex items-center justify-center px-4 border-1 border-transparent rounded-full transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              borderImageSlice: 1,
              borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            }}
          >
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 text-xl sm:text-2xl font-extrabold"
            >
              OK
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
