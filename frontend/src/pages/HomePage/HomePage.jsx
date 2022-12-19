import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link  } from "react-router-dom";
import './HomePage.css'
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import nuLogo from '../../Assets/numusic.png';
import ResultsTable from '../../components/ResultsTable/ResultsTable';
import 'bootstrap/dist/css/bootstrap.min.css';



const HomePage = ({artistResults, setArtistResults, setArtistInfo, setTrackResults, authToken, setAuthToken, authURL, token, user}) => {
  const [searchWord, setSearchWord] = useState("") //This will be the default state of the searchresults IF YOU HAVE THEM ON THE LANDING PAGE


  let navigate = useNavigate()
  const handleLogout = () => {
    setAuthToken("")
    window.localStorage.removeItem("spotifyKey")
    navigate("/", { replace: true });
  }
  
  async function fetchSearchResults() {
    let response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params: {
        q: searchWord,
        type: "artist,track"
      }
    })
    setArtistResults(response.data.artists.items.filter(el => el.images.length>0).map(artists => {
        return {
          id: artists.id,
          name: artists.name,
          artistImg: artists.images[0].url,
          genre: artists.genres[0]
      }
    }))
    setTrackResults(response.data.tracks.items) //.map(track => {
    //     return {
    //       id: artists.id,
    //       name: artists.name,
    //       artistImg: artists.images[0].url,
    //   }
    // }))
  }
  useEffect(() => {
    if(!searchWord) return
    fetchSearchResults();
  }, [searchWord]);
  
  // console.log(artistResults)
  return (
    <div>
        <b>
          <img src={nuLogo} alt="nuMusic" className="logo"/>
        </b>
      {! localStorage.getItem("spotifyKey") ?
          <a href={authURL} className="btn btn-success btn-lg">Login to Spotify</a> :
        <Stack>
          <span className="btn btn-success btn-lg" style={{maxWidth: "10rem"}}>
            <Button variant="Contained" onClick={handleLogout}>Logout</Button>
          </span>
            <SearchBar setSearchWord={setSearchWord}/>
          <span className="card-spacing">
            {artistResults.map((result, i) => {
              return (
                <ResultsTable result={result}
                key={i}
                setArtistInfo={setArtistInfo}
                token={token}
                user={user}/>
              );
            })}
          </span>
        </Stack> 
      }
    </div>
  );
};

export default HomePage;
