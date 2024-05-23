import express from "express";
import { getAllMovies } from "../data/movies.js";
import MovieController from "../controllers/MovieController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/moviesByFreshScore", async (req, res) => {
  let moviesSortedByFreshScore = await MovieController.getMoviesByFreshScore();

  res.json(moviesSortedByFreshScore);
});

router.get("/moviesWithAwards", async (req, res) => {
  try {
    let moviesWithAwards = await MovieController.getMoviesWithAwards(20, 1);

    res.json(moviesWithAwards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:languages", async (req, res) => {
  try {
    const language = req.params.languages;

    let moviesByLanguage = await MovieController.getMoviesByLanguage(
      language,
      20,
      1
    );

    if (moviesByLanguage) {
      res.json(moviesByLanguage);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/movie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    let movie = await MovieController.getMovieById(movieId);

    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
