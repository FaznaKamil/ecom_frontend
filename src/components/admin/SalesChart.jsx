import { formatCurrency } from "../../utils/formatCurrency.js";

export function SalesChart({ data = [], title = "Revenue Performance", height = 240 }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-sm border border-slate-200 text-center text-xs text-slate-400">
        No sales metrics recorded yet.
      </div>
    );
  }

  const maxRevenue = Math.max(...data.map((d) => d.revenue || 0), 1000);

  return (
    <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-subtle space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 className="font-editorial text-base font-semibold text-slate-900">{title}</h4>
          <p className="text-xs text-slate-400">Monthly fiscal trajectory and order volume</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-3 h-3 bg-navy-900 rounded-xs"></span>
            <span>Revenue</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-3 h-3 bg-blue-500 rounded-xs"></span>
            <span>Orders</span>
          </span>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="pt-6 pb-2" style={{ height: `${height}px` }}>
        <div className="h-full flex items-end gap-3 sm:gap-6 justify-between px-2">
          {data.map((item, idx) => {
            const revenuePct = Math.min(100, Math.round(((item.revenue || 0) / maxRevenue) * 100));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 text-center pointer-events-none">
                  <span className="text-[10px] bg-navy-950 text-white px-2 py-0.5 rounded shadow">
                    {formatCurrency(item.revenue)} ({item.orders} orders)
                  </span>
                </div>

                <div className="w-full max-w-[42px] flex items-end justify-center gap-1 h-full">
                  {/* Revenue Bar */}
                  <div
                    className="w-1/2 bg-navy-900 rounded-t-xs transition-all duration-500 group-hover:bg-navy-950"
                    style={{ height: `${Math.max(8, revenuePct)}%` }}
                  />
                  {/* Orders Bar */}
                  <div
                    className="w-1/2 bg-blue-500 rounded-t-xs transition-all duration-500 group-hover:bg-blue-600"
                    style={{ height: `${Math.max(6, Math.min(100, (item.orders || 1) * 10))}%` }}
                  />
                </div>

                <span className="text-[11px] font-semibold text-slate-500 mt-2 truncate w-full text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SalesChart;
