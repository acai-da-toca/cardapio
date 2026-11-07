import { motion } from 'framer-motion';
import {
  SABORES_BATIDA,
  type SaborBatida,
  type TamanhoBatida,
} from '../../data/batidas';
import { formatarPreco } from '../../data/menu';
import { useCherrySplash } from '../../hooks/useCherrySplash';
import { CherrySplash } from '../atoms/CherrySplash';

interface Props {
  saborId: string;
  tamanho: TamanhoBatida | null;
  onSelecionar: (id: string) => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
};

/** Organismo: lista de sabores, cada um com o preço do tamanho já escolhido. */
export function SeletorSabor({ saborId, tamanho, onSelecionar }: Props) {
  return (
    <motion.div
      className="flex flex-col gap-2"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {SABORES_BATIDA.map((s) => (
        <LinhaSabor
          key={s.id}
          sabor={s}
          tamanho={tamanho}
          ativo={s.id === saborId}
          onSelecionar={() => onSelecionar(s.id)}
        />
      ))}
    </motion.div>
  );
}

function LinhaSabor({
  sabor,
  tamanho,
  ativo,
  onSelecionar,
}: {
  sabor: SaborBatida;
  tamanho: TamanhoBatida | null;
  ativo: boolean;
  onSelecionar: () => void;
}) {
  const { pontos, disparar } = useCherrySplash();

  return (
    <motion.button
      type="button"
      aria-pressed={ativo}
      onClick={(e) => {
        disparar(e);
        onSelecionar();
      }}
      variants={item}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      animate={{ scale: ativo ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      className={`relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-xl border-2 px-4 py-3 text-left text-white ${
        ativo
          ? 'border-amber bg-gradient-to-br from-magenta to-deep shadow-[0_0_0_3px_rgba(253,183,91,.55)]'
          : 'border-transparent bg-gradient-to-br from-purple to-deep'
      }`}
    >
      <CherrySplash pontos={pontos} camada="front" />
      <span className="relative z-[1] text-base font-bold">{sabor.nome}</span>
      {tamanho && (
        <span className="relative z-[1] flex-none text-sm font-bold text-amber">
          {formatarPreco(sabor.precos[tamanho.id])}
        </span>
      )}
    </motion.button>
  );
}
