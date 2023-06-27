const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const PORT = 3500;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/userDetails"));
app.use("/", require("./routes/forgotPassword"));
app.use("/", require("./routes/getUser"));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
