const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register User
const signup = async (req, res) => {
  
  try {
    // get email and password
    const { email, password } = req.body;
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
    // create new jwt
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp: exp }, process.env.SECRET);

    // set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // send jwt to client
    res.status(202).json({ token: token, message: "Logged in successfully" });
  } catch (error) {
    console.error('Error: ', error);
    res.status(404).json({ message: "User not found" });
    
  }
}
const logout = (req,res) => {}


const checkAuth = (req, res) => {
  console.log(req.user);
  res.status(200).json({ message: "all ok!" });
}

module.exports = { signup, login, logout, checkAuth };
