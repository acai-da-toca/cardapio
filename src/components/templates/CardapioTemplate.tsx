import { DripBorder } from '../atoms/DripBorder';
import { LogoImg } from '../atoms/LogoImg';

interface Props {
  /** Hero de apresentação (largura total, logo abaixo do header). Opcional. */
  hero?: React.ReactNode;
  /** Organismos da área superior (tamanho + inclusões). */
  topo: React.ReactNode;
  /** Organismos da band roxa (montagem + extras + resumo). */
  band: React.ReactNode;
}

/**
 * Template: esqueleto de layout do cardápio (header, hero, área clara, band
 * roxa, footer). Define a estrutura; o conteúdo real vem via props.
 */
export function CardapioTemplate({ hero, topo, band }: Props) {
  return (
    <main className="relative mx-auto w-full max-w-card overflow-x-hidden bg-page-glow">
      <header className="flex flex-col items-center px-5 pb-4 pt-6">
        <h1 className="flex items-center gap-2">
          <LogoImg className="size-[72px] flex-none rounded-full" />
          <span className="flex flex-col items-start leading-none">
            <span className="ml-0.5 text-sm font-normal uppercase tracking-[0.22em] text-purple">
              Açaí da
            </span>
            <span className="font-display text-5xl leading-[0.95] text-magenta">
              TOCA
            </span>
          </span>
        </h1>
        <div className="mt-3 flex w-full items-center gap-2">
          <i className="h-px flex-1 bg-gradient-to-r from-transparent to-purple/35" />
          <span className="text-xs uppercase tracking-[0.3em] text-purple">
            Monte seu açaí
          </span>
          <i className="h-px flex-1 bg-gradient-to-l from-transparent to-purple/35" />
        </div>
      </header>

      {hero}

      <div className="px-5">{topo}</div>

      <div className="relative mt-6 bg-purple px-5 pb-10">
        {/* calda derramando: faixa reta cola no topo da band e os pingos descem
            sobre o roxo (sem degrau) */}
        <DripBorder className="absolute inset-x-0 top-0 block h-7 w-full" />
        <div className="relative z-10 pt-10">{band}</div>
      </div>
    </main>
  );
}
