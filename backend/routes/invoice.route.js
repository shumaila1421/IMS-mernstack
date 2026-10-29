const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getInvoices,
  getSingleInvoice,
  updateInvoiceStatus,
} = require("../controllers/invoice.controller");
const authMiddleware = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");

router.get("/", authMiddleware, getInvoices);
router.post("/", authMiddleware, createInvoice);
router.get("/:id", authMiddleware, getSingleInvoice);

router.patch(
  "/:id/status",
  authMiddleware,
  allowRoles("admin", "manager"),
  updateInvoiceStatus,
);

module.exports = router;
