const jwt = require("jsonwebtoken");
const config = require("../../config/environment");

const validateRequest = function(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token.split(" ")[1], config.privateKey);
    req.user = {_id: decoded._id};
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = {
    validateRequest
};
