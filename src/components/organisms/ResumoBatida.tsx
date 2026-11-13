import type { SaborBatida, TamanhoBatida } from '../../data/batidas';
import { ENTREGA_GRATIS_A_PARTIR_DE } from '../../data/loja';
import { formatarPreco } from '../../data/menu';
import { SeletorPagamento } from '../molecules/SeletorPagamento';

interface Props {
  sabor: SaborBatida;
  tamanho: TamanhoBatida | null;
  preco: number | null;
  formaPagamento: string | null;
  onFormaPagamento: (id: string) => void;
  onLimpar: () => void;
}

export function ResumoBatida({
  sabor,
  tamanho,
  preco,
  formaPagamento,
  onFormaPagamento,
  onLimpar,
}: Props) {
  if (!tamanho || preco === null) return null;

  return (
    <div className="mt-5 rounded-xl bg-white/10 px-5 py-4 text-white">
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.14em]">
        Sua batida
      </div>

      <Linha label="Sabor">{sabor.nome}</Linha>
      <Linha label="Tamanho">{tamanho.volume}</Linha>

      <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3 text-lg font-bold">
        <span>Total</span>
        <span className="text-2xl text-amber">{formatarPreco(preco)}</span>
      </div>
      <p className="mt-1 text-xs text-white/60">
        Entrega grátis a partir de {formatarPreco(ENTREGA_GRATIS_A_PARTIR_DE)}.
      </p>

      <SeletorPagamento
        selecionado={formaPagamento}
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
      <span className="flex-none text-white/70">{label}</span>
      <span className="text-right">{children}</span>
    </div>
  );
}
