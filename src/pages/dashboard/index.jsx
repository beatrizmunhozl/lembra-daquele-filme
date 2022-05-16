import React, { createContext, useContext, useEffect, useState } from "react";
import logo from "../../assets/img/logo.svg";
import loader from "../../assets/img/loader.gif";

import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { StyleContainer } from "./style";
import { tmdbAccess } from "../../services/api";
import tmdb, { getByGenre } from "../../services/tmdb";
import { useTMDBMedias } from "../../Providers/MediasProvider";
import { Redirect } from "react-router-dom";
import { useUser } from "../../Providers/UserProvider";
import { CollectionContext } from "../../Providers/CollectionProvider";

import MoviesSections from "../../components/moviesSlider";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/searchBar";

import { WishListContext } from "../../Providers/WishListProvider";


const Dashboard = () => {
  const [movieGenres, setMovieGenres] = useState([]);
  const { isLoading, getMedias } = useTMDBMedias();
  const { isLoggedIn } = useUser();

  // useEffect(() => {
  //   tmdbAccess
  //     .get("/genre/movie/list?&language=pt-BR")
  //     .then((resp) => setMovieGenres(resp.data))
  //     .catch((err) => console.log(`erro getGenres => ${err}`));
  // }, []);

  // const handleFilterClick = async (genre) => {
  //   const filteredMovies = await getByGenre(genre);
  //   getMedias(filteredMovies);
  // };

  const handleFilterClick = async (genre) => {
    const filteredMovies = await getByGenre(genre);
    getMedias(filteredMovies);
  };

  return isLoggedIn ? (
    <StyleContainer>
      <aside>
        <Sidebar />
      </aside>

      <main>
        {/* <nav>
          <ul>
            <li onClick={() => getMedias(tmdb.getMedia)}>Todos</li>
            {movieGenres.genres &&
              movieGenres.genres.map((genre) => (
                <li key={genre.id} onClick={() => handleFilterClick(genre)}>
                  {genre.name}
                </li>
              ))}
          </ul>
        </nav> */}

        <header>
          <div className="cont-header">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>

            <SearchBar />
          </div>
        </header>

        {isLoading ? (
          <Grid
            spacing={1}
            container
            justifyContent="center"
            alignItems="center"
            height="50vh"
          >
            <Grid xs={1} item>
              <img
                src={loader}
                width="100%"
                style={{ maxWidth: "50px" }}
                alt="loader"
              />
            </Grid>
          </Grid>
        ) : (
          <MoviesSections />
        )}
      </main>
    </StyleContainer>
   ) : (
     <Redirect to="/login" />
   );
};

export default Dashboard;
