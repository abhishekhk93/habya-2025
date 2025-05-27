"use client";

type OtpInputProps = {
  otp: string[];
  onOtpChange: (index: number, value: string) => void;
  otpError: string;
  timer: number;
  onVerifyOtp: () => void;
  onResendOtp: () => void;
  verifyingOtp: boolean;
  resendingOtp: boolean;
};

export default function OtpInput({
  otp,
  onOtpChange,
  otpError,
  timer,
  onVerifyOtp,
  onResendOtp,
  verifyingOtp,
  resendingOtp
}: OtpInputProps) {
  return (
    <>
      <p className="text-center text-gray-700">Enter OTP sent to your phone</p>

      <div className="flex justify-between space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            value={digit}
            onChange={(e) => onOtpChange(index, e.target.value)}
            maxLength={1}
            className="w-10 h-10 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
      </div>

      <div className="h-5">
        {otpError && (
          <p className="text-red-600 text-sm text-center">{otpError}</p>
        )}
      </div>

      <button
        onClick={onVerifyOtp}
        className="w-full relative inline-flex justify-center items-center px-5 py-2.5 overflow-hidden font-medium text-teal-800 transition duration-300 ease-out border border-teal-300 rounded-full shadow-md group hover:shadow-lg hover:bg-teal-50"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-100 to-white opacity-50 group-hover:opacity-80 rounded-full blur-sm"></span>
        {verifyingOtp ? (
          <div className="relative z-10 flex items-center space-x-2">
            {/* Fixed text "Verifying OTP" */}
            <span>Verifying OTP</span>

            {/* Dots animation */}
            <div className="flex space-x-1">
              <span
                className="block w-2 h-2 bg-teal-800 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              />
              <span
                className="block w-2 h-2 bg-teal-800 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className="block w-2 h-2 bg-teal-800 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </div>
        ) : (
          <span className="relative z-10">Verify OTP</span>
        )}
      </button>

      <div className="h-5 flex items-center justify-center mt-2">
        {timer > 0 ? (
          <span className="text-gray-500">Resend OTP in {timer}s</span>
        ) : (
          <button
            onClick={onResendOtp}
            className={`relative inline-flex items-center justify-center font-medium text-teal-800 transition duration-300 ease-out hover:text-teal-600 focus:outline-none ${
              resendingOtp ? "zoom-in-out" : ""
            }`}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-100 to-white opacity-0 group-hover:opacity-20 rounded-full blur-sm"></span>

            {resendingOtp ? (
              <span className="relative z-10">Resending OTP</span>
            ) : (
              <span className="relative z-10">Resend OTP</span>
            )}
          </button>
        )}
      </div>
    </>
  );
}
