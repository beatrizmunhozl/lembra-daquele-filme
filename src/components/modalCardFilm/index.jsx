import React from "react";
import ReactModal from "react-modal";
import { FaTimes } from "react-icons/fa";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useWishList } from "../../Providers/WishListProvider";
import { useInfosModal } from "../../Providers/InfosModalProvider";
import { useCollection } from "../../Providers/CollectionProvider";
import { Avatar, Rating, Typography, Box, Grid } from "@mui/material";
import { Image, Infos, BtnClose, modalStyle, BtnAdd } from "./style";

const ModalCardFilm = () => {
  const { isOpen, toogle, media } = useInfosModal();
  const { addMovieToCollection } = useCollection();
  const { addMovieToWishList } = useWishList();

  const imagePathPrefix = "http://image.tmdb.org/t/p/w500/";

  return (
    <ReactModal
      style={{ ...modalStyle }}
      isOpen={isOpen}
      onRequestClose={toogle}
      ariaHideApp={false}
    >
      <BtnClose onClick={toogle}>
        <FaTimes />
      </BtnClose>
      <Grid container spacing={1} alignItems={"center"} maxHeight={"100vh"}>
        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
          <Image src={imagePathPrefix + media.poster_path} />
        </Grid>

        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
          <Infos>
            <Typography alignSelf="center" variant="h6">
              {media.title || media.name}
            </Typography>
            <Typography
              size={16}
              maxHeight="34ch"
              overflow="auto"
              text-overflow="ellipsis"
              white-space="nowrap"
            >
              {media.overview}
            </Typography>
            <Box
              sx={{
                gap: "10px",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              <Typography size={12}>
                <Rating
                  sx={{ verticalAlign: "middle" }}
                  readOnly
                  precision={0.5}
                  value={media.vote_average / 2}
                  emptyIcon={
                    <StarBorderIcon
                      style={{
                        color: "rgba(255, 255, 255, 0.5)",
                        fontSize: "inherit",
                      }}
                    />
                  }
                />
                &nbsp;{media.vote_count} opiniões
              </Typography>
              <div style={{ display: "flex", margin: "12px 0" }}>
                <Typography marginRight={"10px"}>Quem viu:</Typography>
                <Avatar sx={{ width: "30px", height: "30px" }}>M</Avatar>
                <Avatar sx={{ width: "30px", height: "30px" }}>A</Avatar>
              </div>
            </Box>
            <BtnAdd
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={() => addMovieToCollection(media)}
            >
              Adicionar à coleção
            </BtnAdd>

            <BtnAdd
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={() => addMovieToWishList(media)}
            >
              Adicionar aos desejados
            </BtnAdd>
          </Infos>
        </Grid>
      </Grid>
    </ReactModal>
  );
};

export default ModalCardFilm;
