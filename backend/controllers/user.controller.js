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
      },
      process.env.JWT_SECRET,
    );

    return res.json({
      message: "User Logged in Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  register,
  login,
};
