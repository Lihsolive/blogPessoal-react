import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <AppBar position="static" className="bg-menu">
        <Toolbar variant="dense" className="container-menu">
          <Box style={{ cursor: "pointer" }}>
            {/* <Typography variant="h5" color="inherit">
              BlogPessoal
            </Typography> */}
            <img className="menu-logo" src="./src/assets/logo.svg" alt="Logo" />
          </Box>

          <div>
            <Box className="menu-links" display="flex">
              <Link to="/home" className="link-home">
                <Box className="menu-item" mx={2}>
                  <Typography variant="h6" color="inherit">
                    home
                  </Typography>
                </Box>
              </Link>
              <Box className="menu-item" mx={2}>
                <Typography variant="h6" color="inherit">
                  postagens
                </Typography>
              </Box>
              <Box className="menu-item" mx={2}>
                <Typography variant="h6" color="inherit">
                  temas
                </Typography>
              </Box>
              <Box className="menu-item" mx={2}>
                <Typography variant="h6" color="inherit">
                  cadastrar tema
                </Typography>
              </Box>
              <Link to="/login" className="link-logout">
                <Box className="menu-item" mx={2}>
                  <Typography variant="h6" color="inherit">
                    logout
                  </Typography>
                </Box>
              </Link>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Navbar;
