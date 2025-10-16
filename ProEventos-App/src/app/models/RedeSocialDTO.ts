type NewType = unknown;

export interface RedeSocialDTO {
  id: number;
  nome: string;
  url: string;
  eventoId?: number;
  evento?: unknown; // opcional para referência ao EventoDTO
  palestranteId?: number;
  palestrante?: NewType; // opcional para referência ao PalestranteDTO
}
