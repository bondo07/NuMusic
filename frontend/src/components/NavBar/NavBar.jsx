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
        <Stack>
          <li>
            <Button variant='Contained' onClick={() => navigate("/")}>Home</Button>
            <Button variant='Contained' onClick={() => navigate("/favorites")}>Favorites</Button>
            <Button variant='Contained'>Top 10 Weekly Artists!</Button>
          </li>
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
