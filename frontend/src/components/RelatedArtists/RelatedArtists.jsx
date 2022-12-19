import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Stack, Box, Fab, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import './RelatedArtists.css'



const RelatedArtists = ({artistInfo, authToken, setArtistInfo, setArtistResults, artistResults, result}) => {

    let navigate = useNavigate();
    function handleSelect(e) {
        e.preventDefault();
        navigate("../searchresults", { replace: true });
        setArtistInfo(result)
    }
    return ( 
        <div>
            <Card sx={{width: 350, height: 350, marginTop: "12px"}} onClick={handleSelect}>
                <CardMedia component="img"
                    style={{ width: "350px", height: "250px", objectFit: "cover"}}
                    image={result.artistImg}
                    alt={result.name}/>
                <CardContent>
                    <Stack direction="row" justifyContent={"space-between"}>
                        <Typography  variant="h6" component="div">
                            {result.name}
                        </Typography>
                        <Typography variant="body2" component="text.secondary">
                            {result.genre}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
                <Box sx={{ '& > :not(style)': { m: 1 } }} style={{display: "flex", justifyContent: "space-between"}}>
                    <Tooltip title="Add to Favorites" placement="right-start">
                        <Fab size="small" style={{backgroundColor: "#8e8cdd", color: "white"}} aria-label="add">
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
}
 
export default RelatedArtists;