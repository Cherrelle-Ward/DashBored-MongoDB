const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

//Needs the next method. Next tells the app that we are done with that function
exports.hashPass = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.unHash = async (req, res, next) => {
  try {
    //Finding a user by username
    req.user = await User.findOne({ username: req.body.username });

    // Here we are checking to see if the password is the right one. It compares the inputted password to the hashed password in foundUser
    //If true, so if it matches, then set req.user to the foundUser
    if (
      req.user &&
      (await bcrypt.compare(req.body.password, req.user.password))
    ) {
      next();
    }
    //If compare is false, throw Error. Never say if the username or password is wrong for security points.
    else {
      throw new Error("Incorrect credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.decrypt = async (req, res, next) => {
  try {
    //Finding the token and replacing Bearer with an empty string, so we are just left with the token
    //Normally the token is an object, {Bearer: skdjhfke}. So we remove Bearer.
    const token = req.header("Authorization").replace("Bearer ", "");

    //Here we de-code the token using verify(). It takes the token name and the string we used to hash it (SECRET)
    const decodedToken = await jwt.verify(token, process.env.SECRET);

    //Here we check to see if the decoded token is a user. we search our DB to see if _id matches the id of the decoded token
    req.user = await User.findOne({ _id: decodedToken._id });
    if (req.user) {
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};
