import { User } from "../models/userModel.js"
import jwt from "jsonwebtoken"

import {secretKey} from "../config.js";

export const verifySignup = async (req, res, next) => {
    try{
        if(!req.body.name){
            return res.status(400).send({
                message: "Faild ! Please provide your name to register",
            })
        }

        if(!req.body.email){
            return res.status(400).send({
                message: "Faild ! Please provide your email to register",
            })
        }
        
        if(!req.body.userID){
            return res.status(400).send({
                message: "Faild ! Please provide your userID to register",
            })
        }
        // Check if userID is already present then don't allow your user
    let user = await User.findOne({ userID: req.body.userID });
    if (user) {
      return res.status(400).send({
        message: "Failed ! User with the same userID already exits!",
      });
    }
    // Check if name is already present then don't allow this user
    let userName = await User.findOne({ name: req.body.name });
    if (userName) {
      return res.status(400).send({
        message: "Failed ! User with the same name is already present",
      });
    }
    // Check if email is present then don't allow your user
    let userEmail = await User.findOne({ email: req.body.email });
    if (userEmail) {
      return res.status(400).send({
        message: "Failed! User with this email already exits",
      });
    }

    next();

    }catch(e){
        console.log("error on signup", e);
        res.status(500).send({
            message: "Error in the request",
            error: "Error while validating the request body",
          });
    }
}

export const verifyToken = async (req, res, next) => {
    console.log("verify Token")
    // Check if the token is present in the header or not
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token found! You are unauthorised to veiw this.",
      });
    }
    // Check the validity of the token
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(403).send({
          message: "Unauthorised!",
        });
      }
      const user = await User.findOne({ userID: decoded.userID });
      if (!user) {
        return res.status(400).send({
          message: "Unauthorised ! The token for this user doenst exist",
        });
      }
      // Let's user our user fetched from the database from the next middleware
      req.user = user;
      next();
    });
  };
  
export const isAdmin = (req, res, next) => {
    if (req.user.userType !== "ADMIN") {
      return res.status(403).send({
        message: "Only Admin users are authorised to veiw this page!",
      });
    }
    next();
  };

export const verifySignin = (req, res, next) => {
    console.log("verifySignin")
    if (!req.body.userID) {
      return res.status(400).send({
        message: "Please provide your userID",
      });
    }
    if (!req.body.password) {
      return res.status(400).send({
        message: "Please provide your password",
      });
    }
    next();
  };
  