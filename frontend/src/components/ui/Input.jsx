export default function Input({ name, placeholder, label, type, register }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        required
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
      />
    </div>
  );
}
