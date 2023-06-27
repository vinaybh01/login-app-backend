const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

router.get("/getAllUser", async (req, res) => {
  try {
    const allUsers = await Users.find({});
    res.send({ status: "ok", data: allUsers });
    // console.log(allUsers);
  } catch (err) {
    console.log(err);
  }
});

router.post("/deleteUser", async (req, res) => {
  const { userId } = req.body;
  try {
    const deletedUser = await Users.deleteOne({ _id: userId });
    res.send({ status: "ok", data: deletedUser });
  } catch (err) {
    console.log(err);
  }
});

router.get("/paginatedUsers", async (req, res) => {
  const allUsers = await Users.find({});
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  results.totalUser = allUsers.length;
  results.pageCount = Math.ceil(allUsers.length / limit);

  if (endIndex < allUsers.length) {
    results.next = {
      page: page + 1,
    };
  }

  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
    };
  }

  results.result = allUsers.slice(startIndex, endIndex);
  res.json(results);
});

module.exports = router;
