import { Funcao } from "./Enum/Funcao.enum"
import { Titulo } from "./Enum/Titulo.enum"

export interface User {
    primeiroNome: string;
    ultimoNome: string;
    titulo: Titulo;
    descricao: string;
    funcao: Funcao;
    imagemPerfil: string;
}
