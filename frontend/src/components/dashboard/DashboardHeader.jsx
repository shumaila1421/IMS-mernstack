import { useContext } from "react";
import { UserStore } from "../../context/UserContext";

export default function DashboardHeader() {
  const { user } = useContext(UserStore);

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">
          Inventory Management System
        </h1>
        <p className="text-sm text-slate-500">
          Manage your inventory efficiently
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-800">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="hidden sm:block">
          <p className="text-sm font-medium text-slate-800">
            {user?.name || "User"}
          </p>
          <p className="text-xs capitalize text-slate-500">{user?.role}</p>
        </div>
      </div>
    </header>
  );
}
