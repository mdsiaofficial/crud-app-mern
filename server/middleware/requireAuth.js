const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const requireAuth = async (req, res, next) => {
  try {
    console.log("Middleware running");
  
    // read token off cookies
    const token = req.cookies.Authoriization;
    // decode token
    const decodedToken = jwt.verify(token, process.env.SECRET);
  
    // find user using decoded part
    const user = await User.findById(decodedToken.sub);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // attach user to req
    req.user = user;
    // continue on
    next();
  } catch (error) {
    console.error('Require Auth error: - ', error);
    res.status(400).json({ message: "Require Auth error" });
  }
}

module.exports = requireAuth;