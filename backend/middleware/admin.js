const jwt = require("jsonwebtoken");
const { ADMIN_SECRET_KEY } = require("../config");

const adminAuth = (req, res, next) => {
  const token = req.headers.token;
  const { id } = jwt.verify(token, ADMIN_SECRET_KEY);

  if (id) {
    req.userId = id;
    next();
  } else {
    res.status(404).json({
      message: "You are not logged in",
    });
  }
};

module.exports = {
  adminAuth,
};
