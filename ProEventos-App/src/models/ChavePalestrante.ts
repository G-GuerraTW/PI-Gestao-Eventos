export interface ChavePalestrante {
  id: number;
  chave: string;       // <-- Corrigido para "c" minúsculo
  utilizada: string; // <-- Corrigido para "u" minúsculo
  dataCriacao: Date;
  datauSO?: Date;
  userId: number;      // <-- Corrigido para "u" minúsculo
}
