import express from "express";
import { Login, LoginAdmin, Register } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/login", Login);
authRouter.post("/register", Register);
authRouter.post("/loginAdmin", LoginAdmin);

export default authRouter;
