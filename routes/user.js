import express from "express";
import { GetInfo } from "../middlewares/user.js";

const userRouter = express.Router();

userRouter.get("/getInfo", GetInfo);

export default userRouter;
