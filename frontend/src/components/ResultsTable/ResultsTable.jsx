import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ResultsTable.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack, Box } from "@mui/material";
import AddToFavoritesButton from "../AddToFavoritesButton/AddToFavoritesButton";
import UpVoteButton from "../UpVoteButton/UpVoteButton";

const ResultsTable = ({ result, setArtistInfo, token, user }) => {
  let navigate = useNavigate();

  function handleSelection(e) {
    e.preventDefault();
    navigate("../searchresults", { replace: true });
    setArtistInfo(result);
  }

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
      <Box
        sx={{ "& > :not(style)": { m: 1 } }}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <AddToFavoritesButton user={user} token={token} result={result} />
        <UpVoteButton token={token} result={result} user={user} />
      </Box>
    </div>
  );
};

export default ResultsTable;
