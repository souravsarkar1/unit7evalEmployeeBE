const express = require("express");
var cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
const { blackList } = require("../models/blacklist");
// const { blackList } = require("../models/blacklisting");
require("dotenv").config();

const userRouter = express.Router();
userRouter.use(cookieParser());

//signup
userRouter.post("/signup", async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
  } = req.body;

  try {
    if(password !==confirmPassword){
        res.status(400).send({ message: "Confirm password not matched" });
    }else{
        const isUserPresent = await userModel.findOne({ email });
        if (isUserPresent)
          return res.send("User is already Present, Please loging ");
    
        const hash = await bcrypt.hash(password, 8);
    
        const user = new userModel({
            email,
            password:hash,
            confirmPassword:hash,
        });
        await user.save();
    
        res.status(200).send({ message: "User is Succesfully SignUp" });
    }
   
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "user is not register" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).send({ message: "Password is not correct" });

    const token = jwt.sign({ email }, "secretKey", {
      expiresIn: "1m",
    });


    res.cookie("AccessTokenLog", token, { maxAge: 2000 * 60 });
    res
      .status(200)
      .send({ message: "loging succesfull!", token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


userRouter.get("/logout",async(req,res)=>{

    try {
        const {AccessTokenLog} = req.cookies
        const blackListRefreshToken = new blackList({token:AccessTokenLog})
       await blackListRefreshToken.save()
        res.status(200).send({msg:"logout succesful"})
    } catch (err) {
        res.status(400).send({msg:err.message})
        
    }
})

module.exports = {
  userRouter
};
