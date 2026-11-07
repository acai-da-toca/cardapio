// Formas de pagamento aceitas na loja — usado no passo final antes do WhatsApp.

export interface FormaPagamento {
  id: string;
  nome: string;
}

export const FORMAS_PAGAMENTO: FormaPagamento[] = [
  { id: 'pix', nome: 'Pix' },
  { id: 'dinheiro', nome: 'Dinheiro' },
  { id: 'cartao', nome: 'Cartão' },
];
