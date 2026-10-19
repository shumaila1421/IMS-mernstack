export default function Input({ placeholder, label, type }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        id="email"
        type={type}
        name="email"
        // value={formData.email}
        // onChange={handleChange}
        placeholder={placeholder}
        autoComplete="email"
        required
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
      />
    </div>
  );
}
