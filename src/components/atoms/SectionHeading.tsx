// Átomo: cabeçalho de seção numerado (ex.: "1 Escolha o tamanho").
interface Props {
  numero: number;
  titulo: string;
  light?: boolean;
}

export function SectionHeading({ numero, titulo, light }: Props) {
  return (
    <div className="my-3 flex items-center gap-3">
      <b
        className={`flex size-7 flex-none items-center justify-center rounded-full text-sm font-bold ${
          light ? 'bg-amber text-deep' : 'bg-magenta text-white'
        }`}
      >
        {numero}
      </b>
      <span
        className={`text-sm font-bold uppercase tracking-[0.16em] ${
          light ? 'text-amber' : 'text-purple'
        }`}
      >
        {titulo}
      </span>
      <i
        className={`h-px flex-1 ${
          light ? 'bg-white/20' : 'bg-purple/20'
        }`}
      />
    </div>
  );
}
