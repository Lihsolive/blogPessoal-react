interface UserLogin {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    token?:  string | null //o ponto de interrogação significa que é um campo opcional
}

export default UserLogin;