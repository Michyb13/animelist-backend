const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");

const schema = new passwordValidator();
schema.is().min(8).has().uppercase();

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "All fields are required." });
  if (!schema.validate(password))
    return res.status(400).json({
      message:
        "Password must be minimum of 8 characters and must have at least one uppercase letter",
    });
  try {
    const foundUser = await User.findOne({ username: username });
    if (!foundUser)
      return res.status(400).json({ message: "Invalid Username" });
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(409).json({ message: "Incorrect Password" });
    const accessToken = jwt.sign(
      { user: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ user: username, token: accessToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = login;
