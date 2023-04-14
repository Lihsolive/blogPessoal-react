import React from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <Grid className="container" container direction="row" justifyContent="center" alignItems="center">
      <Grid className="container-form" alignItems="center" xs={6}>
        <Box className="container-inputs" paddingX={20}>
          <form>
            <Typography className="titulo-form" variant="h3" gutterBottom component="h3" align="center">
              Entrar
            </Typography>
            <TextField id="usuario" label="usuário" variant="outlined" name="usuario" margin="normal" fullWidth />
            <TextField id="senha" label="senha" variant="outlined" name="senha" margin="normal" type="password" fullWidth />
            <Box marginTop={2} textAlign="center">
              <Link to="/home" className="link-login">
                <Button className="botao-enviar" type="submit" variant="contained">
                  Logar
                </Button>
              </Link>
            </Box>
          </form>
          <Box display="flex" justifyContent="center" marginTop={3}>
            <Box marginRight={1}>
              <Typography variant="subtitle1" gutterBottom align="center" className="legenda-login">
                Não tem uma conta?
              </Typography>
            </Box>
            <Typography variant="subtitle1" gutterBottom align="center" className="legenda-cadastrar" >
              Cadastre-se
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid xs={5} className="img">
      <img className="img-principal" src="./src/assets/astronauta.png" alt="" />
      </Grid>
    </Grid>
  );
}
export default Login;
