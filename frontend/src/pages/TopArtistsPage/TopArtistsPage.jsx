import axios from "axios";
import { useEffect, useState } from "react";
import { Tabs, Tab, Avatar, Stack } from "@mui/material";
import ArtistAlbums from "../../components/ArtistAlbums/ArtistAlbums";
import ArtistTopTracks from "../../components/ArtistTopTracks/ArtistTopTracks";
import "./TopArtistsPage.css";

const Panel = (props) => (
  <div hidden={props.value !== props.index}>
    {props.value === props.index && <div>{props.children}</div>}
  </div>
);

const TopArtistsPage = ({ user, token, authToken }) => {
  const [topVotedArtists, setTopVotedArtists] = useState([]);
  async function getTopArtists() {
    const response = await axios.get(`http://127.0.0.1:8000/api/artists/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let newTopList = response.data.map((artist) => {
      return {
        id: artist.id,
        artist_name: artist.artist_name,
        spotify_id: artist.artist_api_id,
        upvotes: artist.upvotes,
      };
    });
    let top10Artists = newTopList
      .sort((a, b) => b.upvotes - a.upvotes)
      .splice(0, 10);
    await axios
      .get(
        `https://api.spotify.com/v1/artists?ids=${top10Artists.map((artist) => {
          return artist.spotify_id;
        })}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((artistResponse) => {
        setTopVotedArtists(artistResponse.data.artists);
      });
  }

  useEffect(() => {
    getTopArtists();
  }, []);

  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="top-artists">NuMusic's Top Weekly Artists!</div>
      <Tabs
        variant="fullWidth"
        aria-label="Top Artists Tabs"
        value={value}
        onChange={handleChange}
      >
        {topVotedArtists.map((artist) => (
          <Tab
            key={artist.id}
            label={artist.name}
            style={{ color: "white" }}
            icon={<img src={artist.images[2].url} alt="Artist" />}
          />
        ))}
      </Tabs>
      {topVotedArtists.map((artistInfo, i) => (
        <Panel value={value} index={i} key={artistInfo.id}>
          <Stack>
            <h data-text={artistInfo.name} className="top-artist-name">
              {artistInfo.name}
            </h>
            <div data-text={artistInfo.genres[0]} className="top-artist-genre">
              {artistInfo.genres[0]}
            </div>
          </Stack>
          <Stack direction="row" style={{ margin: "5rem" }} spacing={10}>
            <Avatar
              alt={artistInfo.name}
              src={artistInfo.images[0].url}
              style={{ width: "25rem", height: "25rem" }}
            />
            <ArtistTopTracks artistInfo={artistInfo} authToken={authToken} />
            <ArtistAlbums artistInfo={artistInfo} authToken={authToken} />
          </Stack>
        </Panel>
      ))}
    </div>
  );
};

export default TopArtistsPage;
