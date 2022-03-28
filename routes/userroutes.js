const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usersCollection = require("../models/user");

//
//
//
//
// regester user
Router.post("/registeruser", async (req, res) => {
  const { username, email, password } = req.body;

  const userexist = await usersCollection.findOne({ email });
  if (userexist) {
    res.status(400).json({ message: "email already exist" });
  } else {
    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, genSalt);

    await new usersCollection({
      username,
      email,
      password: hashPassword,
    })
      .save()
      .then((user) => {
        res.status(201).json({
          message: "success",
          user,
          token: generatetoken(user),
        });
      });
    return;
  }
});

//
//
// Login user
Router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await usersCollection.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: "success",
      user,
      token: generatetoken(user),
    });
  } else if (!user) {
    res.status(400).json({ message: "email doesn't exist!" });
  } else if (!(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ message: "wrong password!" });
  }
  return;
});

//
//
//
//
// generate token
const generatetoken = (user) => {
  const token = jwt.sign({ user }, process.env.ACCESS_TOKEN);
  return token;
};

const { protect } = require("../middleware/authmiddleware");

Router.get("/getuser", protect, (req, res) => {
  res.status(201).json(req.user);
});

module.exports = Router;
