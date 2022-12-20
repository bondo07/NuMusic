import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navBar">
      <ul>
        <Stack className="nav-buttons" direction="row" spacing={55}>
          <Button variant="Contained" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button variant="Contained" onClick={() => navigate("/favorites")}>
            Favorites
          </Button>
          <Button variant="Contained" onClick={() => navigate("/top10artists")}>
            Top Artists
          </Button>
          <li>
            {user ? (
              <Button variant="contained" onClick={logoutUser}>
                Logout
              </Button>
            ) : (
              <Button variant="contained" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </li>
        </Stack>
      </ul>
    </nav>
  );
};

export default Navbar;
