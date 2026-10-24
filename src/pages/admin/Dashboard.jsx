import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  ArrowRight,
  Plus,
} from "lucide-react";
import contactService from "../../services/contactService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { formatDate } from "../../utils/formatDate.js";
import StatCard from "../../components/admin/StatCard.jsx";
import SalesChart from "../../components/admin/SalesChart.jsx";
import Loader from "../../components/common/Loader.jsx";
import Button from "../../components/common/Button.jsx";

export function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await contactService.getDashboardStats();
        if (res?.data) setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (isLoading) return <Loader fullScreen text="Compiling executive intelligence..." />;

  const getStatusBadge = (status) => {
    const map = {
      pending: "bg-slate-100 text-slate-700",
      processing: "bg-blue-50 text-blue-700",
      shipped: "bg-amber-50 text-amber-800",
      delivered: "bg-emerald-50 text-emerald-800",
      cancelled: "bg-rose-50 text-rose-700",
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${map[status] || map.pending}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            Executive Overview
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry and fiscal operational performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/products/new">
            <Button variant="primary" size="sm" icon={Plus}>
              New Product
            </Button>
          </Link>
          <Link to="/admin/orders">
            <Button variant="secondary" size="sm">
              Manage Orders
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Gross Revenue"
          value={formatCurrency(stats?.totalRevenue || 0)}
          icon={DollarSign}
          trend={14.8}
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={ShoppingBag}
          trend={8.2}
        />
        <StatCard
          title="Registered Clients"
          value={stats?.totalCustomers || 0}
          icon={Users}
          trend={12.4}
        />
        <StatCard
          title="Active Catalogue"
          value={stats?.totalProducts || 0}
          icon={Package}
        />
      </div>

      {/* Sales Chart Section */}
      <SalesChart data={stats?.chartData || []} />

      {/* Two-Column: Recent Orders & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-editorial text-base font-semibold text-slate-900">
              Recent Consignments
            </h3>
            <Link
              to="/admin/orders"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {stats?.recentOrders?.length === 0 ? (
              <p className="text-xs text-slate-400 py-4">No recent orders recorded.</p>
            ) : (
              stats?.recentOrders?.map((order) => (
                <div key={order._id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">
                        {order.orderNumber}
                      </span>
                      {getStatusBadge(order.orderStatus)}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {order.user?.name || "Client"} • {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(order.totalPrice)}
                    </span>
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="block text-[11px] text-blue-600 hover:underline mt-0.5"
                    >
                      Inspect
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="font-editorial text-base font-semibold text-slate-900">
                Low Inventory Alerts ({stats?.lowStockCount || 0})
              </h3>
            </div>
            <Link
              to="/admin/inventory"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Manage Inventory</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {stats?.lowStockProducts?.length === 0 ? (
              <p className="text-xs text-slate-400 py-4">All catalogue inventory at optimal levels.</p>
            ) : (
              stats?.lowStockProducts?.map((prod) => (
                <div key={prod._id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.images?.[0]}
                      alt=""
                      className="w-10 h-12 object-cover rounded border border-slate-100"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 line-clamp-1">{prod.name}</p>
                      <p className="text-slate-500">{formatCurrency(prod.price)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold">
                      {prod.stock} left
                    </span>
                    <Link
                      to={`/admin/products/${prod._id}/edit`}
                      className="block text-[11px] text-blue-600 hover:underline mt-1"
                    >
                      Restock
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
