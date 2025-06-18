export default function Unauthorized() {
  return (
    <div className="text-center mt-10">
      <div
        className="text-2xl font-semibold text-red-400"
        style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
      >
        You do not have access to this page.
      </div>
      <p
        className="text-gray-300 text-2xl mt-2"
        style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
      >
        Please contact an admin.
      </p>
    </div>
  );
}
