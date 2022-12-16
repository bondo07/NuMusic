import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";



const RelatedArtists = ({artistInfo, authToken, setArtistInfo, setArtistResults, artistResults, result}) => {

    let navigate = useNavigate();
    function handleSelect(e) {
        e.preventDefault();
        navigate("../searchresults", { replace: true });
        setArtistInfo(result)
    }

    return ( 
        <div>
            <Card sx={{width: 220, height: 300}} onClick={handleSelect}>
                <CardMedia component="img"
                    style={{ width: "220px", height: "125px", objectFit: "cover"}}
                    image={result.artistImage}
                    alt={result.name}/>
                <CardContent>
                    <Stack direction="row" spacing={25}>
                        <Typography  variant="h6" component="div">
                            {result.name}
                        </Typography>
                        <Typography variant="body2" component="text.secondary">
                            {result.genre}
                        </Typography>
                    </Stack>
                    <Button size="small" color="primary" >
                        Add To Favorites
                    </Button>
                </CardContent>
            </Card>
        </div>
     );
}
 
export default RelatedArtists;