import { FORMAS_PAGAMENTO } from '../../data/pagamento';

interface Props {
  selecionado: string | null;
  onSelecionar: (id: string) => void;
}

/** Molécula: escolha da forma de pagamento, último passo antes do WhatsApp. */
export function SeletorPagamento({ selecionado, onSelecionar }: Props) {
  return (
    <div className="mt-4 border-t border-white/20 pt-4">
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-white/70">
        Forma de pagamento
      </div>
      <div className="flex flex-wrap gap-2">
        {FORMAS_PAGAMENTO.map((f) => {
          const ativo = selecionado === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={ativo}
              onClick={() => onSelecionar(f.id)}
              className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold transition-colors ${
                ativo
                  ? 'border-amber bg-amber text-deep'
                  : 'border-white/30 bg-white/10 text-white'
              }`}
            >
              {f.nome}
            </button>
          );
        })}
      </div>
      {!selecionado && (
        <p className="mt-2 text-xs text-white/60">
          Escolha para finalizar o pedido.
        </p>
      )}
    </div>
  );
}
