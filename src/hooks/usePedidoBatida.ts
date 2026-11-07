import { useState } from 'react';
import { SABORES_BATIDA, TAMANHOS_BATIDA } from '../data/batidas';

/** Estado do pedido de batida (sabor + tamanho), independente do pedido do copo. */
export function usePedidoBatida() {
  // Começa no Tradicional para os preços dos tamanhos já aparecerem.
  const [saborId, setSaborId] = useState(SABORES_BATIDA[0].id);
  const [tamanhoId, setTamanhoId] = useState<string | null>(null);
  const [formaPagamento, setFormaPagamento] = useState<string | null>(null);

  const sabor = SABORES_BATIDA.find((s) => s.id === saborId) ?? SABORES_BATIDA[0];
  const tamanho = TAMANHOS_BATIDA.find((t) => t.id === tamanhoId) ?? null;
  const preco = tamanho ? sabor.precos[tamanho.id] : null;

  function limpar() {
    setSaborId(SABORES_BATIDA[0].id);
    setTamanhoId(null);
    setFormaPagamento(null);
  }

  return {
    sabor,
    tamanho,
    preco,
    formaPagamento,
    escolherSabor: setSaborId,
    escolherTamanho: setTamanhoId,
    escolherFormaPagamento: setFormaPagamento,
    limpar,
  };
}
