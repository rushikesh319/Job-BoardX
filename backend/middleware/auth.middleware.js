import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {

    const accessToken = req.cookies.accessToken;



    if (!accessToken) {
      return res.status(401).json({ message: "Access token required" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Access token expired" });
      }
      return res.status(401).json({ message: "Invalid access token" });
    }
  } catch (error) {
    console.error("Error in auth middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const recruiterRoute = (req, res, next) => {
  if (req.user && req.user.role === "recruiter") {
    next();
  } else {
    res.status(403).json({ message: "Access denied - Recruiter only" });
  }
};
