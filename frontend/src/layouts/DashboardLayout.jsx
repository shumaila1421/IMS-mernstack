import { Outlet, Link } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <aside className="w-[30%] h-screen p-6 ">
        <h1 className="font-semibold text-lg">IMS</h1>
        <nav>
          <Link to="/dashborad">Overview</Link>
          <Link to="/dashborad/add-application">Add Application</Link>
          <Link to="/dashborad/all-application">All Application</Link>
          <Link to="/dashborad/manage-application">Manage Application</Link>
        </nav>
      </aside>
      <Outlet />
    </div>
  );
}
