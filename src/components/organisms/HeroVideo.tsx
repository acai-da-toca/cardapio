import posterImg from '../../assets/copo-acai.jpg';

interface Props {
  src: string;
}

/**
 * Organismo: hero de apresentação no topo da página.
 * Vídeo em loop, autoplay mudo — a primeira coisa que o cliente vê, cria o
 * apetite na hora. Respeita reduced-motion (mostra só o poster parado).
 */
export function HeroVideo({ src }: Props) {
  return (
    <section className="relative mx-5 mb-2 overflow-hidden rounded-3xl shadow-lg">
      <video
        className="hidden aspect-video w-full object-cover motion-safe:block"
        src={src}
        poster={posterImg}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="Apresentação do açaí"
      />
      {/* fallback estático para reduced-motion */}
      <img
        src={posterImg}
        alt="Copo de açaí com morango, banana e granola"
        className="block aspect-video w-full object-cover motion-safe:hidden"
      />

      {/* gradiente + selo pra dar acabamento de marca */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-3 left-4">
        <span className="rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-deep shadow">
          Feito na hora 🫐
        </span>
      </div>
    </section>
  );
}
