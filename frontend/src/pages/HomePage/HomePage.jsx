import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link  } from "react-router-dom";
import './HomePage.css'
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';





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
    let token = window.localStorage.getItem('token')  //This retrieves the auth token from local storage

    if(localHash.includes("=")) {
      let apiKey = localHash.substring(1).split("&").find(e => e.startsWith("access_token")).split("=")[1] // This separates the url with token info and pulls the necessary info
      window.location.hash = ""
      window.localStorage.setItem("spotifyKey", apiKey)
    }
    setAuthToken(token)
    console.log(token)
  }, [])

  let navigate = useNavigate()
  const handleLogout = () => {
    setAuthToken("")
    window.localStorage.removeItem("token")
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
    setResults(response.data)
    console.log(response.data.artists.items[0])
  }
  useEffect(() => {
    fetchSearchResults();
  }, [searchWord]);

  return (
    <div>
      <div className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <h1>nuMusic</h1>
          </Link>
          
              <a href={authURL}>Login to Spotify</a> 
            <Stack>
              <span>
                <Button variant="Contained" onClick={handleLogout}>Logout</Button>
              </span>
                <SearchBar setSearchWord={setSearchWord}/>
            </Stack> 
        
        </div>
    </div>
  );
};

export default HomePage;
