import { DicaToque } from './components/atoms/DicaToque';
import { LogoImg } from './components/atoms/LogoImg';
import { RevealOnScroll } from './components/atoms/RevealOnScroll';
import { SectionHeading } from './components/atoms/SectionHeading';
import { ChipGroup } from './components/molecules/ChipGroup';
import { BotaoPedido } from './components/organisms/BotaoPedido';
import { Extras } from './components/organisms/Extras';
import { HeroVideo } from './components/organisms/HeroVideo';
import { ResumoPedido } from './components/organisms/ResumoPedido';
import { SeletorTamanho } from './components/organisms/SeletorTamanho';
import { TabelaInclusoes } from './components/organisms/TabelaInclusoes';
import { CardapioTemplate } from './components/templates/CardapioTemplate';
import { HERO_VIDEO } from './data/copo';
import { LOJA } from './data/loja';
import { ACOMPANHAMENTOS, COBERTURAS, FRUTAS } from './data/menu';
import { usePedido } from './hooks/usePedido';

/** Página: cardápio "Monte seu Açaí" com conteúdo real. */
export default function App() {
  const pedido = usePedido();
  const { tamanho } = pedido;

  const topo = (
    <>
      <RevealOnScroll>
        <SectionHeading numero={1} titulo="Escolha o tamanho" />
        <SeletorTamanho
          selecionado={tamanho}
          onSelecionar={pedido.escolherTamanho}
        />
      </RevealOnScroll>

      <RevealOnScroll delay={0.05}>
        <SectionHeading numero={2} titulo="Escolha os acompanhamentos" />
        <TabelaInclusoes
          selecionado={tamanho}
          onSelecionar={pedido.escolherTamanho}
        />
      </RevealOnScroll>
    </>
  );

  const band = (
    <>
      <RevealOnScroll>
        <div className="mb-4 flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <SectionHeading numero={3} titulo="Monte do seu jeito" light />
          </div>
          <div className="hidden flex-none sm:block">
            <DicaToque />
          </div>
        </div>
      </RevealOnScroll>

      <ChipGroup
        titulo="Frutas"
        cor="fruta"
        opcoes={FRUTAS}
        selecionados={pedido.frutas}
        incluso={tamanho?.frutas ?? null}
        onToggle={pedido.toggleFruta}
      />
      <ChipGroup
        titulo="Coberturas"
        cor="cobertura"
        opcoes={COBERTURAS}
        selecionados={pedido.coberturas}
        incluso={tamanho?.coberturas ?? null}
        onToggle={pedido.toggleCobertura}
      />
      <ChipGroup
        titulo="Acompanhamentos"
        cor="acompanhamento"
        opcoes={ACOMPANHAMENTOS}
        selecionados={pedido.acompanhamentos}
        incluso={tamanho?.acompanhamentos ?? null}
        onToggle={pedido.toggleAcompanhamento}
      />

      <RevealOnScroll>
        <Extras trufado={pedido.trufado} onTrufado={pedido.setTrufado} />
      </RevealOnScroll>

      <ResumoPedido resumo={pedido.resumo} onLimpar={pedido.limpar} />

      <BotaoPedido resumo={pedido.resumo} />

      {/* respiro + divisória sutil separando o footer do conteúdo */}
      <footer className="mt-12 flex flex-col items-center gap-3 border-t border-white/15 pt-8">
        <LogoImg className="size-16 flex-none rounded-full border-2 border-amber" />
        <span className="font-display text-2xl text-cream">Açaí da Toca</span>
        <a
          href={LOJA.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-cream/90 transition-colors hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
            <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.4-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
          </svg>
          {LOJA.instagramHandle}
        </a>
        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-cream/60">
          📍 {LOJA.endereco}
        </span>
      </footer>

      {/* crédito discreto, no finalzinho de tudo (sem nome; clica e vai pro portfólio) */}
      <p className="mt-6 text-center text-[0.6rem] tracking-wide text-cream/40">
        © {new Date().getFullYear()} Açaí da Toca – Todos os direitos reservados ·{' '}
        <a
          href="https://edernatanzz.github.io/me/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 transition-colors hover:text-cream/70 hover:underline"
        >
          desenvolvido por
        </a>
      </p>
    </>
  );

  return (
    <CardapioTemplate
      hero={HERO_VIDEO ? <HeroVideo src={HERO_VIDEO} /> : undefined}
      topo={topo}
      band={band}
    />
  );
}
