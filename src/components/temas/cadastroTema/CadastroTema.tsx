import React, { ChangeEvent, useState, useEffect } from "react";
import { Button, Container, Typography, TextField } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { buscaId, post, put } from "../../../services/Service";
import Tema from "../../../models/Tema";
import { TokenState } from "../../../store/tokens/tokensReducer";

import "./CadastroTema.css";

function CadastroTema() {
  let history = useNavigate();
  const { id } = useParams<{ id: string }>(); //useParams - identifica e captura umaa informação enviada pela URL. No caso, o id
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  const [tema, setTema] = useState<Tema>({
    id: 0, //apesar de ser auto_increment, é necessário começar com um número, pois é um campo obrigatório. O back end depois irá sobrepor esse valor, pois é sua responsabilidade
    descricao: "",
  });

  useEffect(() => {
    //verifica se o usuário está logado
    if (token === "") {
      alert("Você precisa estar logado");
      history("/login");
    }
  }, [token]);

  //monitora o id
  useEffect(() => {
    if (id !== undefined) {
      //verifica se há um id ou não
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    await buscaId(`/temas/${id}`, setTema, {
      //rota da service (back end)
      headers: {
        Authorization: token,
      },
    });
  }

  function updatedTema(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema, // percorre todo o array e altera apenas o campo especificado
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      try {
        await put(`/temas`, tema, setTema, {
          headers: {
            Authorization: token,
          },
        });

        alert("Tema atualizado com sucesso");
      } catch (error) {
        console.log(`Error: ${error}`);
        alert("Erro, por favor verifique a quantidade mímima de caracteres!");
      }
    } else {
      try {
        await post(`/temas`, tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        alert("Tema cadastrado com sucesso");
      } catch (error) {
        console.log(`Error: $(error)`);
        alert("Erro, por vafor verifique a quantidade mímima de caracteres!");
      }
    }
    back();
  }

  function back() {
    history("/temas");
  }

  return (
    <Container maxWidth="sm" className="container-cadastro">
      <form onSubmit={onSubmit}>
        <Typography
          variant="h3"
          color="textSecondary"
          component="h1"
          align="center"
        >
          Formulário de cadastro tema
        </Typography>
        <TextField
          value={tema.descricao}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)}
          id="descricao"
          label="descricao"
          variant="outlined"
          name="descricao"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Finalizar
        </Button>
      </form>
    </Container>
  );
}

export default CadastroTema;
