const User = require("../schema/user.schema");
const { Response } = require("../utils");
const express = require("express");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY";

const cookieOptions = {
  httpOnly: process.env.COOKIE_HTTPONLY || false,
  secure: process.env.COOKIE_SECURE || false,
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function registerUser(req, res) {
  if (!req.body) {
    return res.status(400).json({
      message: "Body not provided",
    });
  }

  const user = new User(req.body);
  await user.save();

  res.send(new Response(200, null, "User Registered"));
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function signInUser(req, res) {
  if (!req.body) {
    return res.status(400).json({
      message: "Body not provided",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const isMatch = await user.comparePassword(req.body.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Wrong Password" });
  }
  const token = jwt.sign(
    { _id: user._id, username: user.username },
    jwt_secret,
    { expiresIn: "1h" }
  );
  const userRes = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  return res
    .cookie("token", token, cookieOptions)
    .send(new Response(200, userRes, "Sign in successful"));
}

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/signIn").post(signInUser);

module.exports = userRouter;
