import { LoteDTO } from "./LoteDTO";
import { PalestranteDTO } from "./PalestranteDTO";
import { RedeSocialDTO } from "./RedeSocialDTO";

export interface EventoDTO {
  id: number;
  userID: number;
  local: string;
  dataEvento?: Date;
  tema: string;
  qtdPessoas: number;
  imagemURL: string;
  telefone: string;
  email: string;
  lotes: LoteDTO[];
  redesSociais: RedeSocialDTO[];
  palestrantes: PalestranteDTO[];
}
