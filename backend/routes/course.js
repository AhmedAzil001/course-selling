const { Router } = require("express");
const courseRouter = Router();
const { CourseModel } = require("../db");
const { userAuth } = require("../middleware/user");

courseRouter.get("/preview", userAuth, async (req, res) => {
  try {
    const allCourses = await CourseModel.find({}).lean();
    if (allCourses.length === 0) {
      return res.status(404).json({
        message: "No courses available at the moment.",
      });
    }

    return res.status(200).json({
      courses: allCourses,
      message: "Fetched all available courses successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching courses.",
      error: error.message,
    });
  }
});

courseRouter.post("/purchase", userAuth, (req, res) => {
  res.json({
    message: "Coures",
  });
});

module.exports = {
  courseRouter,
};
