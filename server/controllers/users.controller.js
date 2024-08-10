const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
// Register User
const signup = async (req, res) => {
  
  try {
    // get email and password
    const { email, password } = req.body;
    // hash pass
    const hashedPass = bcrypt.hashSync(password, 14);
    // create user
    await User.create({ email, password: hashedPass });
  
    // respond
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error('[--User signup not successful.--]', error);
    res.status(400).json({ message: "User signup not successful."})
    
  }

}
const login = (req,res) => {}
const logout = (req,res) => {}


module.exports = { signup, login, logout };
