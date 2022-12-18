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
            // console.log(favorite.artist.artist_api_id)
            let artistID = favorite.artist.artist_api_id;
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
      
    //   {
    //     userFavorites.map((artist) => {
    //       return (axios.get(
    //         `https://api.spotify.com/v1/artists/?ids=${artist.artistId}`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${authToken}`,
    //           },
    //         }
    //       )
    //         .then(artistResponse => {
    //          setFavArtist(artistResponse.data)
    //       }));
    //     });
    //   }
    } catch (error) {
      console.log(error.message);
    }
  }

//   async function getFavArtist() {
//         userFavorites.map(artist => {
//             axios.get(`https://api.spotify.com/v1/artists/${artist.artistId}`, {
//                 headers: {
//                     Authorization: `Bearer ${authToken}`
//                 }
//             }
//             )
//                 .then(response => {
//                     setFavArtist(response)
//                     return (response)
//                 })
//         })
//     } 

    useEffect(() => {
        if(!getUserFavorites())
        getUserFavorites();
        // getFavArtist();
    }, [user]);

  return (
    <div>
      <h6 className="text-muted">{} Top Songs</h6>
                <TableContainer component={Paper} sx={{maxHeight: '35rem', width: '100vw'}}>
                    <Table aria-label="simple-table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>{null}</TableCell>
                                <TableCell>Artist</TableCell>
                                <TableCell>Genre</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {favArtist.map((artist) => (
                                <TableRow key={artist.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell><img src={artist.images[2].url} alt="track album img"/></TableCell>
                                    <TableCell>{artist.name}</TableCell>
                                    <TableCell align="center">{artist.genres[0]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
    </div>
  );
};

export default FavoritesPage;
