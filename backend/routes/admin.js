const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ADMIN_SECRET_KEY } = require("../config");
const { AdminModel, PurchaseModel, CourseModel } = require("../db");
const { adminAuth } = require("../middleware/admin");
const { signinBody, signupBody } = require("../validations");

adminRouter.post("/signup", async (req, res) => {
  const { success, error } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(404).json({
      message: "Incorrect format",
      error: error,
    });
  }

  const { email, password, firstName, lastName } = req.body;

  try {
    //hashing password and creating a user
    const hashedPassword = await bcrypt.hash(password, 5);
    const newAdmin = await AdminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });

    const adminId = newAdmin._id;
    //generate token
    const token = jwt.sign({ adminId: adminId }, ADMIN_SECRET_KEY);
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

adminRouter.post("/signin", async (req, res) => {
  const { success, error } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(404).json({
      message: "Incorrect format",
      error: error,
    });
  }
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email: email });
    if (!admin) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    //compare password
    const passwordMatched = await bcrypt.compare(password, admin.password);
    if (!passwordMatched) {
      return res.status(401).json({
        message: "Incorrect Credentials",
      });
    }

    //generate token
    const token = jwt.sign({ adminId: admin._id }, ADMIN_SECRET_KEY);
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

adminRouter.get("/courses", adminAuth, async (req, res) => {
  try {
    const adminId = req.adminId;
    const allCourses = await CourseModel.find({ creatorId: adminId });
    if (allCourses.length === 0) {
      return res.status(404).json({
        message: "No course at the moment",
      });
    }
    return res.status(200).json({
      courses: allCourses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

adminRouter.post("/course", adminAuth, async (req, res) => {
  const { title, description, price, imgURL } = req.body;
  const adminId = req.adminId;

  try {
    const course = await CourseModel.create({
      title: title,
      description: description,
      price: price,
      imgURL: imgURL,
      creatorId: adminId,
    });

    return res.status(200).json({
      message: "Course created successfully",
      course: course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

adminRouter.put("/course", adminAuth, async (req, res) => {});

adminRouter.delete("/course/:courseId", adminAuth, async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  try {
    const deletedCourse = await CourseModel.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });

    // If no course found, send a 404 response
    if (!deletedCourse) {
      return res.status(404).json({
        message: "Course not found, cannot delete",
      });
    }

    return res.status(201).json({
      message: "Course deleted successfully",
      course: deletedCourse,
    });
  } catch (error) {
    return req.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = {
  adminRouter,
};
