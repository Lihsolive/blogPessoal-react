import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { api } from "../../services/Service";
import UserLogin from "../../models/UserLogin";
import "./Login.css";

function Login() {
  let history = useNavigate();
  
  const [token, setToken] = useLocalStorage("token");
  const [userLogin, setUserLogin] = useState<UserLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    //função para atualizar a model de acordo com os dados digitados no input pelo usuário. Toda vez que o usuário digitar algo no input, essa função será acionada
    setUserLogin({
      ...userLogin, //spread Operator (...) - faz uma desestruturação, ou seja, espalha todos os atributos  que tem dentro de userLogin para dentro da função setUserLogin
      [e.target.name]: e.target.value,
      //[e.target.name]: nome da propriedade para identificar qual é o campo
      //e.target.value: pega o valor digitado
    });
  }

  useEffect(()=>{
    if(token != ''){
        history('/home')
    }
}, [token])

  // HTMLInputElement - observa os campos de input
  // HTMLFormElement - observa todo o formulário
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault(); //impede que o botão atualize a tela e dados sejam perdidos
    try {
      const resposta = await api.post(`/usuarios/logar`, userLogin);
      setToken(resposta.data.token);
      alert("Usuário logado com sucesso!");
    } catch (error) {
      alert("Dados inálidos. Erro ao logar!");
    }
  }

  return (
    <Grid className="container" container direction="row" justifyContent="center" alignItems="center">
      <Grid className="container-form" alignItems="center" xs={6}>
        <Box className="container-inputs" paddingX={20}>
          <form onSubmit={onSubmit}>
            <Typography className="titulo-login" variant="h3" gutterBottom component="h3" align="center">
              Login
            </Typography>
            <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label="usuário" variant="outlined" name="usuario" margin="normal" />
            <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label="senha" variant="outlined" name="senha" margin="normal" type="password" fullWidth/>
            <Box marginTop={2} textAlign="center">
              {/* <Link to="/home" className="link-login"> */}
              <Button className="btn-enviar" type="submit" variant="contained">
                Logar
              </Button>
              {/* </Link> */}
            </Box>
          </form>
          <Box display="flex" justifyContent="center" marginTop={3}>
            <Box marginRight={1}>
              <Typography variant="subtitle1" gutterBottom align="center" className="legenda-login" >
                Não tem uma conta?
              </Typography>
            </Box>
            <Link to="/cadastrousuario">
              <Typography variant="subtitle1" gutterBottom align="center" className="legenda-cadastrar" >
                Cadastre-se
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid xs={5} className="img">
        <img className="img-login" src="./src/assets/astronauta.png" alt="" />
      </Grid>
    </Grid>
  );
}
export default Login;
