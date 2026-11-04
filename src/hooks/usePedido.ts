import { useMemo, useState } from 'react';
import {
  PRECO_ADICIONAL_ITEM,
  PRECO_TRUFADO,
  TamanhoAcai,
} from '../data/menu';

export interface ResumoPedido {
  tamanho: TamanhoAcai | null;
  frutas: string[];
  coberturas: string[];
  acompanhamentos: string[];
  trufado: string | null;
  // extras acima do limite incluso
  frutasExtras: number;
  coberturasExtras: number;
  acompanhamentosExtras: number;
  totalExtrasItens: number;
  valorExtras: number;
  valorTrufado: number;
  total: number;
}

export function usePedido() {
  const [tamanho, setTamanho] = useState<TamanhoAcai | null>(null);
  const [frutas, setFrutas] = useState<string[]>([]);
  const [coberturas, setCoberturas] = useState<string[]>([]);
  const [acompanhamentos, setAcompanhamentos] = useState<string[]>([]);
  const [trufado, setTrufado] = useState<string | null>(null);

  function toggle(
    valor: string,
    lista: string[],
    setLista: (v: string[]) => void,
  ) {
    if (lista.includes(valor)) {
      setLista(lista.filter((item) => item !== valor));
    } else {
      setLista([...lista, valor]);
    }
  }

  const toggleFruta = (v: string) => toggle(v, frutas, setFrutas);
  const toggleCobertura = (v: string) => toggle(v, coberturas, setCoberturas);
  const toggleAcompanhamento = (v: string) =>
    toggle(v, acompanhamentos, setAcompanhamentos);

  function escolherTamanho(novo: TamanhoAcai) {
    // Ao trocar de tamanho, mantém escolhas mas recalcula extras automaticamente.
    setTamanho(novo);
  }

  function limpar() {
    setTamanho(null);
    setFrutas([]);
    setCoberturas([]);
    setAcompanhamentos([]);
    setTrufado(null);
  }

  const resumo: ResumoPedido = useMemo(() => {
    const frutasExtras = tamanho
      ? Math.max(0, frutas.length - tamanho.frutas)
      : 0;
    const coberturasExtras = tamanho
      ? Math.max(0, coberturas.length - tamanho.coberturas)
      : 0;
    const acompanhamentosExtras = tamanho
      ? Math.max(0, acompanhamentos.length - tamanho.acompanhamentos)
      : 0;

    const totalExtrasItens =
      frutasExtras + coberturasExtras + acompanhamentosExtras;
    const valorExtras = totalExtrasItens * PRECO_ADICIONAL_ITEM;
    const valorTrufado = trufado ? PRECO_TRUFADO : 0;
    const base = tamanho?.preco ?? 0;

    return {
      tamanho,
      frutas,
      coberturas,
      acompanhamentos,
      trufado,
      frutasExtras,
      coberturasExtras,
      acompanhamentosExtras,
      totalExtrasItens,
      valorExtras,
      valorTrufado,
      total: base + valorExtras + valorTrufado,
    };
  }, [tamanho, frutas, coberturas, acompanhamentos, trufado]);

  return {
    tamanho,
    frutas,
    coberturas,
    acompanhamentos,
    trufado,
    setTrufado,
    escolherTamanho,
    toggleFruta,
    toggleCobertura,
    toggleAcompanhamento,
    limpar,
    resumo,
  };
}
