import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

import { CustomCard } from "./style";
import { imagePathPrefix } from "../../assets/js/utils";
import { CollectionContext } from "../../Providers/CollectionProvider";

import logo from "../../assets/img/logo.svg";
import loader from "../../assets/img/loader.svg";

import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { FaAngleDoubleLeft, FaEdit } from "react-icons/fa";

import { StyleContainer } from "./style";
import { Redirect } from "react-router-dom";
import { useUser } from "../../Providers/UserProvider";
import { useTMDBMedias } from "../../Providers/MediasProvider";
import { useCommentModal } from "../../Providers/CommentModalProvider";

const Watched = () => {
  const { toggle } = useCommentModal();
  const [collection, setcCollection] = useState(null);
  const { isLoading } = useTMDBMedias();
  const { isLoggedIn } = useUser();
  const history = useHistory();

  const { getCollection, removeMovieFromCollection } = useContext(
    CollectionContext
  );

  const collectionUpdate = (movie) => {
    setcCollection((currentCollection) =>
      currentCollection.filter(({ movieId }) => movieId !== movie.movieId)
    );
  };

  useEffect(() => {
    getCollection()
      .then((movies) => setcCollection(movies))
      .catch(({ response }) => {
        const errorStatus = [401];

        if (errorStatus.includes(response.status)) {
          history.push("/login");
          toast.error("Sua sessão expirou. Efetue o login novamente");
        }
      });
  }, []);

  return isLoggedIn ? (
    <StyleContainer>
      <div className="cont-geral-dashboard">
        <header>
          <div className="cont-header">
            <div className="menu" onClick={() => history.push("/dashboard")}>
              <FaAngleDoubleLeft width={70} />
              <span>Voltar</span>
            </div>

            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </header>

        <main>
          {collection && isLoading ? (
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
            collection &&
            collection.map((movie) => (
              <CustomCard key={movie.movieId}>
                <div className="movie-tittle">
                  <img
                    src={imagePathPrefix + movie.poster_path}
                    alt={movie.title}
                    width="100%"
                  />
                  <span>{movie.title}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      removeMovieFromCollection(movie);
                      collectionUpdate(movie);
                    }}
                  >
                    Remover
                  </button>
                  <button>
                    <FaEdit onClick={() => toggle(movie)} />
                  </button>
                </div>
              </CustomCard>
            ))
          )}
        </main>
      </div>
    </StyleContainer>
  ) : (
    <Redirect to="/login" />
  );
};
export default Watched;
