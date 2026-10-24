import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Package } from "lucide-react";
import contactService from "../../services/contactService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import StatCard from "../../components/admin/StatCard.jsx";
import Loader from "../../components/common/Loader.jsx";

export function Reports() {
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      setIsLoading(true);
      try {
        const res = await contactService.getSalesReport();
        if (res?.data) setReport(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReport();
  }, []);

  if (isLoading) return <Loader fullScreen text="Compiling fiscal intelligence..." />;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-editorial text-2xl font-bold text-slate-900">
          Fiscal Performance & Sales Reports
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Revenue distribution, average transaction volume, and top performing creations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Cumulative Sales Volume"
          value={formatCurrency(report?.totalSales || 0)}
          icon={DollarSign}
        />
        <StatCard
          title="Average Order Value"
          value={formatCurrency(report?.averageOrderValue || 0)}
          icon={TrendingUp}
        />
        <StatCard
          title="Completed Transactions"
          value={report?.totalOrders || 0}
          icon={Package}
        />
      </div>

      {/* Top Performing Pieces */}
      <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-subtle space-y-4">
        <h3 className="font-editorial text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
          Highest Revenue Grossing Creations
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {report?.topSelling?.length === 0 ? (
            <p className="text-slate-400 py-4">No product sales recorded yet.</p>
          ) : (
            report?.topSelling?.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-[11px]">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-slate-400">{item.unitsSold} units commissioned</p>
                  </div>
                </div>
                <div className="font-editorial text-sm font-semibold text-slate-900">
                  {formatCurrency(item.revenue)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
