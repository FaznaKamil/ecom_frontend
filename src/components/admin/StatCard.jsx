export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel = "vs last month",
  className = "",
}) {
  return (
    <div className={`bg-white p-5 rounded-sm border border-slate-200 shadow-subtle ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">
          {title}
        </p>
        {Icon && (
          <div className="p-2 rounded bg-slate-50 text-navy-900">
            <Icon className="w-5 h-5 stroke-[1.5]" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="font-editorial text-2xl font-semibold text-slate-900 tracking-tight">
          {value}
        </h3>

        {trend !== undefined && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend >= 0
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {trend >= 0 ? `+${trend}%` : `${trend}%`}
          </span>
        )}
      </div>

      {trendLabel && (
        <p className="text-[11px] text-slate-400 mt-1">{trendLabel}</p>
      )}
    </div>
  );
}

export default StatCard;
