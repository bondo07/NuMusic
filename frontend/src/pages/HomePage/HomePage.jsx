import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link  } from "react-router-dom";
import './HomePage.css'
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import nuLogo from '../../Assets/numusic.png';
import ResultsTable from '../../components/ResultsTable/ResultsTable';
import 'bootstrap/dist/css/bootstrap.min.css';






const HomePage = ({results, setResults, setArtistInfo}) => {
  const [user, token] = useAuth();
  const [searchWord, setSearchWord] = useState("") //This will be the default state of the searchresults IF YOU HAVE THEM ON THE LANDING PAGE
  const [authToken, setAuthToken] = useState("")

  
  const clientId = '0fd5af8b613d4d009f7a6f0f3238a61e'; //Client ID
  const authEndpoint = 'https://accounts.spotify.com/authorize'; // API Authentication
  const redirectURI = 'http://localhost:3000'; // Redirect URL
  const responseType = 'token'
  
  const authURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}`;

  useEffect(() => {
    const localHash = window.location.hash
    // let token = window.localStorage.getItem('token')  //This retrieves the auth token from local storage

    if(localHash.includes("=")) {
      let apiKey = localHash.substring(1).split("&").find(e => e.startsWith("access_token")).split("=")[1] // This separates the url with token info and pulls the necessary info
      window.location.hash = ""
      window.localStorage.setItem("spotifyKey", apiKey)
      setAuthToken(apiKey)
      // console.log(apiKey)
    }
  }, [])

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
        type: "artist"
      }
    })
    setResults(response.data.artists.items.filter(el => el.images.length>0).map(artists => {
        return {
          id: artists.id,
          name: artists.name,
          artistImg: artists.images[0].url,
      }
    }))
  }
  useEffect(() => {
    fetchSearchResults();
  }, [searchWord]);
  
  console.log(results)
  return (
    <div>
        <b>
          <img src={nuLogo} alt="nuMusic" className="logo"/>
        </b>
      {! localStorage.getItem("spotifyKey") ?
          <a href={authURL} className="btn btn-success btn-lg">Login to Spotify</a> :
        <Stack>
          <span>
            <Button variant="Contained" onClick={handleLogout}>Logout</Button>
          </span>
          <SearchBar setSearchWord={setSearchWord}/>
          <span className="card-spacing">
            {results.map((result, i) => {
              return (
                <ResultsTable result={result}
                key={i}
                setArtistInfo={setArtistInfo}/>
              );
            })}
          </span>
        </Stack> 
      }
    </div>
  );
};

export default HomePage;
