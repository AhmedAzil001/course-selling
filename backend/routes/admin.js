const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {
  res.json();
});

adminRouter.post("/signin", (req, res) => {
  res.json();
});

adminRouter.get("/courses", (req, res) => {
  res.json();
});

adminRouter.post("/course", (req, res) => {
  res.json();
});

adminRouter.put("/course", (req, res) => {
  res.json();
});

adminRouter.delete("/course", (req, res) => {
  res.json();
});

module.exports = {
  adminRouter,
};
