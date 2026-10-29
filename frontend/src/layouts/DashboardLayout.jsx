import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { UserStore } from "../context/UserContext";
import { getMe } from "../services/user.service";

export default function DashboardLayout() {
  const { setUser } = useContext(UserStore);

  // Dashboard khulte hi taaza maloomat (role samet) le aao
  useEffect(() => {
    async function refreshUser() {
      try {
        const res = await getMe();

        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
      } catch (error) {
        console.log(error);
      }
    }

    refreshUser();
  }, [setUser]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <DashboardHeader />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
