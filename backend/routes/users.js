import express from "express";
import { getUserInfo, updatedUser } from "../controllers/user.js";
const router = express.Router();

router.get("/me", getUserInfo);
router.put("/me", updatedUser);

export default router;