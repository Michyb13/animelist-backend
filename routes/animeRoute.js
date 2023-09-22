const express = require("express");
const {
  getAllAnime,
  createNewAnime,
  deleteAnime,
} = require("../controllers/animeRouteControllers");
const router = express.Router();

router.route("/").get(getAllAnime).post(createNewAnime);
router.route("/:id").delete(deleteAnime);

module.exports = router;
