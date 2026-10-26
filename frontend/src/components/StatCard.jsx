export default function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-emerald-800",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>

        <div className={`rounded-xl bg-emerald-50 p-2 ${iconColor}`}>
          <Icon size={22} />
        </div>
      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
    </div>
  );
}
