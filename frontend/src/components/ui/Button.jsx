export default function Button({
  text,
  type,
  onClick = () => {},
  variant = "primary",
}) {
  const styles = {
    primary: "bg-emerald-800 text-white hover:bg-emerald-900",
    danger:
      "border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white",
  };

  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]}`}
      >
        {text}
      </button>
    </>
  );
}
