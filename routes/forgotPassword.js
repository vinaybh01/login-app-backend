const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "998jdklsjlkdsjjio39e3209ujfds@#@Rewd32#@3djslkfjlds@#$#@%#$";

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
  } catch (err) {
    console.log(err);
    const express = require("express");
    const router = express.Router();
    const Users = require("../models/Users");
    const jwt = require("jsonwebtoken");

    const JWT_SECRET =
      "998jdklsjlkdsjjio39e3209ujfds@#@Rewd32#@3djslkfjlds@#$#@%#$";

    router.post("/forgot-password", async (req, res) => {
      const { email } = req.body;
      try {
        const user = await Users.findOne({ email });
        if (!user) {
          return res.json({ status: "User not exist" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
          expiresIn: "30m",
        });

        const resetPasswordLink = `http://localhost:3000/reset-password/${user._id}/${token}`;
        // You can send the resetPasswordLink via email to the user

        res.json({
          status: "ok",
          message: "Password reset link sent to email",
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
      }
    });

    module.exports = router;
  }
});

module.exports = router;
