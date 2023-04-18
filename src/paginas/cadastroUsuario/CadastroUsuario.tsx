import React , {useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import {Box} from '@mui/material';
import { Link } from 'react-router-dom';
import './CadastroUsuario.css';

function CadastroUsuario() {

  let history = useNavigate();
  const [confirmarSenha,setConfirmarSenha] = useState<String>("") //1º state -verifica se o valor do campo senha é igual ao valor do campo confirmar senha
  const [user, setUser] = useState<User>( //2º state - contém as informações que serão enviadas para cadastro
      {
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: ""
      })

  const [userResult, setUserResult] = useState<User>( //3º state - armazena os valores do retorno da API
      {
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: ""
      })

  useEffect(() => { //é acionado após o envio das informações
      if (userResult.id != 0) {//se o id for diferente de 0, a função redireciona para a tela de login, pois entende que foi concluido um cadastro com informações reais e não mais as informações padrões
          history("/login") 
      }
  }, [userResult])


  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){ 
      setConfirmarSenha(e.target.value) //armazena o valor digitado no campo confirmarSenha
  }

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {

      setUser({
          ...user,
          [e.target.name]: e.target.value
      })

  }
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault() //previne o comportamento padrão do botão para não atualizar a tela
      if(confirmarSenha == user.senha){ //compara os campos confirmarSenha e senha
      cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
      alert('Usuario cadastrado com sucesso')
      }else{
          alert('Dados inválidos. Favor verificar as informações de cadastro.')
      }
  }

  return (
    <Grid className="container-cadastro" container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={5} className="img-cadastro">
        <img className="img-cadastro" src="./src/assets/astronauta.png" alt="" />
      </Grid>
      <Grid item xs={5} alignItems="center">
        <Box>
          <form onSubmit={onSubmit}>
            <Typography className="titulo-cadastro" variant="h3" gutterBottom component="h3" align="center" >
              Entrar
            </Typography>
            <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="nome" label="Nome" variant="outlined" name="eome" margin="normal" fullWidth />
            <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="email" label="Email" variant="outlined" name="email" margin="normal"fullWidth />
            <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senhaCadastro" label="Senha" variant="outlined" name="senha" margin="normal"  type="password" fullWidth />
            <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id="confirmarSenha" label="Confirmar Senha" variant="outlined" name="confirmarSenha" margin="normal" type="password" fullWidth />
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