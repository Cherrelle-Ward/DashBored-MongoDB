require("./db/connection");
const express = require("express");
const cors = require("cors");

const userRouter = require("./user/routes");

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

//This is the listen. We only add the function so that we can add a console.log to see if it is working
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
