import { SignIn, SignUp } from "../config/type.js";
import User from "../Models/Users.js";
import { generateAdminToken, generateToken } from "../Utils/Auth.js";
import { ErrorHandler } from "../Middleware/ErrorHandler.js";

export const userSignin = async (req, res, next) => {
  const BodyParser = req.body;
  const parsedPayload = SignIn.safeParse(BodyParser);

  if (!parsedPayload.success) {
    return next(new ErrorHandler("Fill details properly!", 400));
  }

  const isExists = await User.findOne({
    username: parsedPayload.data.username,
    role: "Customer",
  });

  if (!isExists) return next(new ErrorHandler("User doesn't exists!", 400));

  const isMatchedPassword = await isExists.comparePassword(
    parsedPayload.data.password
  );

  if (!isMatchedPassword)
    return next(new ErrorHandler("Password didn't matched!", 400));

  generateToken(isExists, "Login Successfull", 201, res);
};

export const userSignUp = async (req, res, next) => {
  const BodyParser = req.body;

  if (
    BodyParser.username === "" ||
    BodyParser.email === "" ||
    BodyParser.password === ""
  )
    return next(new ErrorHandler("Fill all the details properly!", 400));
    const parsedPayload = SignUp.safeParse(BodyParser);
    console.log(parsedPayload.error);
  if (!parsedPayload.success)
    return next(new ErrorHandler("Fill all the details properly", 400));

  const isUsernameExists = await User.findOne({
    username: parsedPayload.data.username,
  });

  if (isUsernameExists)
    return next(new ErrorHandler("Username is already taken!", 400));

  const isEmailExists = await User.findOne({ email: parsedPayload.data.email });

  if (isEmailExists)
    return next(new ErrorHandler("Email is already taken!", 400));

  const user = await User.create({
    username: parsedPayload.data.username,
    email: parsedPayload.data.email,
    password: parsedPayload.data.password,
    role: "Customer",
  });

  if (user)
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully!",
    });
  else {
    return next(new ErrorHandler("Something went wrong!", 400));
  }
};

export const getUserDetails = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
};

export const logout = async (req, res) => {
  
  res
    .status(201)
    .cookie("CustomerToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Customer Logged Out Successfully.",
    });
};

export const adminSignin = async (req, res, next) => {
  const BodyParser = req.body;
  const parsedPayload = SignIn.safeParse(BodyParser);

  if (!parsedPayload.success) {
    return next(new ErrorHandler("Fill details properly!", 400));
  }

  const isExists = await User.findOne({
    username: parsedPayload.data.username,
    role: "Admin",
  });

  if (!isExists) return next(new ErrorHandler("User doesn't exists!", 400));

  const isMatchedPassword = await isExists.comparePassword(
    parsedPayload.data.password
  );

  if (!isMatchedPassword)
    return next(new ErrorHandler("Password didn't matched!", 400));

  generateAdminToken(isExists, "Login Successfull", 201, res);
};

export const getAdmin = async (req, res, next) => {
  const admin = await User.find({
    role: "Admin"
  }).select("-password");

  res.json({
    admin
  })
}