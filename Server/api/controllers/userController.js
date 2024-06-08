import express from "express";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.MAX_AGE,
  });
};

export const registrationController = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const cnfpass = req.body.cnfpass;
  const username = req.body.username;
  // try {
  const password = await bcrypt.hash(pass, 10);
  const userObject = await User.findOne({ email: email });
  if (userObject) {
    res.status(401).json({ message: "Already Registered. Please login" });
  } else {
    if (pass == cnfpass) {
      const user = await User.create({ username, email, password });
      //generating otp and saving to document
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      user.otp = otp;
      user.save();
      //generating email containing otp
      const mailer = nodemailer.createTransport({
        host: process.env.SMTP_ADDRESS,
        port: Number(process.env.SMTP_PORT),
        secure: "true",
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASS,
        },
      });
      await mailer.sendMail({
        from: `"Map Clone" <${process.env.SMTP_EMAIL}>`,
        to: email,
        subject: "OTP For Map Clone Verification",
        text: otp,
      });
      res.status(201).json({ user: user.isverified });
    } else {
      res.status(400).json({ message: "passwords must be same" });
    }
  }
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
};

export const loginController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const userObject = await User.findOne({ email: email });
    if (!userObject) {
      res.status(404).json({ message: "Invalid credentials" });
    } else {
      const passMatch = await bcrypt.compare(password, userObject.password);
      if (!passMatch) {
        res.status(401).json({ message: "Invalid Password" });
      } else {
        const token = createToken(userObject._id);
        res.cookie("Authorization", token, {
          httpOnly: true,
          maxAge: 3 * 24 * 60 * 60 * 1000,
          sameSite: "Lax",
        });

        res.cookie("user", userObject.email, {
          httpOnly: true,
          maxAge: 3 * 24 * 60 * 60 * 1000,
          sameSite: "Lax",
        });

        res.status(201).json({
          message: "Login successful",
          isverified: userObject.isverified,
        });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyOtpController = async (req, res) => {
  const email = req.body.email;
  const otp = Number(req.body.otp);
  try {
    const userObject = await User.findOne({ email: email });
    if (!userObject) {
      res.status(404).json({ message: "Something went wrong" });
    } else {
      if (userObject.otp == otp) {
        userObject.isverified = true;
        userObject.save();
        res.status(200).json({ message: "user verified" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
