// 1. Importe os seus Enums
import { Titulo } from "./Enum/Titulo.enum";
import { Funcao } from "./Enum/Funcao.enum";

export interface User {
  id?: number; // IDs são muitas vezes opcionais no frontend
  primeiroNome: string;
  ultimoNome: string;
  titulo: Titulo;
  descricao: string;
  funcao: Funcao;
  imagemPerfil: string;
  password?: string; // Password é muitas vezes opcional

  // **** ADICIONE ESTAS DUAS LINHAS ****
  // (Para corresponder ao JSON da sua API / localStorage)
  userName: string;
  email: string;
}