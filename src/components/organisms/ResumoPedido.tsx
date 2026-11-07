import { CATEGORIAS, formatarPreco } from '../../data/menu';
import type { ResumoPedido as Resumo } from '../../hooks/usePedido';

interface Props {
  resumo: Resumo;
  onLimpar: () => void;
}

/** Organismo: resumo do pedido com total em tempo real. */
export function ResumoPedido({ resumo, onLimpar }: Props) {
  const { tamanho, linha, sabor } = resumo;
  if (!tamanho) return null;

  return (
    <div className="mt-5 rounded-xl border border-white/30 bg-white/10 px-5 py-4 text-white">
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.14em]">
        Seu açaí
      </div>

      <Linha label="Açaí">{linha.nome}</Linha>
      {sabor && <Linha label="Sabor">{sabor}</Linha>}
      <Linha label="Tamanho">
        {tamanho.volume} · {formatarPreco(tamanho.preco)}
      </Linha>

      {CATEGORIAS.map((cat) => {
        const itens = resumo.selecoes[cat.id];
        return itens.length > 0 ? (
          <Linha key={cat.id} label={cat.titulo}>
            {itens.join(', ')}
          </Linha>
        ) : null;
      })}

      {resumo.adicionaisAConfirmar.length > 0 && (
        <p className="mt-2 rounded-lg bg-amber/20 px-3 py-2 text-xs text-amber">
          Valor a confirmar com a loja: {resumo.adicionaisAConfirmar.join(', ')}
        </p>
      )}

      {resumo.precisaSabor && !sabor && (
        <p className="mt-2 rounded-lg bg-white/15 px-3 py-2 text-xs font-bold">
          Escolha o sabor da batida para enviar o pedido.
        </p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-white/35 pt-3 text-lg font-bold">
        <span>Total</span>
        <span className="text-2xl text-amber">{formatarPreco(resumo.total)}</span>
      </div>

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
      <span className="flex-none text-white/70">{label}</span>
      <span className="text-right">{children}</span>
    </div>
  );
}
