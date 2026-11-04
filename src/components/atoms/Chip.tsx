import { motion } from 'framer-motion';
import { CherrySplash } from './CherrySplash';
import { useCherrySplash } from '../../hooks/useCherrySplash';

type Cor = 'fruta' | 'cobertura' | 'acompanhamento';

const COR_HEX: Record<Cor, string> = {
  fruta: '#FF7A8A',
  cobertura: '#8FD694',
  acompanhamento: '#FDB75B',
};

interface Props {
  label: string;
  cor: Cor;
  ativo: boolean;
  onToggle: () => void;
}

/**
 * Átomo: chip selecionável. Ao tocar, uma mancha de cereja esmagada espirra no
 * ponto exato do clique (signature moment). Estado selecionado bem visível:
 * preenchido branco + anel da cor do grupo.
 */
export function Chip({ label, cor, ativo, onToggle }: Props) {
  const hex = COR_HEX[cor];
  const { pontos, disparar } = useCherrySplash();

  return (
    <motion.button
      type="button"
      aria-pressed={ativo}
      onClick={(e) => {
        disparar(e);
        onToggle();
      }}
      layout
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      className={`relative flex items-center gap-2 overflow-hidden rounded-full border-2 px-3 py-1.5 text-sm font-bold ${
        ativo
          ? 'bg-white text-deep shadow-md'
          : 'border-white/40 bg-white/10 text-white'
      }`}
      style={ativo ? { borderColor: hex } : undefined}
    >
      <CherrySplash pontos={pontos} camada="front" />

      {/* bolinha da cor que "espirra" ao selecionar */}
      <motion.span
        className="relative z-[1] size-2.5 flex-none rounded-full"
        style={{ backgroundColor: hex }}
        animate={ativo ? { scale: [1, 1.8, 1] } : { scale: 1 }}
        transition={{ duration: 0.4 }}
      />
      <span className="relative z-[1]">{label}</span>

      {/* affordance: + para adicionar, ✓ quando selecionado */}
      <span
        className={`relative z-[1] ml-0.5 text-xs font-bold ${
          ativo ? 'text-magenta' : 'text-white/60'
        }`}
        aria-hidden="true"
      >
        {ativo ? '✓' : '+'}
      </span>
    </motion.button>
  );
}
