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

function plural(n: number, singular: string, pluralForm: string) {
  return n > 1 ? pluralForm : singular;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
};

/** Organismo: tabela do que vem em cada tamanho (linhas selecionáveis). */
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
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
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
      animate={{ scale: ativo ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      className={`relative grid w-full grid-cols-[72px_repeat(3,1fr)] items-center overflow-hidden rounded-xl border-2 px-4 py-3 text-left text-white ${
        ativo
          ? 'border-amber bg-gradient-to-br from-magenta to-deep shadow-[0_0_0_3px_rgba(253,183,91,.55)]'
          : 'border-transparent bg-gradient-to-br from-purple to-deep'
      }`}
    >
      <CherrySplash pontos={pontos} camada="front" />
      <div className="relative z-[1] text-lg font-bold">{t.volume}</div>
      <Stat n={t.coberturas} label={plural(t.coberturas, 'cobertura', 'coberturas')} />
      <Stat n={t.acompanhamentos} label="acomp." />
      <Stat n={t.frutas} label={plural(t.frutas, 'fruta', 'frutas')} />
    </motion.button>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="relative z-[1] flex flex-col items-center gap-0.5 border-l border-white/15 py-1">
      <div className="text-2xl font-bold leading-tight text-amber">{n}</div>
      <div className="text-xs text-white/90">{label}</div>
    </div>
  );
}
