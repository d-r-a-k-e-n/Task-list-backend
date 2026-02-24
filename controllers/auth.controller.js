const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh-secret";
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || "15m";
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "30d";

function generateTokens(user) {
  const accessToken = jwt.sign(
    { userId: user._id },
    JWT_ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES }
  );
  const refreshToken = jwt.sign(
    { userId: user._id },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES }
  );
  return { accessToken, refreshToken };
}

exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name
    });

    await newUser.save();

    const { accessToken, refreshToken } = generateTokens(newUser);
    const userResponse = {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name
    };

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
      accessToken,
      refreshToken,
      expiresIn: 900
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(existingUser);
    const userResponse = {
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name
    };

    res.status(200).json({
      message: "Login successful",
      user: userResponse,
      accessToken,
      refreshToken,
      expiresIn: 900
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name
    };

    res.status(200).json({
      user: userResponse,
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: 900
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Refresh token expired" });
    }
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
