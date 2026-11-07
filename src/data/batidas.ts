// Batida de açaí (açaí na garrafinha) — dados separados do cardápio do copo.
// Para mudar sabores ou preços da batida, edite apenas este arquivo.

import batidaImg from '../assets/batifda.jpg';

/** Foto da garrafinha (mesma para todos os sabores — ainda não há uma por sabor). */
export const BATIDA_IMG: string | null = batidaImg;

export interface TamanhoBatida {
  id: string;
  volume: string;
}

export interface SaborBatida {
  id: string;
  nome: string;
  /** Preço por id de tamanho. */
  precos: Record<string, number>;
}

export const TAMANHOS_BATIDA: TamanhoBatida[] = [
  { id: '300', volume: '300ml' },
  { id: '500', volume: '500ml' },
];

const PRECO_ESPECIAL = { '300': 15.0, '500': 20.5 };

export const SABORES_BATIDA: SaborBatida[] = [
  { id: 'tradicional', nome: 'Tradicional', precos: { '300': 13.0, '500': 18.5 } },
  { id: 'ninho', nome: 'Açaí com Ninho', precos: PRECO_ESPECIAL },
  { id: 'nutella', nome: 'Açaí com Nutella', precos: PRECO_ESPECIAL },
  { id: 'maracuja', nome: 'Açaí Maracujá', precos: PRECO_ESPECIAL },
  { id: 'morango', nome: 'Açaí Morango', precos: PRECO_ESPECIAL },
  { id: 'cookie', nome: 'Açaí Cookie', precos: PRECO_ESPECIAL },
];
