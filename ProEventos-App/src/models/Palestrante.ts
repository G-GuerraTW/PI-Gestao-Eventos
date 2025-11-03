export interface Palestrante {
    id: string;
    titulo: string;
    userName: string;
    primeiroNome: string;
    ultimoNome: string;
    email: string;
    phoneNumber: string | null;
    funcao: string;
    descricao: string | null;
    password?: string | null;
}