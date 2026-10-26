export default function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <p className="mt-3 text-2xl font-vold tracking-tight text-slate-900">
        {value}
      </p>

      <div className="mt-4 h-1 w-12 rounded-full bg-emerald-800"></div>
    </div>
  );
}
