import { useState } from 'react';
import { CampoValorReais } from './components/atoms/CampoValorReais';
import { DicaToque } from './components/atoms/DicaToque';
import { LogoImg } from './components/atoms/LogoImg';
import { RevealOnScroll } from './components/atoms/RevealOnScroll';
import { SectionHeading } from './components/atoms/SectionHeading';
import { ChipGroup } from './components/molecules/ChipGroup';
import { BotaoPedido } from './components/organisms/BotaoPedido';
import { BotaoPedidoBatida } from './components/organisms/BotaoPedidoBatida';
import { ResumoBatida } from './components/organisms/ResumoBatida';
import { SeletorModo, type ModoPedido } from './components/organisms/SeletorModo';
import { SeletorSabor } from './components/organisms/SeletorSabor';
import { SeletorTamanhoBatida } from './components/organisms/SeletorTamanhoBatida';
import { SeletorTamanhoSorvete } from './components/organisms/SeletorTamanhoSorvete';
import { Extras } from './components/organisms/Extras';
import { HeroVideo } from './components/organisms/HeroVideo';
import { ResumoPedido } from './components/organisms/ResumoPedido';
import { SeletorTamanho } from './components/organisms/SeletorTamanho';
import { TabelaInclusoes } from './components/organisms/TabelaInclusoes';
import { CardapioTemplate } from './components/templates/CardapioTemplate';
import { HERO_VIDEO } from './data/copo';
import { LOJA } from './data/loja';
import {
  ACOMPANHAMENTOS,
  ADICIONAIS,
  COBERTURAS,
  formatarPreco,
  FRUTAS,
  PRECO_SORVETE_KG,
  SORVETES,
} from './data/menu';
import { usePedido } from './hooks/usePedido';
import { usePedidoBatida } from './hooks/usePedidoBatida';

/**
 * Monta o fluxo "tamanho + monte do seu jeito" usado pelo açaí e pelo
 * sorvete — mesmas categorias e regras, só troca o estado e o nome do
 * produto nos textos (resumo e mensagem do WhatsApp).
 */
function montarFluxoEstiloAcai(
  p: ReturnType<typeof usePedido>,
  produto: string,
  SeletorDeTamanho: (props: {
    selecionado: ReturnType<typeof usePedido>['tamanho'];
    onSelecionar: ReturnType<typeof usePedido>['escolherTamanho'];
  }) => React.ReactElement,
) {
  const { tamanho } = p;

  const topo = (
    <>
      <RevealOnScroll>
        <SectionHeading numero={1} titulo="Escolha o tamanho" />
        <SeletorDeTamanho selecionado={tamanho} onSelecionar={p.escolherTamanho} />
      </RevealOnScroll>

      <RevealOnScroll delay={0.05}>
        <SectionHeading numero={2} titulo="Escolha os acompanhamentos" />
        <TabelaInclusoes selecionado={tamanho} onSelecionar={p.escolherTamanho} />
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
        selecionados={p.frutas}
        incluso={tamanho?.frutas ?? null}
        onToggle={p.toggleFruta}
      />
      <ChipGroup
        titulo="Coberturas"
        cor="cobertura"
        opcoes={COBERTURAS}
        selecionados={p.coberturas}
        incluso={tamanho?.coberturas ?? null}
        onToggle={p.toggleCobertura}
      />
      <ChipGroup
        titulo="Acompanhamentos"
        cor="acompanhamento"
        opcoes={ACOMPANHAMENTOS}
        selecionados={p.acompanhamentos}
        incluso={tamanho?.acompanhamentos ?? null}
        onToggle={p.toggleAcompanhamento}
      />
      <ChipGroup
        titulo="Sorvetes"
        cor="sorvete"
        opcoes={SORVETES}
        selecionados={p.sorvetes}
        incluso={null}
        onToggle={p.toggleSorvete}
      />
      {p.sorvetes.length > 0 && (
        <div className="-mt-3 mb-5">
          <label
            htmlFor={`valor-sorvete-${produto}`}
            className="mb-1.5 block text-xs text-white/70"
          >
            Sorvete {formatarPreco(PRECO_SORVETE_KG)}/kg. Quanto você quer gastar?
          </label>
          <CampoValorReais
            id={`valor-sorvete-${produto}`}
            valor={p.valorSorvete}
            onChange={p.setValorSorvete}
            placeholder="Ex.: 20"
          />
        </div>
      )}
      <ChipGroup
        titulo="Adicionais"
        cor="adicional"
        opcoes={ADICIONAIS}
        selecionados={p.adicionais}
        incluso={null}
        onToggle={p.toggleAdicional}
      />

      <RevealOnScroll>
        <Extras
          trufado={p.trufado}
          onTrufado={p.setTrufado}
          acaiZero={produto === 'açaí' ? p.acaiZero : undefined}
          onAcaiZero={produto === 'açaí' ? p.setAcaiZero : undefined}
        />
      </RevealOnScroll>

      <ResumoPedido
        resumo={p.resumo}
        onLimpar={p.limpar}
        onFormaPagamento={p.escolherFormaPagamento}
        produto={produto}
      />

      <BotaoPedido resumo={p.resumo} produto={produto} />
    </>
  );

  return { topo, band };
}

