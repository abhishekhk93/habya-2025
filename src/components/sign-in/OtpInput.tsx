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
  resendingOtp,
}: OtpInputProps) {
  return (
    <>
      <span
        className="py-4 bg-clip-text text-white text-2xl font-extrabold"
        style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
      >
        Enter OTP sent to your phone
      </span>

      <div className="flex justify-between space-x-2 pt-4">
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
          <p
            className="text-red-400 text-xl text-center"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
            }}
          >
            {otpError}
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={onVerifyOtp}
          className="relative inline-flex items-center justify-center w-fit px-6 py-2 rounded-full transition-all duration-300 active:scale-105"
          style={{
            fontFamily: "'Alumni Sans Pinstripe', cursive",
            borderWidth: "2px",
            borderStyle: "solid",
            borderImageSlice: 1,
            borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            color: "white",
          }}
        >
          {verifyingOtp ? (
            <div className="relative z-10 flex items-center space-x-2 text-white text-2xl sm:text-3xl font-extrabold">
              <span>Verifying OTP</span>

              <div className="flex space-x-1">
                <span
                  className="block w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="block w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="block w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          ) : (
            <span
              className="relative z-10 text-white text-2xl sm:text-3xl font-extrabold"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Verify OTP
            </span>
          )}
        </button>
      </div>

      <div
        className="h-5 flex items-center justify-center mt-2 text-xl"
        style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
      >
        {timer > 0 ? (
          <span className="text-gray-500 ">Resend OTP in {timer}s</span>
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
