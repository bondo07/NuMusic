import axios from "axios";
import { Tooltip, Fab, Slide, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddToFavoritesButton = ({ user, token, result }) => {
  async function addFavorite() {
    try {
      const newArtist = {
        artist_api_id: result.id,
        artist_name: result.name,
        upvotes: 0,
      };
      let newFavorite;
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
        user_id: user.id,
      };
      await axios.post(`http://127.0.0.1:8000/api/favorites/`, newFavorite, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  const handleAddFavorite = (e) => {
    e.preventDefault();
    addFavorite();
  };

  const [open, setOpen] = useState(false);

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }
  const [transition, setTransition] = useState(undefined);

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  return (
    <div onClick={handleClick(TransitionUp)}>
      {user ? (
        <div>
          <Tooltip title="Add to Favorites" placement="right-start">
            <Fab
              size="small"
              style={{ backgroundColor: "#8e8cdd", color: "white" }}
              aria-label="add"
              onClick={handleAddFavorite}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
          <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={3000}
            TransitionComponent={transition}
            message="Added To Favorites!"
            key={transition ? transition.name : ""}
          />
        </div>
      ) : (
        <div>
          <Tooltip
            title="Please Login to Add to Favorites!"
            placement="right-start"
          >
            <Fab
              size="small"
              style={{ backgroundColor: "#8e8cdd", color: "white" }}
              aria-label="add"
              onClick={() => navigate("/login")}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
          <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={3000}
            TransitionComponent={transition}
            message="Please Login to Add to Favorites!"
            key={transition ? transition.name : ""}
          />
        </div>
      )}
    </div>
  );
};

export default AddToFavoritesButton;
