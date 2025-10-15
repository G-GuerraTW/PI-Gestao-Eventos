import { Lote } from "./Lote";
import { Palestrante } from "./Palestrante";
import { RedeSocial } from "./RedeSocial";

export interface Evento 
{
    //Propriedades da entidade
    id: number;
    local: string;
    tema: string;
    dataEvento?: Date;
    qtdPessoas: number;
    imagemURL: string;
    telefone: string;
    email: string;

    //Propriedades Relacionais
    lotes: Lote[];
    redeSociais: RedeSocial[];
    palestrantes: Palestrante[];

    //Propriedades do Usuario
    userId: number;
}
