const express = require("express");
const login = require("../controllers/loginRouteController");
const router = express.Router();

router.route("/").post(login);

module.exports = router;
