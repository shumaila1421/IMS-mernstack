const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");
const authMiddleware = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");

// Dekhna aur naya customer banana: teeno roles (staff invoice ke liye)
router.get("/", authMiddleware, getCustomers);
router.post("/", authMiddleware, createCustomer);
router.get("/:id", authMiddleware, getCustomerById);

// Edit aur delete: sirf admin aur manager
router.put(
  "/:id",
  authMiddleware,
  allowRoles("admin", "manager"),
  updateCustomer,
);
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin", "manager"),
  deleteCustomer,
);

module.exports = router;
