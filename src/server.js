require("./db/connection");
const cloudinary = require("./utils/cloudinary").v2;
const express = require("express");
var cors = require("cors");
const userRouter = require("./user/routes");
require("dotenv").config();

//Declaring app using the express method
const app = express();
//Future proofs our ports, if there isnt a port assigned use 5001
const port = process.env.PORT || 5001;

//You add functionality to app, then listen to it using your chosen port.

//the api is going to be using json data
//Anything we add to the app will now be able to interpret json as a js object
app.use(express.json());
app.use(cors());
app.use(userRouter);

// !cloudinary limits on files
// app.use(express.static("public"));
// app.use(express.json({ limit: "100mb" }));
// app.use(express.urlencoded({ limit: "100mb", extended: true }));

// !cloudinary api

app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:DashBored")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});
app.post("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "ml_default",
    });
    console.log(uploadResponse);
    res.json({ msg: "yaya" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong server side" });
  }
});

//This is the listen. We only add the function so that we can add a console.log to see if it is working
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
