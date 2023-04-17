import React from "react";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./CadastroUsuario.css";

function CadastroUsuario() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={6} className="img-cadastro">
        <img className="img-cadastro" src="./src/assets/astronauta.png" alt="" />
      </Grid>
      <Grid item xs={6} alignItems="center">
        <Box>
          <form>
            <Typography className="titulo-cadastro" variant="h3" gutterBottom component="h3" align="center" >
              Entrar
            </Typography>
            <TextField id="nome" label="Nome" variant="outlined" name="eome" margin="normal" fullWidth />
            <TextField id="email" label="Email" variant="outlined" name="email" margin="normal"fullWidth />
            <TextField id="senhaCadastro" label="Senha" variant="outlined" name="senha" margin="normal"  type="password" fullWidth />
            <TextField id="confirmarSenha" label="Confirmar Senha" variant="outlined" name="confirmarSenha" margin="normal" type="password" fullWidth />
            <Box marginTop={2} textAlign="center">
              <Link to="/login" className="link-login-cadastro">
                <Button className="btn-cancelar" variant="contained" >
                  Cancelar
                </Button>
              </Link>
                <Button className="btn-cadastrar" type="submit" variant="contained" >
                  Cadastrar
                </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
export default CadastroUsuario;
