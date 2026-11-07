// Cardápio do Açaí da Toca — fonte única de itens e preços.
// Para mudar algo no cardápio, edite apenas este arquivo.

/** Cor da bolinha de cada grupo de itens (a paleta fica no componente Chip). */
export type CorCategoria =
  | 'fruta'
  | 'cobertura'
  | 'complemento'
  | 'sorvete'
  | 'adicional'
  | 'sabor';

export type LinhaId = 'tradicional' | 'batida';

export type CategoriaId =
  | 'complementos'
  | 'coberturas'
  | 'frutas'
  | 'sorvetes'
  | 'adicionais';

export interface TamanhoPreco {
  id: string;
  volume: string;
  preco: number;
}

export interface LinhaAcai {
  id: LinhaId;
  nome: string;
  descricao: string;
  tamanhos: TamanhoPreco[];
  /** true = o cliente monta com complementos, coberturas, frutas etc. */
  personalizavel: boolean;
  /** Só as batidas têm sabor. */
  sabores?: string[];
}

export const LINHAS: LinhaAcai[] = [
  {
    id: 'tradicional',
    nome: 'Açaí Tradicional',
    descricao: 'O clássico, do seu jeito',
    personalizavel: true,
    tamanhos: [
      { id: '300', volume: '300ml', preco: 13.0 },
      { id: '500', volume: '500ml', preco: 18.5 },
    ],
  },
  {
    id: 'batida',
    nome: 'Batidas de Açaí',
    descricao: 'Açaí na garrafinha, em 5 sabores',
    personalizavel: false,
    tamanhos: [
      { id: '300', volume: '300ml', preco: 15.0 },
      { id: '500', volume: '500ml', preco: 20.5 },
    ],
    sabores: [
      'Açaí com Ninho',
      'Açaí com Nutella',
      'Açaí Maracujá',
      'Açaí Morango',
      'Açaí Cookie',
    ],
  },
];

export interface ItemAdicional {
  nome: string;
  /** null = valor ainda não definido pela loja (aparece como "a confirmar"). */
  preco: number | null;
}

export const ADICIONAIS: ItemAdicional[] = [
  { nome: 'Mousse de maracujá', preco: null },
  { nome: 'Mousse de morango', preco: null },
];

export interface Categoria {
  id: CategoriaId;
  titulo: string;
  cor: CorCategoria;
  /** Emoji usado na mensagem do WhatsApp. */
  emoji: string;
  opcoes: string[];
}

export const CATEGORIAS: Categoria[] = [
  {
    id: 'complementos',
    titulo: 'Complementos',
    cor: 'complemento',
    emoji: '🍬',
    opcoes: [
      'Amendoim',
      'Chocobol',
      'Disquete',
      'Paçoca',
      'Granulado',
      'Jujuba',
      'Creme de avelã',
      'Creme de leitinho',
      'Creme de cookie',
      'Granola',
      'Leite em pó',
      'Leite condensado',
      'Cereja',
      'Bis',
      'Biscoito Look Wafer',
      'Nutella',
      'Ovomaltine',
    ],
  },
  {
    id: 'coberturas',
    titulo: 'Coberturas',
    cor: 'cobertura',
    emoji: '🍫',
    opcoes: [
      'Morango',
      'Frutas vermelhas',
      'Chocolate',
      'Uva',
      'Chocolate meio amargo',
      'Menta',
      'Chiclete',
    ],
  },
  {
    id: 'frutas',
    titulo: 'Frutas',
    cor: 'fruta',
    emoji: '🍓',
    opcoes: ['Morango', 'Banana', 'Uva'],
  },
  {
    id: 'sorvetes',
    titulo: 'Sorvetes',
    cor: 'sorvete',
    emoji: '🍦',
    opcoes: [
      'Morango',
      'Ovomaltine',
      'Chocolate',
      'Pedacinho do céu',
      'Maracujá trufado',
      'Ninho trufado',
      'Iogurte',
    ],
  },
  {
    id: 'adicionais',
    titulo: 'Adicionais',
    cor: 'adicional',
    emoji: '✨',
    opcoes: ADICIONAIS.map((a) => a.nome),
  },
];

export function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
