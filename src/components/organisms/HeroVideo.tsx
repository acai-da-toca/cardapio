import { useEffect, useRef, useState } from 'react';
import posterImg from '../../assets/copo-acai.jpg';

interface Props {
  src: string;
}

/**
 * Organismo: hero de apresentação no topo da página.
 * Vídeo em loop, autoplay mudo. No mobile o autoplay pode ser bloqueado
 * (ex.: modo de economia de energia do iOS); nesse caso mostramos um botão
 * de play sobre o pôster para o cliente iniciar com um toque.
 */
export function HeroVideo({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [precisaTocar, setPrecisaTocar] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // tenta iniciar via JS (mais confiável que só o atributo autoplay no mobile)
    const p = v.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => setPrecisaTocar(true));
    }
  }, []);

  function tocar() {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => setPrecisaTocar(false))
      .catch(() => setPrecisaTocar(true));
  }

  return (
    <section className="relative mx-5 mb-2 overflow-hidden rounded-3xl shadow-lg">
      <video
        ref={videoRef}
        className="block aspect-video w-full object-cover"
        src={src}
        poster={posterImg}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Apresentação do açaí"
      />

      {/* gradiente + selo pra dar acabamento de marca */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-3 left-4">
        <span className="rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-deep shadow">
          Feito na hora 🫐
        </span>
      </div>

      {/* botão de play (fallback quando o autoplay é bloqueado no mobile) */}
      {precisaTocar && (
        <button
          type="button"
          onClick={tocar}
          aria-label="Reproduzir vídeo"
          className="absolute inset-0 flex items-center justify-center bg-night/30"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-magenta" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </section>
  );
}
