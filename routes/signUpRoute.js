const express = require("express");
const signUp = require("../controllers/signupRouteController");
const router = express.Router();

router.route("/").post(signUp);

module.exports = router;
