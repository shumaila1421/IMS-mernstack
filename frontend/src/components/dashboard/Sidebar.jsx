import { useNavigate, NavLink } from "react-router-dom";
import Button from "../ui/Button";
import { useContext } from "react";
import { UserStore } from "../../context/UserContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserStore);

  function handleLogout() {
    setUser(null);
    navigate("/login");
  }
  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-5">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800 text-sm font-bold text-white">
          IMS
        </div>
        <h1 className="text-lg font-bold text-slate-900">IMS</h1>
      </div>
      <nav className="flex flex-col gap-1">
        <NavLink
          className={({ isActive }) =>
            `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-emerald-50 text-emerald-800"
                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
            }`
          }
          to="/dashboard"
          end
        >
          Overview
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-emerald-50 text-emerald-800"
                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
            }`
          }
          to="/dashboard/products"
          end
        >
          Products
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-emerald-50 text-emerald-800"
                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
            }`
          }
          to="/dashboard/add-product"
          end
        >
          Add Product
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-emerald-50 text-emerald-800"
                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
            }`
          }
          to="/dashboard/categories"
        >
          Categories
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-emerald-50 text-emerald-800"
                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
            }`
          }
          to="/dashboard/suppliers"
          end
        >
          Suppliers
        </NavLink>
      </nav>

      <div className="mt-auto">
        <Button
          text="Logout"
          type="button"
          variant="danger"
          onClick={handleLogout}
        />
      </div>
    </aside>
  );
}
