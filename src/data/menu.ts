// Dados do cardápio "Monte seu Açaí".
// Centralizados aqui para facilitar manutenção de preços e itens.

export type ItemCategoria = 'acompanhamento' | 'sorvete' | 'adicional';

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

// Frutas, coberturas e os antigos acompanhamentos agora são tudo uma lista
// só — a loja não separa mais por categoria, é tudo "acompanhamento".
export const ACOMPANHAMENTOS: string[] = [
  'Morango',
  'Banana',
  'Manga',
  'Uva',
  'Limão',
  // "Cobertura de X" pra não confundir com a fruta (ex.: Morango a fruta vs.
  // Cobertura de Morango a calda) — por isso Morango e Uva aparecem 2x.
  'Cobertura de Morango',
  'Cobertura de Uva',
  'Cobertura de Menta',
  'Cobertura de Chocolate',
  'Cobertura de Frutas Vermelhas',
  'Cobertura de Chocolate Meio Amargo',
  'Cobertura de Chiclete',
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

// Sorvete é vendido por peso, não por item — por isso não tem preço fixo
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
export const PRECO_ACAI_ZERO = 5.0; // adicional do açaí zero

export function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
