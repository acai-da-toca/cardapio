import {
  COPO_TRUFADO,
  formatarPreco,
  PRECO_ADICIONAL_ITEM,
  PRECO_TRUFADO,
} from '../../data/menu';

interface Props {
  trufado: string | null;
  onTrufado: (id: string | null) => void;
}

/** Organismo: cards de adicionais (item extra + copo trufado com sabores). */
export function Extras({ trufado, onTrufado }: Props) {
  return (
    <div className="mt-6 flex flex-col gap-3">
      <div className="rounded-xl bg-amber px-5 py-4 text-deep">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.14em]">
              Item adicional
            </div>
            <div className="mt-0.5 text-xs opacity-90">por unidade extra</div>
          </div>
          <div className="whitespace-nowrap text-2xl font-bold leading-none">
            {formatarPreco(PRECO_ADICIONAL_ITEM)}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-magenta px-5 py-4 text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.14em]">
              Copo trufado
            </div>
            <div className="mt-0.5 text-xs opacity-90">valor adicional</div>
          </div>
          <div className="whitespace-nowrap text-2xl font-bold leading-none">
            {formatarPreco(PRECO_TRUFADO)}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 border-t border-white/35 pt-3">
          {COPO_TRUFADO.map((opcao) => {
            const ativo = trufado === opcao.id;
            return (
              <button
                key={opcao.id}
                type="button"
                aria-pressed={ativo}
                onClick={() => onTrufado(ativo ? null : opcao.id)}
                className={`rounded-full border px-3 py-1.5 text-sm font-bold transition-colors ${
                  ativo
                    ? 'border-white bg-white text-magenta'
                    : 'border-white/60 bg-transparent text-white'
                }`}
              >
                {opcao.nome}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
