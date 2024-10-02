const jwt = require("jsonwebtoken");
const { USER_SECRET_KEY } = require("../config");

const userAuth = (req, res, next) => {
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
};

module.exports = { userAuth };
