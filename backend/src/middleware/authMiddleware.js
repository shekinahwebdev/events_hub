const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    // extract token from either HTTP-only Cookies or Authorization Headers
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. Please log in first." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired session token." });
  }
};

module.exports = { authenticateUser };
