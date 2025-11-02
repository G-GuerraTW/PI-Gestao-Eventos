export interface Ticket {
  id: number;
  idEvento: number;
  idUsuario: number;
  valorTicket: number;
  dataEntrada: Date;
  codigoTicket: string;
  statusTicket: string; // ou um enum, ex: "Ativo", "Usado"
}
