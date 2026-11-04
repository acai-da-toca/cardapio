import { useEffect, useRef, useState } from 'react';
import type { AcaiCena } from '../../lib/acaiCena';

interface Props {
  /** Texto do selo (ex.: "770ml"). */
  volume?: string;
  /** Preço exibido no selo. */
  preco?: string;
}

/**
 * Organismo: copo de açaí 3D realista (Three.js). Arraste para girar.
 * O código do Three.js é carregado sob demanda (dynamic import) para não
 * pesar no bundle inicial. Faz fallback silencioso se WebGL falhar.
 */
export function AcaiCopo3D({ volume, preco }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    let cena: AcaiCena | null = null;
    let cancelado = false;
    let ro: ResizeObserver | null = null;

    import('../../lib/acaiCena')
      .then(({ criarAcaiCena }) => {
        if (cancelado) return;
        cena = criarAcaiCena(stage, canvas);
        ro = new ResizeObserver(() => cena?.resize());
        ro.observe(stage);
      })
      .catch(() => setErro(true));

    return () => {
      cancelado = true;
      ro?.disconnect();
      cena?.dispose();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative aspect-square w-full flex-none touch-pan-y
        before:pointer-events-none before:absolute before:left-1/2 before:top-[46%]
        before:aspect-square before:w-[92%] before:-translate-x-1/2 before:-translate-y-1/2
        before:rounded-full
        before:[background:radial-gradient(circle,rgba(253,183,91,.75)_0%,rgba(253,183,91,.38)_45%,rgba(194,48,127,.10)_70%,transparent_72%)]"
    >
      {!erro && (
        <canvas
          ref={canvasRef}
          aria-label="Açaí em 3D. Arraste para girar."
          className="absolute inset-0 block size-full cursor-grab active:cursor-grabbing"
        />
      )}
      {erro && (
        <div
          role="img"
          aria-label="Copo de açaí"
          className="absolute left-[8%] top-[8%] aspect-square w-[84%] rounded-full border-4 border-amber bg-cream"
        />
      )}
      {(volume || preco) && (
        <div className="badge-selo">
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
