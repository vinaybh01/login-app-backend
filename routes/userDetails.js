const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "998jdklsjlkdsjjio39e3209ujfds@#@Rewd32#@3djslkfjlds@#$#@%#$";

router.get("/userData", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Retrieve the token from the Authorization header

  try {
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });

    if (decoded === "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    // Assuming the token contains the user's email
    const userEmail = decoded.email;

    // Retrieve the user data from the database based on the email
    const user = await Users.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);

    // Return the user data
    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
