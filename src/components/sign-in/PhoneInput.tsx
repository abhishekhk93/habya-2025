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
        <label className="block font-semibold text-gray-700 mb-1">
          Phone Number
        </label>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md text-gray-700">
            +1
          </span>
          <input
            type="text"
            value={phone}
            onChange={onChange}
            maxLength={10}
            placeholder="Enter 10-digit number"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>
        <div className="h-5 py-4">
          {phoneError && (
            <p className="text-red-600 text-sm text-center">{phoneError}</p>
          )}
        </div>
      </div>

      <button
        onClick={onSendOtp}
        className="w-full relative inline-flex justify-center items-center px-5 py-2.5 overflow-hidden font-medium text-teal-800 transition duration-300 ease-out border border-teal-300 rounded-full shadow-md group hover:shadow-lg hover:bg-teal-50"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-100 to-white opacity-50 group-hover:opacity-80 rounded-full blur-sm"></span>

        {loading ? (
          <div className="relative z-10 flex items-center space-x-2">
            <span>Sending OTP</span>

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
          <span className="relative z-10">Send OTP</span>
        )}
      </button>
    </>
  );
}
