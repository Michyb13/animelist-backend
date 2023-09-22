const User = require("../Models/User");
const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schema = new passwordValidator();
schema.is().min(8).has().uppercase();

const signUp = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "All fields are required." });
  if (!schema.validate(password))
    return res.status(400).json({
      message:
        "Password must be min of 8 characters and must have at least one uppercase letter",
    });
  try {
    const duplicate = await User.findOne({ username });
    if (duplicate)
      return res
        .status(409)
        .json({ message: "This Username is already in use." });
    const hashedPwd = await bcrypt.hash(password, 10);
    const accessToken = jwt.sign(
      { user: username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const newUser = await User.create({
      username: username,
      password: hashedPwd,
    });
    res.status(201).json({ user: username, token: accessToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = signUp;
