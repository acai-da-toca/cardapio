interface Props {
  /** URL/import da imagem do copo (PNG/WebP/JPG). */
  src: string;
  /** Texto do selo (ex.: "770ml"). */
  volume?: string;
  /** Preço exibido no selo. */
  preco?: string;
  alt?: string;
}

/**
 * Átomo: foto do copo de açaí no enquadramento redondo com glow e selo de preço.
 * Movimento com parcimônia: glow estático (sem loop), zoom APENAS no hover
 * (reação ao usuário, não distração contínua).
 */
export function CopoFoto({ src, volume, preco, alt }: Props) {
  return (
    <div className="group relative aspect-square w-full flex-none">
      {/* glow estático atrás do copo (sem loop para não distrair) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] aspect-square w-[92%]
          -translate-x-1/2 -translate-y-1/2 rounded-full
          [background:radial-gradient(circle,rgba(253,183,91,.7)_0%,rgba(253,183,91,.35)_45%,rgba(194,48,127,.1)_70%,transparent_72%)]"
      />
      <img
        src={src}
        alt={alt ?? 'Copo de açaí com morango, banana e granola'}
        loading="lazy"
        decoding="async"
        className="relative z-[1] mx-auto size-full object-contain
          drop-shadow-[0_14px_28px_rgba(69,16,92,0.4)]
          transition-transform duration-300 ease-out
          group-hover:scale-105"
      />
      {(volume || preco) && (
        <div className="badge-selo z-[2]">
          {volume && (
            <small className="text-[0.7rem] font-bold uppercase tracking-[0.1em] opacity-95">
              {volume}
            </small>
          )}
          {preco && <b className="text-base font-bold leading-tight">{preco}</b>}
        </div>
      )}
    </div>
  );
}
