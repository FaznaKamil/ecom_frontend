import { useState, useEffect } from "react";
import authService from "../../services/authService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { formatDate } from "../../utils/formatDate.js";
import DataTable from "../../components/admin/DataTable.jsx";

export function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      setIsLoading(true);
      try {
        const res = await authService.getCustomers();
        if (res?.data) setCustomers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: "Patron",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-900">{row.name}</p>
          <p className="text-[11px] text-slate-400">{row.email}</p>
        </div>
      ),
    },
    {
      header: "Member Since",
      render: (row) => <span className="text-slate-600">{formatDate(row.createdAt)}</span>,
    },
    {
      header: "Historical Consignments",
      render: (row) => (
        <span className="font-semibold text-slate-800">
          {row.orderCount || 0} Orders
        </span>
      ),
    },
    {
      header: "Cumulative Spend",
      render: (row) => (
        <span className="font-editorial text-sm font-semibold text-slate-900">
          {formatCurrency(row.totalSpent || 0)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-editorial text-2xl font-bold text-slate-900">
          Patron Registry
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Registered client accounts, order velocity, and lifetime acquisition value.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        isLoading={isLoading}
        searchPlaceholder="Search patrons by name or email..."
        searchQuery={search}
        onSearch={setSearch}
        totalRecords={filtered.length}
      />
    </div>
  );
}

export default Customers;
