import { Router } from "express";
import  userController  from "../Controllers/userController.js";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);


export default userRouter