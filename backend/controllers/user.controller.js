const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json({
      message: "User registered successfully",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "This email is already registered",
      });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async function (req, res) {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    let token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.json({
      message: "User Logged in Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getMe = async function (req, res) {
  return res.json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};

const getUsers = async function (req, res) {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    return res.json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateUserRole = async function (req, res) {
  try {
    const { role } = req.body;

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!["admin", "manager", "staff"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Admin apna role khud nahi badal sakta (warna koi admin hi na bache)
    if (String(req.params.id) === String(req.user._id)) {
      return res.status(400).json({
        message: "You cannot change your own role",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { returnDocument: "after", runValidators: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: `${user.name} is now ${role}`,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  register,
  login,
  getMe,
  getUsers,
  updateUserRole,
};
