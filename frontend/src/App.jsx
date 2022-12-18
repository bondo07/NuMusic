// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import TopArtistsPage from "./pages/TopArtistsPage/TopArtistsPage";
import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";



function App() {

  const [artistResults, setArtistResults] = useState([])
  const [trackResults, setTrackResults] = useState([])
  const [artistInfo, setArtistInfo] = useState({})
  const [user, token] = useAuth();


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
    }
  }, [])




  // console.log(trackResults)
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            // <PrivateRoute>
              <HomePage artistResults={artistResults}
              setArtistResults={setArtistResults}
              setArtistInfo={setArtistInfo}
              setTrackResults={setTrackResults}
              authToken={authToken}
              setAuthToken={setAuthToken}
              authURL={authURL}
              token={token}
              user={user}/>
            // </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage user={user}
              token={token}
              authToken={authToken}/>
            </PrivateRoute>
          }
        />
        <Route
          path="/searchresults"
          element={
            <PrivateRoute>
              <SearchResultsPage artistInfo={artistInfo}
              setArtistInfo={setArtistInfo}
              authToken={authToken}
              setArtistResults={setArtistResults}
              artistResults={artistResults}/>
            </PrivateRoute>
          }
        />
        <Route
          path="/top10artists"
          element={
            <PrivateRoute>
              <TopArtistsPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
