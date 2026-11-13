// Dados do cardápio "Monte seu Açaí".
// Centralizados aqui para facilitar manutenção de preços e itens.

export type ItemCategoria =
  | 'fruta'
  | 'cobertura'
  | 'acompanhamento'
  | 'sorvete'
  | 'adicional';

export interface TamanhoAcai {
  id: string;
  volume: string;
  preco: number;
  // Regras de quantas escolhas o tamanho permite
  coberturas: number;
  acompanhamentos: number;
  frutas: number;
}

export interface OpcaoTrufado {
  id: string;
  nome: string;
}

export const TAMANHOS: TamanhoAcai[] = [
  { id: '330', volume: '330ml', preco: 15.99, coberturas: 1, acompanhamentos: 2, frutas: 1 },
  { id: '440', volume: '440ml', preco: 18.99, coberturas: 1, acompanhamentos: 2, frutas: 2 },
  { id: '550', volume: '550ml', preco: 22.99, coberturas: 2, acompanhamentos: 4, frutas: 2 },
  { id: '770', volume: '770ml', preco: 34.9, coberturas: 2, acompanhamentos: 4, frutas: 3 },
];

export const FRUTAS: string[] = ['Morango', 'Banana', 'Manga', 'Uva'];

export const COBERTURAS: string[] = [
  'Uva',
  'Morango',
  'Menta',
  'Chocolate',
  'Frutas vermelhas',
  'Chocolate meio amargo',
  'Chiclete',
];

export const ACOMPANHAMENTOS: string[] = [
  'Gotas de chocolate',
  'Amendoim',
  'Paçoca',
  'Granulado',
  'Leite condensado',
  'Creme de avelã',
  'Cereja',
  'Bis',
  'Chocobol',
  'Disquete',
  'Jujuba',
  'Creme de Leitinho',
  'Creme de Cookie',
  'Granola',
  'Leite em Pó',
  'Biscoito Look Wafer',
  'Nutella',
  'Ovomaltine',
];

// Sorvete é vendido por peso (kg), não por item — por isso não tem preço fixo
// aqui; o cliente escreve o que quer no campo de observação e a loja confirma
// o valor pelo WhatsApp. O mousse (adicional) já tem preço fixo por unidade.
export const SORVETES: string[] = [
  'Morango',
  'Ovomaltine',
  'Chocolate',
  'Pedacinho do Céu',
  'Maracujá Trufado',
  'Ninho Trufado',
  'Iogurte',
];

export const ADICIONAIS: string[] = ['Mousse Maracujá', 'Mousse Morango'];

export const COPO_TRUFADO: OpcaoTrufado[] = [
  { id: 'nutella', nome: 'Nutella' },
  { id: 'ovomaltine', nome: 'Ovomaltine' },
  { id: 'creme-leitinho', nome: 'Creme Leitinho' },
];

// Valores de adicionais
export const PRECO_ADICIONAL_ITEM = 3.0; // adicional por item extra (fruta/cobertura/acomp.)
export const PRECO_TRUFADO = 5.0; // adicional do copo trufado
export const PRECO_MOUSSE = 3.0; // cada mousse (adicional)

export function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
