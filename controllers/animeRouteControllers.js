const Anime = require("../Models/Anime");

const getAllAnime = async (req, res) => {
  const user = req.user;
  try {
    const anime = await Anime.find({ user: user }).sort({ createdAt: -1 });
    if (!anime) return res.status(400).json({ message: "No Animes Saved" });
    res.status(200).json(anime);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.log(err);
  }
};

const createNewAnime = async (req, res) => {
  const user = req.user;
  const { name, genre, year } = req.body;
  if (!name || !genre || !year) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const newAnime = await Anime.create({
      name,
      genre,
      year,
      user,
    });
    res.status(201).json(newAnime);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteAnime = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Id is required" });

  try {
    const anime = await Anime.findOneAndDelete({ _id: id });
    if (!anime) return res.status(400).json({ message: "No Anime Found" });
    res.status(200).json(anime);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllAnime, createNewAnime, deleteAnime };
