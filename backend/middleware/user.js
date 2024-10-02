const jwt = require("jsonwebtoken");
const { USER_SECRET_KEY } = require("../config");

const userAuth = (req, res, next) => {
  try {
    const token = req.headers.token;
    const { userId } = jwt.verify(token, USER_SECRET_KEY);

    if (userId) {
      req.userId = userId;
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

module.exports = { userAuth };
