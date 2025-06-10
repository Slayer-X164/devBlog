import { errorHandler } from "../middlewares/errorHandler.middleware.js";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUpUser = async (req, res, next) => {


  const { name, email, password } = req.body;
  try {
    const checkUserInDB = await userModel.findOne({ email });
    if (checkUserInDB) {
      //user already registered
      next(errorHandler(409, "user already registered!!"));
    }
    const hashedPassword = bcryptjs.hashSync(password);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Account Created Successfully!",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const signInUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const checkUserInDB = await userModel.findOne({ email });
    if (!checkUserInDB) {
      next(errorHandler(409, "Account doesn't exists!!"));
    }
    const hashedPassword = checkUserInDB.password;
    const comparePassword = bcryptjs.compare(password, hashedPassword);
    if (!comparePassword) {
      next(errorHandler(404, "Invalid login credentials"));
    }
    const user = checkUserInDB.toObject({ getters: true });
    delete user.password;
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
      },
      process.env.JWT_SECRET
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });
    res.status(200).json({
      success: true,
      user,
      message: "Login Successful!",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const signInWithGoogle = async (req, res, next) => {
  console.log("google sign in controler");
  
  const { name, email, photoURL } = req.body;
  let user;
  try {
    user = await userModel.findOne({ email });
    if (!user) {
      const randomeTempPass = Math.random().toString();
      const hashedRandomTempPass = bcryptjs.hashSync(randomeTempPass);
      const createNewUser = new userModel({
        name,
        email,
        password: hashedRandomTempPass,
        photoURL,
      });
      user = await createNewUser.save();
    }
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
      },
      process.env.JWT_SECRET
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });
    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      newUser,
      message: "Login Successful!",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
