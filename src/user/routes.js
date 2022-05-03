const { Router } = require("express");
const { hashPass, unHash, decrypt } = require("../middleware");
const { addUser, login, updateImage, getImages } = require("./controllers");

const userRouter = Router();

userRouter.post("/user", hashPass, addUser);
userRouter.post("/login", unHash, login);
userRouter.get("/user", decrypt, login);
userRouter.patch("/addImage", /*tokenAuth,*/ updateImage);
userRouter.post("/getImages", getImages);

module.exports = userRouter;
