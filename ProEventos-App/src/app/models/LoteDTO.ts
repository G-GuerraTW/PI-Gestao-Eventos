export interface LoteDTO {
  id: number;
  nome: string;
  preco: number;
  dataInicio: string; // você pode usar Date se quiser
  dataFim: string;    // idem
  quantidade: number;
  eventoId: number;
}
