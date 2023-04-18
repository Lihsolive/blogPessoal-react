import axios from "axios";

export const api = axios.create({
    baseURL: "https://blogpessoal-w6x8.onrender.com/"
}) //está chamando a url será a api utilizada para realizar as requisições

export const cadastroUsuario = async(url:any, dados:any, setDado:any) => { 
    const resposta = await api.post(url, dados) 
    setDado(resposta.data) 
}

export const login = async(url:any, dados:any, setDado:any) => { //arrow function
    const resposta = await api.post(url, dados) //será a resposta
    setDado(resposta.data.token) 
} 
//any: significa que o tipo de informação pode ser qualquer um (string, number...)
//url: é o caminho do backend pra fazer o login (/usuarios/login)
//dados: é um objeto que terá as informações necessárias para logar 
// ("usuário": "string",
// "senha": "string")
//setDado(resposta.data.token) busca na resposta o token que tá dentro de data. Só retornará o token que houver usuário, do contrário dará erro


