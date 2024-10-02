const jwt = require("jsonwebtoken");
const { ADMIN_SECRET_KEY } = require("../config");

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.token;
    const { adminId } = jwt.verify(token, ADMIN_SECRET_KEY);

    if (adminId) {
      req.adminId = adminId;
      next();
    } else {
      res.send(401).json({
        message: "Token is expired",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  adminAuth,
};
