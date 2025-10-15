import { Evento } from "./Evento"

export interface Lote {
    id: number;
    nome: string;
    dataInicio?: Date;
    dataFim?: Date;
    valor: number;
    quantidade: number;
    eventoId: number;
    evento: Evento;
}
