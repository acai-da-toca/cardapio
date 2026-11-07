import { useMemo, useState } from 'react';
import {
  PRECO_ADICIONAL_ITEM,
  PRECO_MOUSSE,
  PRECO_TRUFADO,
  TamanhoAcai,
} from '../data/menu';

export interface ResumoPedido {
  tamanho: TamanhoAcai | null;
  frutas: string[];
  coberturas: string[];
  acompanhamentos: string[];
  sorvetes: string[];
  observacaoSorvete: string;
  adicionais: string[];
  trufado: string | null;
  formaPagamento: string | null;
  // extras acima do limite incluso
  frutasExtras: number;
  coberturasExtras: number;
  acompanhamentosExtras: number;
  totalExtrasItens: number;
  valorExtras: number;
  valorTrufado: number;
  valorAdicionais: number;
  total: number;
  // sorvete é vendido por peso, sem preço fixo — true quando algum foi escolhido
  temItemAConfirmar: boolean;
}

export function usePedido() {
  const [tamanho, setTamanho] = useState<TamanhoAcai | null>(null);
  const [frutas, setFrutas] = useState<string[]>([]);
  const [coberturas, setCoberturas] = useState<string[]>([]);
  const [acompanhamentos, setAcompanhamentos] = useState<string[]>([]);
  const [sorvetes, setSorvetes] = useState<string[]>([]);
  const [observacaoSorvete, setObservacaoSorvete] = useState('');
  const [adicionais, setAdicionais] = useState<string[]>([]);
  const [trufado, setTrufado] = useState<string | null>(null);
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

  const toggleFruta = (v: string) => toggle(v, frutas, setFrutas);
  const toggleCobertura = (v: string) => toggle(v, coberturas, setCoberturas);
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
    setFrutas([]);
    setCoberturas([]);
    setAcompanhamentos([]);
    setSorvetes([]);
    setObservacaoSorvete('');
    setAdicionais([]);
    setTrufado(null);
    setFormaPagamento(null);
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
    const valorAdicionais = adicionais.length * PRECO_MOUSSE;
    const base = tamanho?.preco ?? 0;

    return {
      tamanho,
      frutas,
      coberturas,
      acompanhamentos,
      sorvetes,
      observacaoSorvete,
      adicionais,
      trufado,
      formaPagamento,
      frutasExtras,
      coberturasExtras,
      acompanhamentosExtras,
      totalExtrasItens,
      valorExtras,
      valorTrufado,
      valorAdicionais,
      total: base + valorExtras + valorTrufado + valorAdicionais,
      temItemAConfirmar: sorvetes.length > 0,
    };
  }, [
    tamanho,
    frutas,
    coberturas,
    acompanhamentos,
    sorvetes,
    observacaoSorvete,
    adicionais,
    trufado,
    formaPagamento,
  ]);

  return {
    tamanho,
    frutas,
    coberturas,
    acompanhamentos,
    sorvetes,
    observacaoSorvete,
    adicionais,
    trufado,
    formaPagamento,
    setTrufado,
    setObservacaoSorvete,
    escolherFormaPagamento: setFormaPagamento,
    escolherTamanho,
    toggleFruta,
    toggleCobertura,
    toggleAcompanhamento,
    toggleSorvete,
    toggleAdicional,
    limpar,
    resumo,
  };
}
