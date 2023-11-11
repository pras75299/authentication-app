import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, tc } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return res
          .status(400)
          .send({ status: "failed", message: "Email already exists" });
      }
      if (name && email && password && password_confirmation && tc) {
        if (password === password_confirmation) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const data = new UserModel({
            name,
            email,
            password,
            tc,
          });
          await data.save();
          res.status(201).json({ status: "success", data });
        } else {
          res.status(400).send({
            status: "failed",
            message: "Password and confirm password doesn't match",
          });
        }
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "All fields are required" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: "failed", message: "Server Error" });
    }
  };

  static getUsers = async (req, res) => {
    try {
      const users = await UserModel.find({});
      return res
        .status(200)
        .json({ status: "success", count: users.length, users });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ status: "failed", message: "Server Error" });
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return res.status(401).send({
            status: "failed",
            message: "Email not registered",
          });
        }
        console.log("User found:", user);
        if (password === user.password) {
          res.send({
            status: "success",
            message: "Login Success",
          });
        } else {
          res.status(401).send({
            status: "failed",
            message: "Password is not valid",
          });
        }
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: "failed", message: "Server Error" });
    }
  };
}

export default UserController;
