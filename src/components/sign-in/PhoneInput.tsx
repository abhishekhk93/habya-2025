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
      <div className="w-full max-w-md mx-auto px-4">
        <span
          className="bg-clip-text text-white text-3xl font-extrabold pb-8"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Phone number
        </span>

        <div className="flex items-center space-x-2 pt-6">
          <span
            className="px-1 pr-3 py-3 text-white text-3xl"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              background: "transparent",
              borderWidth: "2px",
              borderStyle: "solid",
              borderTopLeftRadius: "9999px",
              borderBottomLeftRadius: "9999px",
              borderImageSlice: 1,
              borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            }}
          >
            +91
          </span>

          <input
            type="text"
            value={phone}
            onChange={onChange}
            maxLength={10}
            placeholder="Enter 10-digit number"
            className="flex-1 px-5 py-3 text-white text-3xl placeholder-gray-400 focus:outline-none"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              background: "transparent",
              borderWidth: "2px",
              borderStyle: "solid",
              borderTopRightRadius: "9999px",
              borderBottomRightRadius: "9999px",
              borderImageSlice: 1,
              borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            }}
          />
        </div>

        <div className="py-4 min-h-[1.5rem]">
          {phoneError && (
            <p
              className="text-red-400 text-xl text-center"
              style={{
                fontFamily: "'Alumni Sans Pinstripe', cursive",
              }}
            >
              {phoneError}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={onSendOtp}
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
      </div>
    </>
  );
}
