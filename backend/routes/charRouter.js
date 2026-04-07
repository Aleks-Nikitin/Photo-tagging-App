import charController from "../controllers/charController";
const {Router}=require("express");
const charRouter =Router();

charRouter.post("/:id",charController.verifyChar);

module.exports=charRouter;
