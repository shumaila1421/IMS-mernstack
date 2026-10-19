export default function Button({ text, type }) {
  return (
    <>
      <button
        type={type}
        className="w-full rounded-lg bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {text}
      </button>
    </>
  );
}
