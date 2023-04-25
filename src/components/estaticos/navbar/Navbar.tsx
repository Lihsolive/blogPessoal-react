import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import "./Navbar.css";

function Navbar() {
  const [token, setToken] = useLocalStorage('token')
  let history = useNavigate();

  function goLogout() {
    setToken('') //zera o valor do token
    alert("Usuário deslogado")
    history('/login')
  }

  return (
    <>
      <AppBar position="static" className="bg-menu">
        <Toolbar variant="dense" className="container-menu">
          <Box style={{ cursor: "pointer" }}>
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
              <Link to="/posts">
              <Box className="menu-item" mx={2}>
                <Typography variant="h6" color="inherit">
                  postagens
                </Typography>
              </Box>
              </Link>
              <Link to="/temas">
              <Box className="menu-item" mx={2}>
                <Typography variant="h6" color="inherit">
                  temas
                </Typography>
              </Box>
              </Link>
              <Link to="/formularioTema">
              <Box className="menu-item" mx={2}>
                <Typography variant="h6" color="inherit">
                  cadastrar tema
                </Typography>
              </Box>
              </Link>

                <Box className="menu-item" mx={2} onClick={goLogout}> 
                {/* chama a função goLogout */}
                  <Typography variant="h6" color="inherit">
                    logout
                  </Typography>
                </Box>

            </Box>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Navbar;
