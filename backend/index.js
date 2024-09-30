import express from "express";
import bcrypt from "bcrypt"
import { PORT, mongoDBURL,admin } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import authRoute  from "./routes/authRoute.js"
import cors from "cors";
import { User } from "./models/userModel.js";
const app = express();

app.use(express.json());
app.use(cors());
/*app.use(cors({
    origin:'http://localhost:3000',
    methods: ['GET', 'POST' , 'PUT' ,'DELETE']?
    allowedHeaders: ['Content-Type']
})
)*/



app.listen(PORT, () => {
  console.log(`App is listrning to port: ${PORT}`);
});

const main = async () => {
  try {
    const connection = await mongoose.connect(mongoDBURL);
    console.log("App connected to DB");
    await init();
  } catch (e) {
    console.log("Error connected to database", e);
  }
};

const init = async () => {
  try {
    let user = await User.findOne({ userID: "admin" }); // Use findOne to fetch a single document
    if (user) {
      console.log("Admin is already present");
      return;
    }
  } catch (e) {
    console.log("Error finding the admin", e);
  }

  try {
    const user = await User.create({
      // Use await for async operation
      name: "HASNA",
      userID: "admin",
      email: "hasna@gmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync(admin, 8),
    });
    console.log("Admin created successfully", user);
  } catch (e) {
    console.log("Error while creating admin", e);
  }
};

main();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

app.use("/books", bookRoute);
app.use("/auth",authRoute);