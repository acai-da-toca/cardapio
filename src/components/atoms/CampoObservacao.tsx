interface Props {
  id: string;
  valor: string;
  placeholder: string;
  onChange: (valor: string) => void;
}

/** Átomo: campo de texto curto para o cliente escrever uma observação livre. */
export function CampoObservacao({ id, valor, placeholder, onChange }: Props) {
  return (
    <textarea
      id={id}
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={2}
      maxLength={200}
      className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
    />
  );
}
