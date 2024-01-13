const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
// const path = require("path");
const cors = require("cors");
const Files = require("./models/filesModel");

dotenv.config();
app.use(express.json());
app.use(cors());
// app.use("/files", express.static(path.join(__dirname, "/files")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "/files");
  },
  filename: (req, file, callback) => {
    callback(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.body.name);
  async function insert() {
    await Files.create({
      file: `${req.body.name}`,
    });
  }
  insert();
  res.status(200).json("File has been uploaded");
});

app.get("/getfiles", async (req, res) => {
  try {
    let files = await Files.find();
    console.log(files);
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json(err);
  }
});
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running.");
});
