import express from "express";
import { viewsController } from "../Controllers/viewsController.js";

const controller = new viewsController();

export const viewRouter = express.Router();

viewRouter.get("/", controller.homeView);
viewRouter.get('/realtimeproducts', controller.realTimeProductView);
viewRouter.get('/chat', controller.chat);

