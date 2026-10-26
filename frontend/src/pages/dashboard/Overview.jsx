import StatCard from "../../components/StatCard";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboard.service";
import toast from "react-hot-toast";
import { Package, Wallet, AlertTriangle, PackageX } from "lucide-react";
import RecentProducts from "../../components/dashboard/RecentProducts";

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Overview
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Here's what's happening with your inventory.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
        />

        <StatCard
          title="Total Stock Value"
          value={`PKR ${Number(stats.totalStockValue).toLocaleString("en-PK")}`}
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

      <RecentProducts products={stats.recentProducts} />
    </div>
  );
}