/** Página: cardápio "Monte seu Açaí" com conteúdo real. */
export default function App() {
  const pedido = usePedido();

  // Segunda e terceira opção: batida (garrafinha) e sorvete (self-service).
  // Cada fluxo tem o próprio estado, então ao alternar entre eles nada do
  // que o cliente já escolheu se perde.
  const [modo, setModo] = useState<ModoPedido>('copo');
  const batida = usePedidoBatida();
  const sorveteSelfService = usePedido();

  const { topo, band } = montarFluxoEstiloAcai(pedido, 'açaí', SeletorTamanho);
  const { topo: topoSorvete, band: bandSorvete } = montarFluxoEstiloAcai(
    sorveteSelfService,
    'sorvete',
    SeletorTamanhoSorvete,
  );

  // Rodapé compartilhado pelos dois modos (conteúdo idêntico ao de antes).
  const rodape = (
    <>
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

  const seletorModo = (
    <RevealOnScroll>
      <SeletorModo modo={modo} onSelecionar={setModo} />
    </RevealOnScroll>
  );

  const topoBatida = (
    <>
      <RevealOnScroll>
        <SectionHeading numero={1} titulo="Escolha o tamanho" />
        <SeletorTamanhoBatida
          tamanhoId={batida.tamanho?.id ?? null}
          onSelecionar={batida.escolherTamanho}
        />
      </RevealOnScroll>

      <RevealOnScroll delay={0.05}>
        <SectionHeading numero={2} titulo="Escolha o sabor" />
        <SeletorSabor
          saborId={batida.sabor.id}
          tamanho={batida.tamanho}
          onSelecionar={batida.escolherSabor}
        />
      </RevealOnScroll>
    </>
  );

  const batidaPronta = batida.tamanho !== null;

  const bandBatida = (
    <>
      {batidaPronta ? (
        <>
          <ResumoBatida
            sabor={batida.sabor}
            tamanho={batida.tamanho}
            preco={batida.preco}
            formaPagamento={batida.formaPagamento}
            onFormaPagamento={batida.escolherFormaPagamento}
            onLimpar={batida.limpar}
          />
          <BotaoPedidoBatida
            sabor={batida.sabor}
            tamanho={batida.tamanho}
            preco={batida.preco}
            formaPagamento={batida.formaPagamento}
          />
        </>
      ) : (
        <div className="flex flex-col items-center gap-3 py-8 text-center text-white/60">
          <p className="text-sm font-medium leading-relaxed">
            Escolha o tamanho e o sabor acima
            <br />
            para montar sua batida
          </p>
        </div>
      )}
    </>
  );

  const topoAtual =
    modo === 'batida' ? topoBatida : modo === 'sorvete' ? topoSorvete : topo;
  const bandAtual =
    modo === 'batida' ? bandBatida : modo === 'sorvete' ? bandSorvete : band;

  return (
    <CardapioTemplate
      hero={HERO_VIDEO ? <HeroVideo src={HERO_VIDEO} /> : undefined}
      topo={
        <>
          {seletorModo}
          {topoAtual}
        </>
      }
      band={
        <>
          {bandAtual}
          {rodape}
        </>
      }
    />
  );
}
