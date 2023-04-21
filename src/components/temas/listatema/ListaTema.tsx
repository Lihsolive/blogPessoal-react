import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardActions, CardContent, Button, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import useLocalStorage from "react-use-localstorage";
import Tema from "../../../models/Tema";
import { busca } from "../../../services/Service";
import "./ListaTema.css";

function ListaTema() {
  const [temas, setTemas] = useState<Tema[]>([]); //temas são armazenados dentro de um array
  const [token, setToken] = useLocalStorage("token"); //para ter acesso ao token armazenado em localStorage e fazer uso dele no envio da requisição
  let history = useNavigate();

  useEffect(() => {//verifica se o usuário está logado, do contrário, não será possível fazer a listagem
    if (token == "") {
      alert("Você precisa estar logado!");
      history("/login");
    }
  }, [token]);

  async function getTema() {//listar temas
    await busca("/temas", setTemas, {
      //aguarda o método busca da Service
      headers: {
        'Authorization': token
      }
    });
  }

  //o useEffect será usado para chamar a função getTema
  useEffect(() => {
    getTema();
  }, [temas.length]); //sempre que a variável temas sofrer alguma alteração, será acionada a função getTema.

  return (
    <>
    {/*criando uma variável tema para mapear cada tema contido dentro da variável*/}
      {temas.map((tema) => ( 
      //map: percorre os ítens do array
          <Box m={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tema
                </Typography>
                <Typography variant="h5" component="h2">
                  {tema.descricao} {/* pega o tema dentro da variável tema e captura a descrição */}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>
                  <Link
                    to={`/formularioTema/ ${tema.id}`} //rota do front
                    className="text-decorator-none"
                  >
                    <Box mx={1}>
                      <Button
                        variant="contained"
                        className="marginLeft"
                        size="small"
                        color="primary"
                      >
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link
                    to={`/deletarTema/ ${tema.id}`}
                    className="text-decorator-none"
                  >
                    <Box mx={1}>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                      >
                        deletar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
        )
      )}
    </>
  );
}

export default ListaTema;
