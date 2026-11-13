import { COPO_TRUFADO, formatarPreco } from '../../data/menu';
import { ENTREGA_GRATIS_A_PARTIR_DE } from '../../data/loja';
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
        <Linha label="Sorvetes">{resumo.sorvetes.join(', ')}</Linha>
      )}
      {resumo.valorSorvete !== null && resumo.valorSorvete > 0 && (
        <Linha label="Sorvete (pesagem confere)">
          {formatarPreco(resumo.valorSorvete)}
        </Linha>
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
        <span>{resumo.sorveteSemValor ? `Total do ${produto}` : 'Total'}</span>
        <span className="text-2xl text-amber">{formatarPreco(resumo.total)}</span>
      </div>
      {resumo.sorveteSemValor && (
        <p className="mt-1 text-xs text-white/60">
          Não inclui o sorvete. Diga quanto quer gastar acima pra entrar no total.
        </p>
      )}
      <p className="mt-1 text-xs text-white/60">
        Entrega grátis a partir de {formatarPreco(ENTREGA_GRATIS_A_PARTIR_DE)}.
      </p>

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
