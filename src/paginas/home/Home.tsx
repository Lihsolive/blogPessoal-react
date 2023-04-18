import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import "./Home.css";

function Home() {
  return (
    <>
      <Grid className="container-principal" container direction="row" justifyContent="center" alignItems="center" >
        <Grid alignItems="center" item xs={6}>
          {/* xs={} - corresponde a largura da tela. xs uma tela extremamente pequena, md, média e xl extremamente grande. No grid, a tela tem um total de 12. Dois grids xs{6}, significa que a tela será divida pela metade para os dois grids.  
          - xs, extra-pequeno: 0px
          - sm, pequeno: 600px
          - md, médio: 960px
          - lg, grande: 1280px
          - xl, extra-grande: 1920px
        */}
          <Box paddingX={20}>
            <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" style={{ color: "white", fontWeight: "bold" }}>
              Seja bem vindo(a)!
            </Typography>
            <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" style={{ color: "white", fontWeight: "bold" }}>
              expresse aqui os seus pensamentos e opiniões!
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}></Box>
            <Button className="botao-principal" variant="outlined" >
              Ver Postagens
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <img className="img-principal" src="./src/assets/astronauta.png" alt="" />
        </Grid>
        <Grid xs={12} className="postagens" ></Grid>
      </Grid>
    </>
  );
}

export default Home;
