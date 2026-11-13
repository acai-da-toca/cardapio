import { COPO_TRUFADO, formatarPreco } from '../../data/menu';
import type { ResumoPedido as Resumo } from '../../hooks/usePedido';
import { SeletorPagamento } from '../molecules/SeletorPagamento';

interface Props {
  resumo: Resumo;
  onLimpar: () => void;
  onFormaPagamento: (id: string) => void;
  /** Nome do produto no resumo (ex.: "açaí", "sorvete"). Padrão: "açaí". */
  produto?: string;
}

/** Organismo: resumo do pedido com total em tempo real. */
export function ResumoPedido({
  resumo,
  onLimpar,
  onFormaPagamento,
  produto = 'açaí',
}: Props) {
  const { tamanho } = resumo;
  if (!tamanho) return null;

  const nomeTrufado = COPO_TRUFADO.find((t) => t.id === resumo.trufado)?.nome;

  return (
    <div className="mt-5 rounded-xl border border-white/30 bg-white/10 px-5 py-4 text-white">
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.14em]">
        Seu {produto}
      </div>

      <Linha label="Tamanho">
        {tamanho.volume} · {formatarPreco(tamanho.preco)}
      </Linha>
      {resumo.frutas.length > 0 && (
        <Linha label={`Frutas${resumo.frutasExtras ? ` (+${resumo.frutasExtras} extra)` : ''}`}>
          {resumo.frutas.join(', ')}
        </Linha>
      )}
      {resumo.coberturas.length > 0 && (
        <Linha label={`Coberturas${resumo.coberturasExtras ? ` (+${resumo.coberturasExtras} extra)` : ''}`}>
          {resumo.coberturas.join(', ')}
        </Linha>
      )}
      {resumo.acompanhamentos.length > 0 && (
        <Linha
          label={`Acompanhamentos${resumo.acompanhamentosExtras ? ` (+${resumo.acompanhamentosExtras} extra)` : ''}`}
        >
          {resumo.acompanhamentos.join(', ')}
        </Linha>
      )}
      {resumo.sorvetes.length > 0 && (
        <Linha label="Sorvetes (por peso)">{resumo.sorvetes.join(', ')}</Linha>
      )}
      {resumo.observacaoSorvete && (
        <Linha label="Obs. sorvete">{resumo.observacaoSorvete}</Linha>
      )}
      {resumo.adicionais.length > 0 && (
        <Linha label="Adicionais">
          {resumo.adicionais.join(', ')} · {formatarPreco(resumo.valorAdicionais)}
        </Linha>
      )}
      {nomeTrufado && <Linha label="Trufado">{nomeTrufado}</Linha>}

      {resumo.valorExtras > 0 && (
        <Linha label={`Itens extras (${resumo.totalExtrasItens} item)`}>
          {formatarPreco(resumo.valorExtras)}
        </Linha>
      )}
      {resumo.valorTrufado > 0 && (
        <Linha label="Copo trufado">{formatarPreco(resumo.valorTrufado)}</Linha>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-white/35 pt-3 text-lg font-bold">
        <span>{resumo.temItemAConfirmar ? `Total do ${produto}` : 'Total'}</span>
        <span className="text-2xl text-amber">{formatarPreco(resumo.total)}</span>
      </div>
      {resumo.temItemAConfirmar && (
        <p className="mt-1 text-xs text-white/60">
          Não inclui o sorvete, vendido por peso. O valor é combinado com a loja pelo WhatsApp.
        </p>
      )}

      <SeletorPagamento
        selecionado={resumo.formaPagamento}
        onSelecionar={onFormaPagamento}
      />

      <button
        type="button"
        onClick={onLimpar}
        className="mt-3 w-full rounded-lg bg-amber px-4 py-2 text-sm font-bold text-deep"
      >
        Recomeçar
      </button>
    </div>
  );
}

function Linha({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-2 py-1 text-sm opacity-95">
      <span className="text-white/70">{label}</span>
      <span className="text-right">{children}</span>
    </div>
  );
}
