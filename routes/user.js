import express from "express";
import { GetInfo, GetStudents } from "../middlewares/user.js";

const userRouter = express.Router();

userRouter.get("/getInfo", GetInfo);
userRouter.get("/getStudents", GetStudents);

export default userRouter;
