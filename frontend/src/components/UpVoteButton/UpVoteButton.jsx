import axios from "axios";
import { Box, Tooltip, Fab, Slide, Snackbar} from "@mui/material";
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import { useState } from "react";



const UpVoteButton = ({token, result}) => {

    async function upVoteArtist() {
        try {
          const newArtist = {
            artist_api_id: result.id,
            artist_name: result.name,
            upvotes: 1
          };
          let response = await axios.post(
            `http://127.0.0.1:8000/api/artists/add/`,
            newArtist,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
            );
            let addArtistUpvote = {
              artist_api_id: result.id,
              artist_name: result.name,
              upvotes: response.data.upvotes + 1
          }
          await axios.put(`http://127.0.0.1:8000/api/artists/${response.data.id}/update/`, addArtistUpvote, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        } catch (error) {
          console.log(error.message);
        }
      }
    
    const handleUpVote = (e) => {
        e.preventDefault();
        upVoteArtist();
      };
    
    const [open, setOpen] = useState(false)

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
    }  
    
    return ( 
        <div onClick={handleClick(TransitionUp)}>
            <Tooltip title="Upvote This Artist!" placement="right-start">
                <Fab size="small" style={{backgroundColor: "rgb(195 189 15)", color: "rgb(79 79 147"}} onClick={handleUpVote}>
                    <ThumbUpAltTwoToneIcon />
                </Fab>
            </Tooltip>
            <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={3000}
            TransitionComponent={transition}
            message="Upvoted Artist!"
            key={transition ? transition.name : ''}
        />
        </div>
     );
}
 
export default UpVoteButton;