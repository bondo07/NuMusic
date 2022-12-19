import axios from "axios";
import { Box, Tooltip, Fab, Slide, Snackbar} from "@mui/material";
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import { useState } from "react";



const UpVoteButton = ({token, result, user}) => {

    async function upVoteArtist() {
        try {
          let newArtist = {
            artist_api_id: result.id,
            artist_name: result.name,
            upvotes: 0
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
          let upvotedArtist = {
            artist_id: response.data.id,
            user_id: user.id
          }
          await axios.post(`http://127.0.0.1:8000/api/upvotedartists/`, upvotedArtist, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
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