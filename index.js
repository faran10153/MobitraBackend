const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const router = require("./router/route");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://faribabar1998:faribabar1998@cluster0.aep3bhb.mongodb.net/?retryWrites=true&w=majority",
  () => {
    console.log("Database Sccessfully Connected");
  },
  4000
);

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
