const express = require("express");
const { getDashboardStats } = require("../controllers/dashboard.controller");
const authMiddleware = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");

const router = express.Router();

router.get(
  "/stats",
  authMiddleware,
  allowRoles("admin", "manager"),
  getDashboardStats,
);

module.exports = router;
