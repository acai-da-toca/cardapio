import { motion } from 'framer-motion';
import { TAMANHOS, TamanhoAcai } from '../../data/menu';
import { CherrySplash } from '../atoms/CherrySplash';
import { useCherrySplash } from '../../hooks/useCherrySplash';

interface Props {
  selecionado: TamanhoAcai | null;
  onSelecionar: (t: TamanhoAcai) => void;
  /** Tabela de tamanhos a listar. Padrão: tamanhos do açaí. */
  tamanhos?: TamanhoAcai[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
};

/**
 * Organismo: tabela do que vem em cada tamanho (linhas selecionáveis).
 * Frutas e coberturas contam dentro da cota de acompanhamentos, não são
 * limites à parte — por isso só mostra um número por tamanho.
 */
export function TabelaInclusoes({
  selecionado,
  onSelecionar,
  tamanhos = TAMANHOS,
}: Props) {
  return (
    <motion.div
      className="flex flex-col gap-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {tamanhos.map((t) => (
        <LinhaTamanho
          key={t.id}
          tamanho={t}
          ativo={selecionado?.id === t.id}
          onSelecionar={onSelecionar}
        />
      ))}
    </motion.div>
  );
}

function LinhaTamanho({
  tamanho: t,
  ativo,
  onSelecionar,
}: {
  tamanho: TamanhoAcai;
  ativo: boolean;
  onSelecionar: (t: TamanhoAcai) => void;
}) {
  const { pontos, disparar } = useCherrySplash();

  return (
    <motion.button
      type="button"
      aria-pressed={ativo}
      onClick={(e) => {
        disparar(e);
        onSelecionar(t);
      }}
      variants={item}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      className={`relative flex w-full scale-100 items-center justify-between gap-4 overflow-hidden rounded-xl border-2 px-4 py-3 text-left text-white transition-transform duration-200 ${
        ativo
          ? 'scale-[1.02] border-amber bg-gradient-to-br from-magenta to-deep shadow-[0_0_0_3px_rgba(253,183,91,.55)]'
          : 'border-transparent bg-gradient-to-br from-purple to-deep'
      }`}
    >
      <CherrySplash pontos={pontos} camada="front" />
      <div className="relative z-[1] text-lg font-bold">{t.volume}</div>
      <div className="relative z-[1] flex items-baseline gap-1.5">
        <span className="text-2xl font-bold leading-tight text-amber">
          {t.acompanhamentos}
        </span>
        <span className="text-xs text-white/90">acompanhamentos</span>
      </div>
    </motion.button>
  );
}
