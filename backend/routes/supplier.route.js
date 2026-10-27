const express = require("express");
const {
  createSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplier.controller");
const authMiddleware = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", authMiddleware, getSuppliers);

router.post(
  "/",
  authMiddleware,
  allowRoles("admin", "manager"),
  createSupplier,
);
router.put(
  "/:id",
  authMiddleware,
  allowRoles("admin", "manager"),
  updateSupplier,
);
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin", "manager"),
  deleteSupplier,
);

module.exports = router;
