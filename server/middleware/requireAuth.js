const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const requireAuth = async (req, res, next) => {
  try {
    console.log("Middleware running");
  
    // read token off cookies
    const token = req.cookies.Authorization;
    console.log(token);
    // token should look something like this: //
    // [eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmI3NGUyOWRhMjIyMzU2MTA5YmZmZTUiLCJleHAiOjE3MjU5MDY3MDU4NjEsImlhdCI6MTcyMzMxNDcwNX0.kJ_FQc09p_yLnUu7rHVHllxWBqGwJ_is-3LUlq4C5cU]

    // decode token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken);
    // decodedToken should look something like this: //
    // {
    //   sub: '66b74e29da222356109bffe5', [subject]
    //   exp: 1725906705861, [expire time]
    //   iat: 1723314705 [issued at time]
    // }

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