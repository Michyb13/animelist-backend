require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const dbConn = require("./config/connectDB");
const jwt = require("jsonwebtoken");

dbConn();

app.use(cors());

app.use(express.json());
app.use("/signup", require("./routes/signUpRoute"));
app.use("/login", require("./routes/loginRoute"));
app.use((req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer")) return res.sendStatus(401);
  const token = header.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded.user;
  });
  next();
});
app.use("/anime", require("./routes/animeRoute"));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
