import axios from "axios";

export const api = axios.create({ //create - cria um objeto de configuração através do axios. O axios libera todos os seus métodos disponíveis para uso
    baseURL: "https://blogpessoal-w6x8.onrender.com/"
}) //está chamando a url será a api utilizada para realizar as requisições

//any: significa que a informação pode ser de qualquer tipo (string, number...)
export const cadastroUsuario = async(url:any, dados:any, setDado:any) => { 
    //url: é o caminho do backend pra fazer o login (/usuarios/login)
    const resposta = await api.post(url, dados) 
    setDado(resposta.data) 
}

export const login = async(url:any, dados:any, setDado:any) => { //arrow function
    //faz a requisição e aguarda a resposta
    const resposta = await api.post(url, dados) 
    setDado(resposta.data.token) //busca na resposta o token que tá dentro de data.
    //Só retornará o token se o usuário existir, do contrário dará erro.
} 
//dados: é um objeto que terá as informações necessárias para logar: 
// "usuário": "string",
// "senha": "string"

//função para listagem de postagem/temas
export const busca = async(url:any, setDado:any, header:any) => { 
    //header passa o token para autorizar a requisição de listagem 
    //O usuário só poderá listar postagens/temas se estiver autenticado
    const resposta = await api.get(url, header) //passa a rota e o token
    setDado(resposta.data) //retorna os dados e armazena dentro de resposta
} 

