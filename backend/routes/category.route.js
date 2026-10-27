const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const authMiddleware = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", authMiddleware, getCategories);

router.post(
  "/",
  authMiddleware,
  allowRoles("admin", "manager"),
  createCategory,
);
router.put(
  "/:id",
  authMiddleware,
  allowRoles("admin", "manager"),
  updateCategory,
);
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin", "manager"),
  deleteCategory,
);

module.exports = router;
