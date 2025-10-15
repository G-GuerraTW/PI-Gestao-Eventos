import { Evento } from "./Evento";
import { RedeSocial } from "./RedeSocial"
import { User } from "./User"

export interface Palestrante {
    id: number;
    nome: string;
    miniCurriculo: string;
    userId: number;
    user: User;
    redeSocial: RedeSocial[];
    eventoPalestrante: Evento[];
}
