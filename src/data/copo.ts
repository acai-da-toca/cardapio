// Configuração do visual do açaí na página.
//
// - COPO_IMG: foto estática do copo no seletor de tamanho (fundo do copo 3D procedural
//   se null).
// - HERO_VIDEO: vídeo de apresentação (hero) no topo da página, servido de /public.

import copoImg from '../assets/copo-acai.jpg';

/** Foto estática do copo (seletor de tamanho). */
export const COPO_IMG: string | null = copoImg;

/** Vídeo de apresentação (hero) no topo da página. null = sem hero. */
export const HERO_VIDEO: string | null = '/media/acai-intro.mp4';
