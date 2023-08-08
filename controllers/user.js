import UserData from "../models/userData.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

export const getUsers = async (req, res) => {
  try {
    const userData = await UserData.find();
    // console.log("product data:",productData);
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const checkUser = async (req, res) => {
  // console.log(req.body);
  const { phone } = req.body;
  try {
    const userData = await UserData.findOne({ phone: phone });
    if (userData) {
      res.status(200).json({ message: "Match", data: userData });
    } else {
      res.status(200).json({ message: "Not Registered" });
    }
  } catch (error) {
    res.status(404).json({ message: `the following error occured ${error}` });
  }
};

export const authUser = async (req, res) => {
  // console.log(req.body);
  const { phone, password } = req.body;
  try {
    const userData = await UserData.findOne({ phone: phone });
    // console.log("user data:",userData);
    if (userData) {
      if (password === userData.password) {
        // console.log('password: ', password)
        res.status(200).json({ message: "login success", data: userData });
      } else {
        // console.log('password: ', password)
        res.status(200).json({ message: "Wrong Credentials" });
      }
    } else {
      res.status(200).json({ message: "Not Registered" });
    }
    // res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({ message: `the following error occured ${error}` });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new UserData(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};

export const updateUser = async (req, res) => {
  // console.log(req.params);
  const { id: _id } = req.params;
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "No User with that id" });
  try {
    const updatedUser = await UserData.findByIdAndUpdate(
      _id,
      { ...user, _id },
      { new: true }
    );
    // console.log("updatedUser:",updatedUser);
    res.json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const sendEmail = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
      ...
    },
  });

  // verifying the connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages: ",success);
    }
  });

  var user = req.body.user;
  var otp = req.body.message;
  var content = ` <h2><span style="color:green">GrocyGo</span> Pasword Recovery Service</h2> <br> <p> password recovery for <span style="text-transform:capitalize">${user.firstname+" "+user.lastname}</span> <br> your verification code is <strong>${otp}</strong> <br> Do not reply</p>`;

  var mail = {
    from: "grocygo4533@gmail.com",
    to: user.email,
    subject: "Grocygo - password recovery",
    html: content,
  };
  // console.log(mail);
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        message: "mail fail",
        data:{...user}
      });
    } else {
      res.json({
        message: "mail success",
        data:{...user}
      });
    }
  });
};

