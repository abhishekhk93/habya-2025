"use client";

type PhoneInputProps = {
  phone: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  phoneError: string;
  loading: boolean;
  onSendOtp: () => void;
};

export default function PhoneInput({
  phone,
  onChange,
  phoneError,
  loading,
  onSendOtp,
}: PhoneInputProps) {
  return (
    <>
      <div>
        <span
          className="bg-clip-text text-white text-2xl font-extrabold pb-8"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Phone number
        </span>

        <div className="flex items-center space-x-2 pt-4">
          <span className="px-3 py-2 bg-gray-400 border border-gray-300 rounded-l-md text-gray-700">
            +1
          </span>
          <input
            type="text"
            value={phone}
            onChange={onChange}
            maxLength={10}
            placeholder="Enter 10-digit number"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-teal-700"
          />
        </div>
        <div className="h-5 py-4">
          {phoneError && (
            <p className="text-red-400 text-sm text-center">{phoneError}</p>
          )}
        </div>
      </div>

      <button
        onClick={onSendOtp}
        className="relative inline-flex items-center justify-center w-full px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
        style={{
          fontFamily: "'Alumni Sans Pinstripe', cursive",
          borderWidth: "2px",
          borderStyle: "solid",
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
          color: "white",
        }}
      >
        {loading ? (
          <div className="relative z-10 flex items-center space-x-2 text-white text-2xl sm:text-3xl font-extrabold">
            <span>Sending OTP</span>

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
            Send OTP
          </span>
        )}
      </button>
    </>
  );
}
