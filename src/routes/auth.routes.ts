import express from "express";
import { register, login, resetPassword } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/reset-password", resetPassword);

export default router;
    