import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { login } from "../../services/Service";
import UserLogin from "../../models/UserLogin";
import { addToken } from "../../store/tokens/actions";

import "./Login.css";

function Login() {
  let history = useNavigate(); //redireciona o usuário para uma determinada página

  const dispatch = useDispatch(); //*

  const [token, setToken] = useState("");
  // const [token, setToken] = useLocalStorage("token");

  //const [token, setToken] - imutabilidade - é uma função Hook cujo objetivo é criar uma nova versão da variável com outras informações, sem alterar a variável raiz.
  const [userLogin, setUserLogin] = useState<UserLogin>({
    //useState - observa o estado da variável. Exemplo, se estava vazio e de repente recebe uma informação. Irá renderizar as alterações
    //userLogin = variável. É um objeto da classe UserLogin
    //setUserLogin = função que atualiza a variável
    id: 0,
    nome: "",
    usuario: "",
    senha: "", //para especificar os campos que userLogin terá
    foto: "",
    token: "",
  });

  //função para atualizar a model de acordo com os dados digitados no input pelo usuário. Toda vez que o usuário digitar algo no input, essa função será acionada
  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin, //spread Operator (...) - faz uma desestruturação, espalha os dados, ou seja, usado para não precisar reescrever o objeto
      [e.target.name]: e.target.value,
      //[e.target.name]: nome da propriedade para identificar qual é o campo
      //e.target.value: pega o valor digitado no campo
    });
  }

  useEffect(() => {
    //useEffect - executa uma função sempre que uma variável sobre uma alteração
    if (token != "") {
      //se o token for diferente de vazio
      dispatch(addToken(token));
      history("/home"); //haverá o redirecionamento para a página home
    }
  }, [token]); //se esse array - [token] - for modificado, o useEffect é acionado

  //HTMLInputElement - observa os campos de input
  //HTMLFormElement - observa todo o formulário
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault(); //impede que o botão atualize a tela e dados sejam perdidos
    try {
      await login(`/usuarios/logar`, userLogin, setToken); //espera a função login(Service) finalizar
      //setToken -> setDado(Service)
      toast.success("Usuário logado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
    } catch (error) {
      toast.error("Dados inálidos. Erro ao logar!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
    }
  }
  return (
    <Grid
      className="container"
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid className="container-form-login" alignItems="center" xs={12} md={6} xl={6} >
        <Box className="container-inputs" paddingX={20}>
          <form onSubmit={onSubmit}>
            <Typography
              className="titulo-login"
              variant="h3"
              gutterBottom
              component="h3"
              align="center"
            >
              Login
            </Typography>
            <TextField
              value={userLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="usuario"
              label="usuário"
              variant="outlined"
              name="usuario"
              margin="normal"
              fullWidth
            />
            <TextField
              value={userLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="senha"
              label="senha"
              variant="outlined"
              name="senha"
              margin="normal"
              type="password"
              fullWidth
            />
            <Box marginTop={2} textAlign="center">
              <Button className="btn-enviar" type="submit" variant="contained">
                Logar
              </Button>
            </Box>
          </form>
          <Box display="flex" justifyContent="center" marginTop={3}>
            <Box marginRight={1}>
              <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                className="legenda-login"
              >
                Não tem uma conta?
              </Typography>
            </Box>
            <Link to="/cadastrousuario">
              <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                className="legenda-cadastrar"
              >
                Cadastre-se
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid xs={6} md={6} xl={6} alignItems="center" className="img">
      <Typography
              className="titulo-img"
              variant="h3"
              gutterBottom
              component="h3"
              align="center"
            >
              Conecte-se para uma viagem incrível!!! 
            </Typography>
      <Box display="flex" justifyContent="center" marginTop={1} paddingX={5}>
        <img className="img-login" src="https://svgshare.com/i/sr3.svg" alt="" />
        </Box>
      </Grid>
    </Grid>
  );
}
export default Login;
