const { Router } = require("express");
const { hashPass, unHash, decrypt } = require("../middleware");
const { addUser, login, updateImage } = require("./controllers");

const userRouter = Router();

userRouter.post("/user", hashPass, addUser);
userRouter.post("/login", unHash, login);
userRouter.get("/user", decrypt, login);
userRouter.put("/updateImage", /*tokenAuth,*/ updateImage);

module.exports = userRouter;
