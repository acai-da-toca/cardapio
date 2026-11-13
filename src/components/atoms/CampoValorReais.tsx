interface Props {
  id: string;
  valor: number | null;
  placeholder: string;
  onChange: (valor: number | null) => void;
}

/** Átomo: campo numérico para o cliente dizer quanto quer gastar (R$). */
export function CampoValorReais({ id, valor, placeholder, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 focus-within:ring-2 focus-within:ring-amber">
      <span className="text-sm font-bold text-white/70">R$</span>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        step={0.5}
        value={valor ?? ''}
        onChange={(e) =>
          onChange(e.target.value === '' ? null : Number(e.target.value))
        }
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus-visible:outline-none"
      />
    </div>
  );
}
