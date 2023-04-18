import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { login } from "../../services/Service";
import UserLogin from "../../models/UserLogin";
import "./Login.css";

function Login() {
  let history = useNavigate(); //redireciona o usuário para uma determinada página
  
  //useLocalStorage - armazenamento local - armazena uma informação, no caso o token, no navegador em Local Storage. 
  const [token, setToken] = useLocalStorage("token"); 
  //const [token, setToken] - imutabilidade - é uma função Hook cujo objetivo é criar uma nova versão da variável com outras informações, sem alterar a variável raiz.
  const [userLogin, setUserLogin] = useState<UserLogin>({ //useState - observa o estado da variável. Exemplo, se estava vazio e de repente recebe uma informação. Irá renderizar as alterações
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

  useEffect(()=>{ //useEffect - executa uma função sempre que uma variável sobre uma alteração
    if(token != ''){ //se o token for diferente de vazio
        history('/home') //haverá o redirecionamento para a página home
    }
}, [token]) //se esse array - [token] - for modificado, o useEffect é acionado

                                        //HTMLInputElement - observa os campos de input
                                        //HTMLFormElement - observa todo o formulário
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault(); //impede que o botão atualize a tela e dados sejam perdidos
    try {
      await login(`/usuarios/logar`, userLogin, setToken); //espera a função login(Service) finalizar
                                                //setToken -> setDado(Service)

      alert("Usuário logado com sucesso!");
    } catch (error) {
      alert("Dados inálidos. Erro ao logar!");
    }
  }

  return (
    <Grid className="container" container direction="row" justifyContent="center" alignItems="center">
      <Grid className="container-form-login" alignItems="center" xs={6}>
        <Box className="container-inputs" paddingX={20}>
          <form onSubmit={onSubmit}>
            <Typography className="titulo-login" variant="h3" gutterBottom component="h3" align="center">
              Login
            </Typography>
            <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label="usuário" variant="outlined" name="usuario" margin="normal"  fullWidth/>
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
      <Grid xs={5} alignItems="center" className="img">
        <img className="img-login" src="./src/assets/naveEspacial.svg" alt="" />
      </Grid>
    </Grid>
  );
}
export default Login;
