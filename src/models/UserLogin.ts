//Para fazer a conexão da página de login com o back-end
interface UserLogin {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    token?:  string | null //o ponto de interrogação significa que é um campo opcional
}

export default UserLogin;