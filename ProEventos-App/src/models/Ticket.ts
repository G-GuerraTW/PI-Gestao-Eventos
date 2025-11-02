// 1. Importe os modelos que vamos aninhar
import { Evento } from './Evento';
import { User } from './User'; // (Ou o nome da sua interface de User)

/**
 * Representa a estrutura do Bilhete (Ticket) devolvido pela API.
 */
export interface Ticket {
  id: number;
  idEvento: number;
  idUsuario: number;
  valorTicket: number;
  dataEntrada: Date;
  codigoTicket: string;
  statusTicket: boolean; // (false = Ativo, true = Usado)
  dataUso?: Date; // (Pode remover se não usou)

  // **** ADICIONE ESTAS DUAS LINHAS ****
  // O backend agora envia os objetos completos
  user: User;
  evento: Evento;
  // *************************************
}