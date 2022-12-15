import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Card, Col, CardGroup } from "react-bootstrap";
import './ResultsTable.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Stack } from '@mui/material';
import axios from "axios";
import { ConstructionOutlined } from "@mui/icons-material";


const ResultsTable = ({result, setArtistInfo, token, user}) => {
    let navigate = useNavigate();

    function handleSelection(e) {
        e.preventDefault();
        navigate("../searchresults", {replace: true});
        setArtistInfo(result);
    }

    async function addFavorite() {
        const newFavorite = {
            artist_id: result.id,
            user_id: user.id,
        };
        try {
            await axios.post(`http://127.0.0.1:8000/api/favorites/`, 
            newFavorite,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        } catch (error) {
            console.log(error.message);
        }
    }
    // console.log(result)
    const handleAddFavorite = (e) => {
        e.preventDefault();
        addFavorite();
    }

    return ( 
        <div className="artist-card">
            <Card sx={{width: 420, height: 390}} onClick={handleSelection}>
                <CardMedia component="img"
                style={{ width: "420px", height: "250px", objectFit: "cover"}}
                image={result.artistImg}
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
                    <Button size="small" color="primary" onClick={handleAddFavorite}>
                        Add To Favorites
                    </Button>
                </CardContent>
            {/* <CardActions>
            </CardActions> */}
            </Card>
            {/* <CardGroup>
                <Card style={{ width: '18rem' }} border="success">
                    <Card.Img variant="top" src={result.artistImg} />
                    <Card.Body>
                        <Card.Title>
                            {result.name}
                        </Card.Title>
                    </Card.Body>
                </Card>
            </CardGroup> */}
        </div>
     );
}
 
export default ResultsTable;