const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const authMiddleware = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", authMiddleware, getProducts);

router.post("/", authMiddleware, allowRoles("admin", "manager"), createProduct);

router.put(
  "/:id",
  authMiddleware,
  allowRoles("admin", "manager"),
  updateProduct,
);
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin", "manager"),
  deleteProduct,
);

module.exports = router;
