import express from "express";
const router = express.Router();

import UserController from "../controllers/userController.js";

//public routes
router.post("/register", UserController.userRegistration);
router.get("/getUsers", UserController.getUsers);
//private routes

export default router;
