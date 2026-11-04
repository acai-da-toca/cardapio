interface Props {
  /** Cor da calda que derrama. */
  color?: string;
  className?: string;
}

/**
 * Átomo: borda orgânica de calda "derramando" com pingos irregulares.
 * A faixa preenche o topo e os pingos descem até a base (y=40), de modo que a
 * base encosta no topo da band roxa sem deixar degrau. Posicionar com
 * `bottom-full` logo acima da band.
 */
export function DripBorder({ color = '#FDB75B', className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 40"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/*
        Topo reto (y=0). A borda inferior ondula: sobe a ~y=16 entre os pingos
        e desce até y=40 nos pingos (gotas). Assim o laranja "derrama" pra baixo
        e a base toca o roxo da band.
      */}
      <path
        fill={color}
        d="M0,0 H400 V18
          C388,18 386,40 374,40 C362,40 360,18 348,18
          C338,18 336,33 326,33 C316,33 314,18 304,18
          C292,18 289,40 276,40 C263,40 261,18 248,18
          C239,18 237,31 227,31 C217,31 215,18 205,18
          C192,18 189,40 176,40 C163,40 161,18 148,18
          C139,18 137,32 127,32 C117,32 115,18 105,18
          C92,18 89,40 76,40 C63,40 61,18 48,18
          C39,18 37,31 27,31 C17,31 15,18 0,18 Z"
      />
    </svg>
  );
}
