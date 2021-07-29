const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const url = process.env.MONGO_URL;

// MongoDB Connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on("open", () => console.log("MongoDB is connected"));

app.use(express.json());
app.use(cors());

app.use("/", require("./Routes/Users.js"));

app.get("/", (request, response) => {
  response.json({ message: "Welcome to Crud APp" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
