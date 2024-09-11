import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";
import { User } from "../models/userModel.js";

export const signup = async (req, res) => {
  const { name, userID, email, password } = req.body;

  const userObj = {
    name: name,
    userID: userID,
    email: email,
    password: bcrypt.hashSync(password, 8),
  };

  try {
    let usres_created = await User.insertMany([userObj]);
    const user_created = usres_created[0];
    const resultObj = {
      name: user_created.name,
      userID: user_created.userID,
      email: user_created.email,
      userType: user_created.userType,
    };
    res.status(201).send(resultObj);
    console.log(resultObj);
  } catch (e) {
    console.log("Error while registering the user", e);
    res.status(500).send({
      message: "Some error happened while registering the user",
    });
  }
};

export const signin = async (req, res) => {
  let user = await User.findOne({ userID: req.body.userID });
  if (user === null) {
    return res.status(400).send({
      message: "UserID passed is not a valid one",
    });
  }

  let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({
      message: "Please check your password",
    });
  }
  // If above two conditions match we will pass a token to our use.The token will be generated by using JWT
  const token = jwt.sign({ userID: user.userID }, secretKey, {
    expiresIn: "24h",
  });
  res.status(200).send({
    name: user.name,
    userID: user.userID,
    email: user.email,
    userType: user.userType,
    accesstoken: token,
  });
};

