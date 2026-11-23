import { useMemo, useState } from 'react';
import {
  PRECO_ACAI_ZERO,
  PRECO_ADICIONAL_ITEM,
  PRECO_MOUSSE,
  PRECO_TRUFADO,
  TamanhoAcai,
} from '../data/menu';

export interface ResumoPedido {
  tamanho: TamanhoAcai | null;
  acompanhamentos: string[];
  sorvetes: string[];
  observacaoSorvete: string;
  adicionais: string[];
  trufado: string | null;
  acaiZeroQtd: number;
  formaPagamento: string | null;
  totalExtrasItens: number;
  valorExtras: number;
  valorTrufado: number;
  valorAdicionais: number;
  valorAcaiZero: number;
  total: number;
  // sorvete é vendido por peso, sem preço fixo — true quando algum foi escolhido
  temItemAConfirmar: boolean;
}

export function usePedido() {
  const [tamanho, setTamanho] = useState<TamanhoAcai | null>(null);
  const [acompanhamentos, setAcompanhamentos] = useState<string[]>([]);
  const [sorvetes, setSorvetes] = useState<string[]>([]);
  const [observacaoSorvete, setObservacaoSorvete] = useState('');
  const [adicionais, setAdicionais] = useState<string[]>([]);
  const [trufado, setTrufado] = useState<string | null>(null);
  const [acaiZeroQtd, setAcaiZeroQtd] = useState(0);
  const [formaPagamento, setFormaPagamento] = useState<string | null>(null);

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

  const toggleAcompanhamento = (v: string) =>
    toggle(v, acompanhamentos, setAcompanhamentos);
  const toggleSorvete = (v: string) => toggle(v, sorvetes, setSorvetes);
  const toggleAdicional = (v: string) => toggle(v, adicionais, setAdicionais);

  function escolherTamanho(novo: TamanhoAcai) {
    // Ao trocar de tamanho, mantém escolhas mas recalcula extras automaticamente.
    setTamanho(novo);
  }

  function limpar() {
    setTamanho(null);
    setAcompanhamentos([]);
    setSorvetes([]);
    setObservacaoSorvete('');
    setAdicionais([]);
    setTrufado(null);
    setAcaiZeroQtd(0);
    setFormaPagamento(null);
  }

  const resumo: ResumoPedido = useMemo(() => {
    const totalExtrasItens = tamanho
      ? Math.max(0, acompanhamentos.length - tamanho.acompanhamentos)
      : 0;
    const valorExtras = totalExtrasItens * PRECO_ADICIONAL_ITEM;
    const valorTrufado = trufado ? PRECO_TRUFADO : 0;
    const valorAdicionais = adicionais.length * PRECO_MOUSSE;
    const valorAcaiZero = acaiZeroQtd * PRECO_ACAI_ZERO;
    const base = tamanho?.preco ?? 0;

    return {
      tamanho,
      acompanhamentos,
      sorvetes,
      observacaoSorvete,
      adicionais,
      trufado,
      acaiZeroQtd,
      formaPagamento,
      totalExtrasItens,
      valorExtras,
      valorTrufado,
      valorAdicionais,
      valorAcaiZero,
      total: base + valorExtras + valorTrufado + valorAdicionais + valorAcaiZero,
      temItemAConfirmar: sorvetes.length > 0,
    };
  }, [
    tamanho,
    acompanhamentos,
    sorvetes,
    observacaoSorvete,
    adicionais,
    trufado,
    acaiZeroQtd,
    formaPagamento,
  ]);

  return {
    tamanho,
    acompanhamentos,
    sorvetes,
    observacaoSorvete,
    adicionais,
    trufado,
    acaiZeroQtd,
    formaPagamento,
    setTrufado,
    setObservacaoSorvete,
    setAcaiZeroQtd,
    escolherFormaPagamento: setFormaPagamento,
    escolherTamanho,
    toggleAcompanhamento,
    toggleSorvete,
    toggleAdicional,
    limpar,
    resumo,
  };
}
