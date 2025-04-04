const jwt = require("jsonwebtoken");
const jwtSecret = "80fP2W6qPXorIp7apPfY4iRL8";

exports.userAuth = (req, res, next) => {
  // const token = req.cookies.jwt;
  const token = req?.headers?.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.role !== "basic") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res.status(401).json({ message: "Not authorized, token not available" });
  }
};
