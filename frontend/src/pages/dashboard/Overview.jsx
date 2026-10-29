import StatCard from "../../components/StatCard";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboard.service";
import toast from "react-hot-toast";
import {
  Package,
  Wallet,
  AlertTriangle,
  PackageX,
  TrendingUp,
  Banknote,
  Clock,
  FileText,
} from "lucide-react";
import RecentProducts from "../../components/dashboard/RecentProducts";
import SalesChart from "../../components/dashboard/SalesChart";
import LowStockProducts from "../../components/dashboard/LowStockProducts";
import RecentInvoices from "../../components/dashboard/RecentInvoices";

function pkr(amount) {
  return `PKR ${Number(amount || 0).toLocaleString("en-PK")}`;
}

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load dashboard statistics. Please try again.",
        );
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-50 p-6 text-slate-500">Loading dashboard...</div>
    );
  }

  if (error) {
    return (
      <div className="m-6 rounded-xl border border-slate-200 bg-white p-5 text-slate-600">
        Failed to load dashboard statistics.
      </div>
    );
  }

  const sales = stats.sales;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Overview
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Here's what's happening with your inventory and sales.
        </p>
      </div>

      {/* Sales ke cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Sales"
          value={pkr(sales.todaySales)}
          icon={TrendingUp}
        />

        <StatCard
          title="Revenue (Paid)"
          value={pkr(sales.totalRevenue)}
          icon={Banknote}
        />

        <StatCard
          title={`Pending Payments (${sales.pendingCount})`}
          value={pkr(sales.pendingAmount)}
          icon={Clock}
          iconColor="text-amber-600"
        />

        <StatCard
          title="Total Invoices"
          value={sales.paidCount + sales.pendingCount}
          icon={FileText}
        />
      </div>

      {/* Inventory ke cards */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
        />

        <StatCard
          title="Total Stock Value"
          value={pkr(stats.totalStockValue)}
          icon={Wallet}
        />

        <StatCard
          title="Low Stock Items"
          value={stats.lowStockCount}
          icon={AlertTriangle}
          iconColor="text-amber-600"
        />

        <StatCard
          title="Out of Stock"
          value={stats.outOfStockCount}
          icon={PackageX}
          iconColor="text-red-600"
        />
      </div>

      {/* Chart aur low stock */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SalesChart days={sales.last7Days} />
        <LowStockProducts
          products={stats.lowStockProducts}
          limit={stats.lowStockLimit}
        />
      </div>

      {/* Recent invoices aur recent products */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentInvoices invoices={stats.recentInvoices} />
        <div className="[&>div]:mt-0">
          <RecentProducts products={stats.recentProducts} />
        </div>
      </div>
    </div>
  );
}
