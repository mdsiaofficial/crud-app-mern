const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register User
const signup = async (req, res) => {
  
  try {
    // get email and password
    const { email, password } = req.body;

    // check if user exists
    // const user = await User.findOne({ email: email });
    // if (user) {
    //   return res.status(401).json({ message: "User exists. Please login." });
    // }

    // hash pass
    const hashedPass = bcrypt.hashSync(password, 8);
    // create user
    await User.create({ email, password: hashedPass });
  
    // respond
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error('[--User signup not successful.--]', error);
    res.status(400).json({ message: "User signup not successful."})
    
  }

}

const login = async (req, res) => {
  try {
    // get email and pass
    const { email, password } = req.body;

    // find the user with email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // compare sent pass with found user pass
    const passMatch = bcrypt.compareSync(password, user.password);

    if (!passMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // create new jwt --------1sec-60sec-60min-24h-30d
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; //30 days
    // const exp = Date.now() + 1000 * 10; //10 sec // for test
    const token = jwt.sign({ sub: user._id, exp: exp }, process.env.SECRET);
    // token should look something like this: //
    // [eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmI3NGUyOWRhMjIyMzU2MTA5YmZmZTUiLCJleHAiOjE3MjU5MDY3MDU4NjEsImlhdCI6MTcyMzMxNDcwNX0.kJ_FQc09p_yLnUu7rHVHllxWBqGwJ_is-3LUlq4C5cU]
    
    // set the cookie
    // Set a cookie named "Authorization" with the provided token as the value. 
    // The cookie will expire after 30 days.
    // The cookie will only be accessible via HTTP (not HTTPS), and will not be accessible via JavaScript.
    // The cookie will be sent with requests to the same domain and its subdomains.
    // If the environment is set to "production", the cookie will only be sent with HTTPS requests.
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: true, // access with https also
      // secure: process.env.NODE_ENV === "production",
    });

    // send jwt to client
    res.status(202).json({ token: token, message: "Logged in successfully" });
  } catch (error) {
    console.error('Error: ', error);
    res.status(404).json({ message: "User not found" });
    
  }
}
const logout = async (req, res) => {
  try {
    // clear the cookie
    res.clearCookie("Authorization");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error('Logout error: ', error);
    res.status(400).json({ message: "Logout Error" });
    
  }
}


const checkAuth = (req, res) => {
  try {
    console.log(req.user);
    res.status(200).json({ message: "all ok!" });
  } catch (error) {
    console.error('Check Auth error: ', error);
    res.status(400).json({ message: "Check auth Error" });
    
  }
}

module.exports = { signup, login, logout, checkAuth };