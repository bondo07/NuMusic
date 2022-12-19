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
  Tabs,
  Tab,
  Box,
  Typography,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import "./FavoritesPage.css";

const Panel = (props) => (
  <div hidden={props.value !== props.index}>
    {props.value === props.index && <div>{props.children}</div>}
  </div>
)


const FavoritesPage = ({ user, token, authToken }) => {

  const [upvotedArtist, setUpvotedArtist] = useState([])
  const [favArtist, setFavArtist] = useState([]);
  const [test, setTest] = useState([]);

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
      let userUpvoted=response.data.map((favorite) => {
          let artistID = favorite.artist.artist_api_id;
          return {
            artistId: artistID,
          };
        })
      await axios
        .get(
          `https://api.spotify.com/v1/artists?ids=${userUpvoted.map(
            (artist) => {
              return artist.artistId;
            }
          )}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => {
          setFavArtist(response.data.artists);
        });
    } catch (error) {
      console.log(error.message);
    }
  }
  
  async function getUserUpvotedArtists() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/upvotedartists/${user.id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let userUpvoted=response.data.map((upvotedArtist) => {
          let artistID = upvotedArtist.artist.artist_api_id;
          return {
            artistId: artistID,
            artistUpvotes: upvotedArtist.artist.upvotes
          };
        })
      let testUpvotes = response.data.map((upvotedArtist) => {
        let artistUpvotes = upvotedArtist.artist.upvotes;
        return {
          artistUpvotes: artistUpvotes,
        };
      })
        setTest(testUpvotes)
      await axios
        .get(
          `https://api.spotify.com/v1/artists?ids=${userUpvoted.map(
            (artist) => {
              return artist.artistId;
            }
          )}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => {
          setUpvotedArtist(response.data.artists);
        });
    } catch (error) {
      console.log(error.message);
    }
  }
  // console.log(upvotedArtist)
  useEffect(() => {
    getUserFavorites();
    getUserUpvotedArtists();
  }, [user]);

  const [value, setValue] = useState(0)
  const handleChange = (e, newValue) => {
    setValue(newValue);
  }


  return (
    <div>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs centered aria-lable="Favorites Tabs" textColor={"primary" } value={value} onChange={handleChange}>
          <Tab wrapped label="My Favorite Artists" style={{backgroundColor: '#8d8ec7'}} icon={<FavoriteIcon/>} iconPosition="start"/>
          <Tab wrapped label="My Upvoted Artists" style={{backgroundColor: '#8d8ec7'}} icon={<StarIcon/>} iconPosition="start"/>
        </Tabs>
      </Box>
      <Panel value={value} index={0}>
        {favArtist.length > 0 ? (
          <div className="fav-position">
            <div className="user-name">{user.first_name}'s Favorite Artists!</div>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: "35rem", width: "50vw" }}
            >
              <Table aria-label="simple-table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>{null}</TableCell>
                    <TableCell align="center">Artist</TableCell>
                    <TableCell align="center">Genre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {favArtist.map((artist, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <img src={artist.images[2].url} alt="track album img" />
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "20px" }}>
                        {artist.name}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "20px" }}>
                        {artist.genres[0]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div className="user-name">View Your Favorite Artists Here!</div>
          )}
      </Panel>
      <Panel value={value} index={1}>
        {upvotedArtist.length > 0 ? (
            <div className="fav-position">
              <div className="user-name">{user.first_name}'s Upvoted Artists!</div>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: "35rem", width: "50vw" }}
              >
                <Table aria-label="simple-table" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>{null}</TableCell>
                      <TableCell align="center">Artist</TableCell>
                      <TableCell align="center">Genre</TableCell>
                      <TableCell align="center">Upvotes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {upvotedArtist.map((artist) => (
                      <TableRow
                        key={artist.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell>
                          <img src={artist.images[2].url} alt="track album img" />
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: "20px" }}>
                          {artist.name}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: "20px" }}>
                          {artist.genres[0]}
                        </TableCell>
                        {/* <TableCell align="center" sx={{ fontSize: "20px" }}>
                          {test.map((artist) => {
                            return artist.artistUpvotes
                          })}
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <div className="user-name">View Your Upvoted Artists Here!</div>
            )}
      </Panel>

    </div>
  );
};

export default FavoritesPage;
