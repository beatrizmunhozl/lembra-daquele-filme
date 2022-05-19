import { tmdbAccess } from "./api";

export const getByGenre = async ({ name, id }) => {
  return async () => ({
    keyWord: "genres",
    name,
    items: await tmdbAccess.get(
      `/discover/movie?with_genres=${id}&language=pt-BR`
    ),
  });
};

export const getSeries = async (name) => {
  return async () => ({
    keyWord: "popularSeries",
    title: name,
    items: await tmdbAccess.get(
      `/tv/popular?api_key=9274a24698b0d50f3d975771c35fd96e&language=pt-BR`
    ),
  });
};

export const getMovies = async () => {
  return async () => ({
    keyWord: "popularMovies",
    title: "Filmes mais populares",
    items: await tmdbAccess.get("/movie/popular/?language=pt-BR"),
  });
};

export default {
  getMedia: async () => {
    return [
      {
        keyWord: "populars",
        title: "Filmes mais populares",
        items: await tmdbAccess.get("/movie/popular/?language=pt-BR"),
      },
      {
        keyWord: "toprated",
        title: "Em Alta",
        items: await tmdbAccess.get("/movie/top_rated/?language=pt-BR"),
      },

      {
        keyWord: "trending",
        title: "Recomendados para você",
        items: await tmdbAccess.get("/trending/all/week?language=pt-BR"),
      },

      {
        keyWord: "action",
        title: "Ação",
        items: await tmdbAccess.get(
          "/discover/movie?with_genres=28&language=pt-BR"
        ),
      },
      {
        keyWord: "comedy",
        title: "Comédia",
        items: await tmdbAccess.get(
          "/discover/movie?with_genres=35&language=pt-BR"
        ),
      },
      {
        keyWord: "horror",
        title: "Terror",
        items: await tmdbAccess.get(
          "/discover/movie?with_genres=27&language=pt-BR"
        ),
      },
      {
        keyWord: "romance",
        title: "Romance",
        items: await tmdbAccess.get(
          "/discover/movie?with_genres=10749&language=pt-BR"
        ),
      },
      {
        keyWord: "documentary",
        title: "Documentários",
        items: await tmdbAccess.get(
          "/discover/movie?with_genres=99&language=pt-BR"
        ),
      },
      {
        keyWord: "music",
        title: "Música",
        items: await tmdbAccess.get(
          "/discover/movie?with_genres=10402&language=pt-BR"
        ),
      },
      {
        keyWord: "science fiction",
        title: "Ficção científica",
        items: await tmdbAccess.get(
          "/discover/movie?with_genres=878&language=pt-BR"
        ),
      },
      {
        keyWord: "war",
        title: "Guerra",
        items: await tmdbAccess.get(
          "/discover/movie?with_genres=10752&language=pt-BR"
        ),
      },
      {
        keyWord: "western",
        title: "Faroeste",
        items: await tmdbAccess.get(
          "/discover/movie?with_genres=37&language=pt-BR"
        ),
      },
      {
        keyWord: "mistery",
        title: "Mistério",
        items: await tmdbAccess.get(
          "/discover/movie?with_genres=9648&language=pt-BR"
        ),
      },
      {
        keyWord: "fantasy",
        title: "Fantasia",
        items: await tmdbAccess.get(
          "/discover/movie?with_genres=14&language=pt-BR"
        ),
      },
      {
        keyWord: "family",
        title: "Família",
        items: await tmdbAccess.get(
          "/discover/movie?with_genres=10751&language=pt-BR"
        ),
      },
      {
        keyWord: "adventure",
        title: "Aventura",
        items: await tmdbAccess.get(
          "/discover/movie?with_genres=12&language=pt-BR"
        ),
      },
    ];
  },
};
