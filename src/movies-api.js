import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {
  accept: "application/json",
  api_key: "82f5971bc75e2f9ab18ad7c9ed0f1e91",
  language: "en-US",
  Authorization:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmY1OTcxYmM3NWUyZjlhYjE4YWQ3YzllZDBmMWU5MSIsInN1YiI6IjY2MGVmOWM5NWFhZGM0MDE2MzY1NzFiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0pYsEx0z8_jGrRQp0_v6nBtR6otQ_FkY1SbcKRkH6Y",
};

export const getMovies = async () => {
  const { data } = await axios.get("trending/movie/day");
  return data;
};

export const getMovieByID = async (movie_id) => {
  const { data } = await axios.get(`movie/${movie_id}`);
  return data;
};

export const getMoviesByQuery = async (query) => {
  const { data } = await axios.get(`search/movie?query=${query}`);
  return data;
};

export const getMovieCredits = async (movie_id) => {
  const { data } = await axios.get(`movie/${movie_id}/credits`);
  return data;
};

export const getMovieReviews = async (movie_id) => {
  const { data } = await axios.get(`movie/${movie_id}/reviews`);
  return data;
};
