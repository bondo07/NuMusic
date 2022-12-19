import axios from "axios";
import { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import './FavoritesPage.css'

const FavoritesPage = ({ user, token, authToken }) => {
  const [userFavorites, setUserFavorites] = useState([]);
  const [favArtist, setFavArtist] = useState([]);

  async function getUserFavorites() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/favorites/${user.id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserFavorites(
        response.data.map(favorite => {
            let artistID = favorite.artist.artist_api_id
            return {
                artistId: artistID            
        }})
    );
      await axios.get(`https://api.spotify.com/v1/artists?ids=${userFavorites.map(artist => {
        return(artist.artistId)
      })}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
      }).then(response => {
          setFavArtist(response.data.artists)
        })
    } catch (error) {
      console.log(error.message);
    }
  }

    useEffect(() => {
        getUserFavorites();
    }, [user]);
  return (
    <div>
      <div className="user-name">{user.first_name}'s Favorite Artists!</div>
                <TableContainer component={Paper} sx={{maxHeight: '35rem', width: '50vw'}}>
                    <Table aria-label="simple-table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>{null}</TableCell>
                                <TableCell align="center">Artist</TableCell>
                                <TableCell align="center">Genre</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {favArtist.map((artist) => (
                                <TableRow key={artist.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell ><img src={artist.images[2].url} alt="track album img"/></TableCell>
                                    <TableCell align="center" sx={{fontSize: '20px'}}>{artist.name}</TableCell>
                                    <TableCell align="center" sx={{fontSize: '20px'}}>{artist.genres[0]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
    </div>
  )
};

export default FavoritesPage;
