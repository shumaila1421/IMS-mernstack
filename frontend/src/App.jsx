import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Overview from "./pages/dashboard/Overview";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import Product from "./pages/dashboard/Product";
import Categories from "./pages/dashboard/Categories";
import Suppliers from "./pages/dashboard/Suppliers";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AddProductModal from "./components/products/AddProductModal";
import RoleRoute from "./routes/RoleRoute";
import Customer from "./pages/dashboard/Customer";
import AddCustomerModal from "./components/customers/AddCustomerModal";
import Invoice from "./pages/dashboard/Invoice";
import AddInvoiceModal from "./components/invoices/AddInvoiceModal";
import Users from "./pages/dashboard/Users";

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#26392e",
            color: "#fff",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="products" element={<Product />} />
            <Route path="customers" element={<Customer />} />
            <Route path="add-customers" element={<AddCustomerModal />} />
            <Route path="invoices" element={<Invoice />} />
            <Route path="add-invoices" element={<AddInvoiceModal />} />

            <Route element={<RoleRoute allowedRoles={["admin", "manager"]} />}>
              <Route index element={<Overview />} />
              <Route path="add-products" element={<AddProductModal />} />
              <Route path="categories" element={<Categories />} />
              <Route path="suppliers" element={<Suppliers />} />
            </Route>

            <Route element={<RoleRoute allowedRoles={["admin"]} />}>
              <Route path="users" element={<Users />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
