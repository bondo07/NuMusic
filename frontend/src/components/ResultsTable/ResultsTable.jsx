import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ResultsTable.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import Tooltip from '@mui/material/Tooltip';
import axios from "axios";

const ResultsTable = ({ result, setArtistInfo, token, user }) => {

  let navigate = useNavigate();

  function handleSelection(e) {
    e.preventDefault();
    navigate("../searchresults", { replace: true });
    setArtistInfo(result);
  }

  async function addFavorite() {
    try {
      const newArtist = {
        artist_api_id: result.id,
        artist_name: result.name,
        upvotes: 0,
      };
      let newFavorite 
      let response = await axios.post(
        `http://127.0.0.1:8000/api/artists/add/`,
        newArtist,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
        );
        newFavorite = {
            artist_id: response.data.id,
            user_id: user.id
        }
      await axios.post(`http://127.0.0.1:8000/api/favorites/`, newFavorite, {
        headers: {
            Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error.message);
    }

  }

  // async function upvoteArtist()
  const handleAddFavorite = (e) => {
    e.preventDefault();
    addFavorite();
  };
  console.log(result.id)
  return (
    <div className="artist-card">
      <Card sx={{ width: 350, height: 350 }} onClick={handleSelection}>
        <CardMedia
          component="img"
          style={{ width: "350px", height: "250px", objectFit: "cover" }}
          image={result.artistImg}
          alt={result.name}
        />
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="div">
              {result.name}
            </Typography>
            <Typography variant="body2" component="text-secondary">
              {result.genre}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
        <Box sx={{ '& > :not(style)': { m: 1 } }} style={{display: "flex", justifyContent: "space-between"}}>
          <Tooltip title="Add to Favorites" placement="right-start">
            <Fab size="small" style={{backgroundColor: "#8e8cdd", color: "white"}} aria-label="add" onClick={handleAddFavorite}>
              <AddIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Upvote This Artist!" placement="right-start">
            <Fab size="small" style={{backgroundColor: "rgb(195 189 15)", color: "rgb(79 79 147"}}>
              <ThumbUpAltTwoToneIcon />
            </Fab>
          </Tooltip>
        </Box>
    </div>
  );
};

export default ResultsTable;
