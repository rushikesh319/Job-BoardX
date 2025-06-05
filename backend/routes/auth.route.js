import express from "express"
import { login, logout, refreshToken, signup,  } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/refresh-token",refreshToken)
router.get("/profile", protectRoute, (req, res) => {
  res.json({ message: "User is logged in", user: req.user })
})


export default router