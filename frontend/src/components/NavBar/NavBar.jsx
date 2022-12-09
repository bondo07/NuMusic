import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <div className="navBar">
      <ul>
        <Stack className="nav-buttons">
          <span>
            <Button variant='Contained' onClick={() => navigate("/")}>Home</Button>
          </span>
          <span>
            <Button variant='Contained' onClick={() => navigate("/favorites")}>Favorites</Button>
          </span>
          <span>
            <Button variant='Contained' onClick={() => navigate("/top10artists")}>Top Artists This Week</Button>
          </span>
          <li>
            {user ? (
              <Button variant='contained' onClick={logoutUser}>Logout</Button>
            ) : (
              <Button variant='contained' onClick={() => navigate("/login")}>Login</Button>
            )}
          </li>
        </Stack>
      </ul>
    </div>
  );
};

export default Navbar;
