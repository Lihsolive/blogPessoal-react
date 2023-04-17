import axios from "axios";

export const api = axios.create({
    baseURL: "https://blogpessoal-w6x8.onrender.com"
})

export const login = async(url, dados, setDado) => {
    const resposta = await api.post(url, dados)
    setDado(resposta.data)
}