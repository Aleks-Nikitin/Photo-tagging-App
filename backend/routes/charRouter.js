import charController from "../controllers/charController.js";
import {Router}from "express";
const charRouter =Router();

charRouter.post("/:id",charController.verifyChar);

export default charRouter;
