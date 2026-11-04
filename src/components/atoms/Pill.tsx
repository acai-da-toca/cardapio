import { motion } from 'framer-motion';
import { CherrySplash } from './CherrySplash';
import { useCherrySplash } from '../../hooks/useCherrySplash';

interface Props {
  volume: string;
  preco: string;
  ativo: boolean;
  onClick: () => void;
}

/** Átomo: pílula de tamanho (volume + preço), com splash de cereja no clique. */
export function Pill({ volume, preco, ativo, onClick }: Props) {
  const { pontos, disparar } = useCherrySplash();

  return (
    <motion.button
      type="button"
      aria-pressed={ativo}
      onClick={(e) => {
        disparar(e);
        onClick();
      }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      animate={{ scale: ativo ? 1.03 : 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 26 }}
      className={`relative flex h-10 overflow-hidden rounded-full text-white ${
        ativo ? 'shadow-[0_0_0_3px_#FDB75B]' : 'hover:shadow-md'
      }`}
    >
      <CherrySplash pontos={pontos} camada="front" />
      <span className="relative z-[1] flex w-[44%] items-center bg-magenta pl-4 text-sm font-bold">
        {volume}
      </span>
      <span
        className={`relative z-[1] flex flex-1 items-center justify-center text-sm ${
          ativo ? 'bg-deep' : 'bg-purple'
        }`}
      >
        {preco}
      </span>
    </motion.button>
  );
}
