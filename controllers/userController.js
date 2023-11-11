import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, tc } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      if (name && email && password && password_confirmation && tc) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const data = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
              tc: tc,
            });
            await data.save();
            res.json({ data });
          } catch (error) {
            console.log(error);
          }
        } else {
          res.send({
            status: "failed",
            message: "Password and confirm password doesn't match",
          });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  static getUsers = async (req, res) => {
    try {
      const users = await UserModel.find({});
      return res.status(200).json({
        count: users.length,
        data: users,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  };
}

export default UserController;
