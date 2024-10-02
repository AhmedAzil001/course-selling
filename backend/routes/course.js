const { Router } = require("express");
const courseRouter = Router();

courseRouter.get("/preview", (req, res) => {
  res.json({
    message: "Coures",
  });
});

courseRouter.post("/purchase", (req, res) => {
  res.json({
    message: "Coures",
  });
});

module.exports = {
  courseRouter,
};
