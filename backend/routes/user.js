const { Router, json } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRouter = Router();
const { USER_SECRET_KEY } = require("../config");
const { UserModel, PurchaseModel, CourseModel } = require("../db");
const { userAuth } = require("../middleware/user");

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    //hashing password and creating a user
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await UserModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });

    const userId = newUser._id;
    //generate token
    const token = jwt.sign({ userId: userId }, USER_SECRET_KEY);
    return res.status(200).json({
      token: token,
      message: "Signed up successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB's duplicate key error code
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    //server side error
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    //compare password
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(401).json({
        message: "Incorrect Credentials",
      });
    }

    //generate token
    const token = jwt.sign({ userId: user._id }, USER_SECRET_KEY);
    res.status(200).json({
      token: token,
      message: "Login Successfull",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

userRouter.get("/purchases", userAuth, async (req, res) => {
  try {
    const userId = req.userId;
    //access the course purchased by user
    //Instead of find({}) (which retrieves all purchases), you now filter by the userId, ensuring only the authenticated user's purchases are fetched.
    const getCourse = await PurchaseModel.find({ userId });
    if (getCourse.length === 0) {
      return res.status(404).json({
        message: "No course purchased",
      });
    }

    //gettig course ids of courses purchased by the user
    const courseIds = getCourse.map((purchase) => purchase.courseId);

    //getting the details of all courses
    // Fetch all courses concurrently using Promise.all
    //This makes fetching course details for all purchased courses concurrent, reducing the time taken for multiple queries.
    const allCourses = await Promise.all(
      //Use lean() in Mongoose queries to return plain JavaScript objects instead of Mongoose documents, improving performance if you don't need the additional functionality of Mongoose documents.
      courseIds.map((courseId) => CourseModel.findOne({ courseId }).lean())
    );

    //this code was resolving each promise sequentially which will take more execution time
    // for (let course of getCourse) {
    //   const courseId = course.courseId;

    //   const course = await CourseModel.findOne({ courseId });
    //   allCourses.push(course);
    // }

    return res.status(200).json({
      purchasedCourses: allCourses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

module.exports = {
  userRouter,
};
