import { getAllMovies } from "../data/movies.js";

export default class MovieController {
  static async getMovieById(id) {
    const movies = await getAllMovies(20, 1);
    let searchedMovie = null;

    movies.forEach((movie) => {
      if (movie._id == id) {
        searchedMovie = movie;
      }
    });

    return searchedMovie;
  }

  static async getMoviesWithAwards(pageSize, page) {
    const movies = await getAllMovies(pageSize, page);
    let moviesWithAwards = [];

    movies.forEach((movie) => {
      let awardsMovie = Number(movie.awards.wins);

      if (awardsMovie >= 1) {
        moviesWithAwards.push(movie);
      }
    });
    return moviesWithAwards;
  }

  static async getMoviesByLanguage(language, pageSize, page) {
    const movies = await getAllMovies(pageSize, page);
    let filteredMovies = [];

    movies.forEach((movie) => {
      if (movie.languages && movie.languages.includes(language)) {
        filteredMovies.push(movie);
      }
    });

    const startIndex = pageSize * (page - 1);
    const endIndex = startIndex + pageSize;
    const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

    return paginatedMovies;
  }

  static async getMoviesByFreshScore() {
    let movies = await getAllMovies(40, 1);

    movies.sort((a, b) => {
      const freshA = a.tomatoes?.fresh || 0;
      const freshB = b.tomatoes?.fresh || 0;

      return freshB - freshA;
    });

    return movies;
  }
}
