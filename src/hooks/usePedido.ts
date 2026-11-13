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
  frutas: string[];
  coberturas: string[];
  acompanhamentos: string[];
  sorvetes: string[];
  valorSorvete: number | null;
  adicionais: string[];
  trufado: string | null;
  acaiZeroQtd: number;
  formaPagamento: string | null;
  // extras acima do limite incluso
  frutasExtras: number;
  coberturasExtras: number;
  acompanhamentosExtras: number;
  totalExtrasItens: number;
  valorExtras: number;
  valorTrufado: number;
  valorAdicionais: number;
  valorAcaiZero: number;
  total: number;
  // sorvete foi escolhido mas o cliente ainda não disse quanto quer gastar
  sorveteSemValor: boolean;
}

export function usePedido() {
  const [tamanho, setTamanho] = useState<TamanhoAcai | null>(null);
  const [frutas, setFrutas] = useState<string[]>([]);
  const [coberturas, setCoberturas] = useState<string[]>([]);
  const [acompanhamentos, setAcompanhamentos] = useState<string[]>([]);
  const [sorvetes, setSorvetes] = useState<string[]>([]);
  const [valorSorvete, setValorSorvete] = useState<number | null>(null);
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
    setValorSorvete(null);
    setAdicionais([]);
    setTrufado(null);
    setAcaiZeroQtd(0);
    setFormaPagamento(null);
  }

  const resumo: ResumoPedido = useMemo(() => {
    const frutasExtras =
      tamanho && tamanho.frutas !== null
        ? Math.max(0, frutas.length - tamanho.frutas)
        : 0;
    const coberturasExtras =
      tamanho && tamanho.coberturas !== null
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
    const valorAcaiZero = acaiZeroQtd * PRECO_ACAI_ZERO;
    const base = tamanho?.preco ?? 0;

    return {
      tamanho,
      frutas,
      coberturas,
      acompanhamentos,
      sorvetes,
      valorSorvete,
      adicionais,
      trufado,
      acaiZeroQtd,
      formaPagamento,
      frutasExtras,
      coberturasExtras,
      acompanhamentosExtras,
      totalExtrasItens,
      valorExtras,
      valorTrufado,
      valorAdicionais,
      valorAcaiZero,
      total:
        base +
        valorExtras +
        valorTrufado +
        valorAdicionais +
        valorAcaiZero +
        (valorSorvete ?? 0),
      sorveteSemValor: sorvetes.length > 0 && !valorSorvete,
    };
  }, [
    tamanho,
    frutas,
    coberturas,
    acompanhamentos,
    sorvetes,
    valorSorvete,
    adicionais,
    trufado,
    acaiZeroQtd,
    formaPagamento,
  ]);

  return {
    tamanho,
    frutas,
    coberturas,
    acompanhamentos,
    sorvetes,
    valorSorvete,
    adicionais,
    trufado,
    acaiZeroQtd,
    formaPagamento,
    setTrufado,
    setAcaiZeroQtd,
    setValorSorvete,
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
