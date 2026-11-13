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
  { id: '330', volume: '330ml', preco: 16.0, coberturas: 1, acompanhamentos: 4, frutas: 1 },
  { id: '440', volume: '440ml', preco: 19.0, coberturas: 1, acompanhamentos: 5, frutas: 2 },
  { id: '550', volume: '550ml', preco: 23.0, coberturas: 2, acompanhamentos: 6, frutas: 2 },
  { id: '770', volume: '770ml', preco: 35.0, coberturas: 2, acompanhamentos: 7, frutas: 3 },
];

// Tamanhos do sorvete self-service — próprios, diferentes do açaí. Coberturas
// e frutas não foram informadas pela Camila; usei 1/2 como ponto de partida
// (confirmar depois).
export const TAMANHOS_SORVETE: TamanhoAcai[] = [
  { id: 'sorvete-300', volume: '300ml', preco: 18.0, coberturas: 1, acompanhamentos: 3, frutas: 1 },
  { id: 'sorvete-500', volume: '500ml', preco: 28.0, coberturas: 2, acompanhamentos: 4, frutas: 2 },
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

// Usado quando o cliente quer uma bola de sorvete por cima do açaí (vendida
// por peso, R$59,99/kg — o cliente diz quanto quer gastar e a loja pesa pra
// bater com esse valor). O sorvete como produto principal tem tamanho fixo,
// ver TAMANHOS_SORVETE.
export const PRECO_SORVETE_KG = 59.99;

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
export const PRECO_ACAI_ZERO = 5.0; // adicional do açaí zero

export function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
