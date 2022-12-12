// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import TopArtistsPage from "./pages/TopArtistsPage/TopArtistsPage";
import { useEffect, useState } from "react";

function App() {

  const [results, setResults] = useState([])
  const [artistInfo, setArtistInfo] = useState({})



  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            // <PrivateRoute>
              <HomePage results={results}
              setResults={setResults}
              setArtistInfo={setArtistInfo}/>
            // </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
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
