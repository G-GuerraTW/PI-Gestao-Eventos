import { RedeSocialDTO } from "./RedeSocialDTO";

export interface PalestranteDTO {
  id: number;
  nome: string;
  miniCurriculo: string;
  userId: number;
  redesSociais?: RedeSocialDTO[];
  eventosPalestrantes?: unknown[];
}
