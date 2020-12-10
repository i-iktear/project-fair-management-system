import jwt, { decode } from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, Token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, you do not have any token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an Admin");
  }
};

const moderator = (req, res, next) => {
  if (req.user && req.user.isModerator) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as a Moderator");
  }
};

const judge = (req, res, next) => {
  if (req.user && req.user.isJudge) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as a Judge");
  }
};

export { protect, admin, moderator, judge };
