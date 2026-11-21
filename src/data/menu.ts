// Dados do cardápio "Monte seu Açaí".
// Centralizados aqui para facilitar manutenção de preços e itens.

export type ItemCategoria = 'acompanhamento' | 'adicional';

export interface TamanhoAcai {
  id: string;
  volume: string;
  preco: number;
  // Frutas, coberturas e acompanhamentos dividem a mesma cota — não são
  // limites separados. Esse número é o total combinado de itens inclusos.
  acompanhamentos: number;
}

export interface OpcaoTrufado {
  id: string;
  nome: string;
}

export const TAMANHOS: TamanhoAcai[] = [
  { id: '330', volume: '330ml', preco: 16.0, acompanhamentos: 4 },
  { id: '440', volume: '440ml', preco: 19.0, acompanhamentos: 5 },
  { id: '550', volume: '550ml', preco: 23.0, acompanhamentos: 6 },
  { id: '770', volume: '770ml', preco: 35.0, acompanhamentos: 7 },
];

// Tamanhos do sorvete self-service — próprios, diferentes do açaí.
export const TAMANHOS_SORVETE: TamanhoAcai[] = [
  { id: 'sorvete-300', volume: '300ml', preco: 18.0, acompanhamentos: 4 },
  { id: 'sorvete-500', volume: '500ml', preco: 28.0, acompanhamentos: 4 },
];

// Frutas, coberturas, sabores de sorvete e os antigos acompanhamentos agora
// são tudo uma lista só — a loja não separa mais por categoria, é tudo
// "acompanhamento".
export const ACOMPANHAMENTOS: string[] = [
  'Morango',
  'Banana',
  'Manga',
  'Uva',
  'Limão',
  'Menta',
  'Chocolate',
  'Frutas vermelhas',
  'Chocolate meio amargo',
  'Chiclete',
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
  'Pedacinho do Céu',
  'Maracujá Trufado',
  'Ninho Trufado',
  'Iogurte',
];

// Sorvete por cima do açaí é vendido por peso (R$59,99/kg). O cliente diz
// quantas gramas quer (até o volume do tamanho escolhido, em ml) e o sistema
// calcula o valor sozinho. O sorvete como produto principal tem tamanho
// fixo, ver TAMANHOS_SORVETE.
export const PRECO_SORVETE_KG = 59.99;

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
