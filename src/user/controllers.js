const jwt = require("jsonwebtoken");
const { findOne } = require("./model");
const User = require("./model");

//Shorthand exports. So you type exports then the "." and THEN the function name
exports.addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    //sign() creates a token.   We then hash the new id object using our SECRET stored in the env.
    //sign stores what you want inside that token and how you want to hide that token
    //sign({hashed Object} is the token, how we want to hide it)
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);

    // THIS IS IMPORTANT. Below you are sending the username and ONLY the username to the front end of the project. NEVER SEND THE PASSWORD.
    res.status(200).send({ user: newUser.username, token: token });
  } catch (error) {
    console.log(error);
    //If you dont send this off to the server then your db will be stuck in this catch error block forever
    res.status(500).send({ err: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await jwt.sign({ _id: req.user._id }, process.env.SECRET);
    res.status(200).send({ user: req.user.username, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

// image
exports.updateImage = async (req, res) => {
  const { image } = req.body;
  try {
    await User.findOneAndUpdate(
      { username: req.body.user },
      {
        $push: {
          image: image,
        },
      }
    );
    res.status(200).send({ message: "User image updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Check server logs" });
  }
};

exports.getImages = async (req, res) => {
  try {
    const user = await findOne({
      username: req.body.user,
    });
    res.status(200).send({ images: user.image });
  } catch (error) {
    console.log(error);
  }
};
