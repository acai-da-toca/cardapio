interface Props {
  /** URL/import da foto do produto (cena real, não isolada). */
  src: string;
  /** Texto do selo (ex.: "500ml"). */
  volume?: string;
  /** Preço exibido no selo. */
  preco?: string;
  alt: string;
}

/**
 * Átomo: foto de produto fotografada (fundo próprio, não isolada) em
 * moldura retrato com cantos arredondados. Diferente do CopoFoto, que espera
 * um corte isolado e usa glow + object-contain, esta foto já tem cena
 * própria, então usa object-cover numa moldura fixa, sem glow. Usado pela
 * garrafinha da batida e pelo sorvete.
 */
export function FotoProduto({ src, volume, preco, alt }: Props) {
  return (
    <div className="relative aspect-[3/4] w-full flex-none overflow-hidden rounded-2xl shadow-[0_14px_28px_rgba(69,16,92,0.35)]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-300 ease-out hover:scale-105"
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
