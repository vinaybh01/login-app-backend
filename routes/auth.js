const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRECT =
  "998jdklsjlkdsjjio39e3209ujfds@#@Rewd32#@3djslkfjlds@#$#@%#$";

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await Users.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
    });
    res.status(200).json({ message: "User has been registered" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong!!" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or Password incorrect!!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
    const token = jwt.sign({ email: user.email }, JWT_SECRECT, {
      expiresIn: 1000,
    });
    res.json({ status: "ok", data: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong!!" });
  }
});

module.exports = router;
