interface Props {
  id: string;
  valor: number | null;
  placeholder: string;
  onChange: (valor: number | null) => void;
}

/** Átomo: campo numérico para o cliente dizer quantos ml de sorvete quer. */
export function CampoGramas({ id, valor, placeholder, onChange }: Props) {
  function lidarComMudanca(texto: string) {
    onChange(texto === '' ? null : Math.max(0, Number(texto)));
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 focus-within:ring-2 focus-within:ring-amber">
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        step={10}
        value={valor ?? ''}
        onChange={(e) => lidarComMudanca(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus-visible:outline-none"
      />
      <span className="text-sm font-bold text-white/70">ml</span>
    </div>
  );
}
