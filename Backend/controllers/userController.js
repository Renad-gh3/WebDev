// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// //register user
// exports.register = async (req, res) => {
//   try {
//     const { username, email, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     /*
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//         return res.json({ success: false, message: "User already exists" });
//         }

//         // validating email format & strong password
//         if (!validator.isEmail(email)) {
//         return res.json({
//             success: false,
//             message: "Please enter a valid email",
//         });
//         }

//         if (password.length < 8) {
//         return res.json({
//             success: false,
//             message: "Please enter a strong password",
//         });
//         }
//         */
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       role,
//     });
//     await newUser.save();
//     res.json({ message: "User registered successfully!" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// //login user
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "User doesn't exist" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid password" });
//     }
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       "SECRET_KEY",
//       { expiresIn: "1h" }
//     );
//     res.json({ token });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register user
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.json({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // 🔹 تم إصلاح الاسم هنا
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
