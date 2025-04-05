const jwt = require("jsonwebtoken");
const jwtSecret = "80fP2W6qPXorIp7apPfY4iRL8";

exports.userAuth = (req, res, next) => {
  const token = req?.headers?.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "Not authorized, token not available" });
  }
};
