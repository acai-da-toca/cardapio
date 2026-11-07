import { useMemo, useState } from 'react';
import {
  ADICIONAIS,
  CATEGORIAS,
  LINHAS,
  type CategoriaId,
  type LinhaAcai,
  type LinhaId,
  type TamanhoPreco,
} from '../data/menu';

type Selecoes = Record<CategoriaId, string[]>;

const selecoesVazias = (): Selecoes =>
  Object.fromEntries(CATEGORIAS.map((c) => [c.id, []])) as unknown as Selecoes;

export interface ResumoPedido {
  linha: LinhaAcai;
  sabor: string | null;
  tamanho: TamanhoPreco | null;
  selecoes: Selecoes;
  /** Adicionais escolhidos cujo valor a loja ainda não definiu. */
  adicionaisAConfirmar: string[];
  /** A linha escolhida exige sabor (batidas). */
  precisaSabor: boolean;
  /** Tem tamanho e, quando exigido, sabor — pode enviar o pedido. */
  completo: boolean;
  total: number;
}

export function usePedido() {
  const [linhaId, setLinhaId] = useState<LinhaId>('tradicional');
  const [sabor, setSabor] = useState<string | null>(null);
  const [tamanhoId, setTamanhoId] = useState<string | null>(null);
  const [selecoes, setSelecoes] = useState<Selecoes>(selecoesVazias);

  const linha = LINHAS.find((l) => l.id === linhaId) ?? LINHAS[0];

  function escolherLinha(id: LinhaId) {
    setLinhaId(id);
    // sabor só existe nas batidas
    if (id !== 'batida') setSabor(null);
  }

  function alternarSabor(nome: string) {
    setSabor((atual) => (atual === nome ? null : nome));
  }

  function alternarItem(categoria: CategoriaId, valor: string) {
    setSelecoes((atual) => {
      const lista = atual[categoria];
      return {
        ...atual,
        [categoria]: lista.includes(valor)
          ? lista.filter((item) => item !== valor)
          : [...lista, valor],
      };
    });
  }

  function limpar() {
    setLinhaId('tradicional');
    setSabor(null);
    setTamanhoId(null);
    setSelecoes(selecoesVazias());
  }

  const resumo: ResumoPedido = useMemo(() => {
    const tamanho = linha.tamanhos.find((t) => t.id === tamanhoId) ?? null;
    const precisaSabor = !!linha.sabores;

    // Batida não leva complementos: as escolhas ficam guardadas, mas não contam.
    const selecoesDoPedido = linha.personalizavel ? selecoes : selecoesVazias();

    let totalAdicionais = 0;
    const adicionaisAConfirmar: string[] = [];
    for (const nome of selecoesDoPedido.adicionais) {
      const preco = ADICIONAIS.find((a) => a.nome === nome)?.preco ?? null;
      if (preco === null) adicionaisAConfirmar.push(nome);
      else totalAdicionais += preco;
    }

    return {
      linha,
      sabor,
      tamanho,
      selecoes: selecoesDoPedido,
      adicionaisAConfirmar,
      precisaSabor,
      completo: tamanho !== null && (!precisaSabor || sabor !== null),
      total: (tamanho?.preco ?? 0) + totalAdicionais,
    };
  }, [linha, sabor, tamanhoId, selecoes]);

  return {
    linha,
    sabor,
    tamanho: resumo.tamanho,
    selecoes,
    escolherLinha,
    alternarSabor,
    escolherTamanho: setTamanhoId,
    alternarItem,
    limpar,
    resumo,
  };
}
