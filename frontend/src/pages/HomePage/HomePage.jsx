import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import './HomePage.css'
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";




const HomePage = ({results, setResults, setArtistInfo}) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [searchWord, setSearchWord] = useState("")

  async function fetchSearchResults() {
    let repsone = await axios.get(
      ``
    )
  }
  // const [cars, setCars] = useState([]);

  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       setCars(response.data);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   };
  //   fetchCars();
  // }, [token]);
  return (
    <div>
      <h1>Home Page for {user.username}!</h1>
      <div className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <b>nuMusic</b>
          </Link>
          <SearchBar setSearchWord={setSearchWord}/>
        </div>
    </div>
  );
};

export default HomePage;
