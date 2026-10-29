const express = require("express");
const {
  register,
  login,
  getMe,
  getUsers,
  updateUserRole,
} = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Login hua user apni taaza maloomat (role samet) le sake
router.get("/me", authMiddleware, getMe);

// Sirf admin
router.get("/users", authMiddleware, allowRoles("admin"), getUsers);
router.patch(
  "/users/:id/role",
  authMiddleware,
  allowRoles("admin"),
  updateUserRole,
);

module.exports = router;
