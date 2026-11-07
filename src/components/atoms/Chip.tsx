import { motion } from 'framer-motion';
import type { CorCategoria } from '../../data/menu';
import { useCherrySplash } from '../../hooks/useCherrySplash';
import { CherrySplash } from './CherrySplash';

const COR_HEX: Record<CorCategoria, string> = {
  fruta: '#FF7A8A',
  cobertura: '#8FD694',
  complemento: '#FDB75B',
  sorvete: '#7FD1FF',
  adicional: '#FF8A5B',
  sabor: '#C2307F',
};

interface Props {
  label: string;
  cor: CorCategoria;
  ativo: boolean;
  onToggle: () => void;
  /** 'escuro' = sobre fundo roxo (padrão); 'claro' = sobre fundo creme. */
  tema?: 'escuro' | 'claro';
}

/**
 * Átomo: chip selecionável. Ao tocar, uma mancha de cereja esmagada espirra no
 * ponto exato do clique (signature moment). Estado selecionado bem visível:
 * preenchido + anel da cor do grupo + "✓".
 */
export function Chip({ label, cor, ativo, onToggle, tema = 'escuro' }: Props) {
  const hex = COR_HEX[cor];
  const claro = tema === 'claro';
  const { pontos, disparar } = useCherrySplash();

  const estilo = ativo
    ? claro
      ? 'bg-purple text-white shadow-md'
      : 'bg-white text-deep shadow-md'
    : claro
      ? 'border-purple/30 bg-white text-purple'
      : 'border-white/40 bg-white/10 text-white';

  const corIndicador = ativo
    ? claro
      ? 'text-amber'
      : 'text-magenta'
    : claro
      ? 'text-purple/50'
      : 'text-white/60';

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
      className={`relative flex items-center gap-2 overflow-hidden rounded-full border-2 px-3 py-1.5 text-sm font-bold ${estilo}`}
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
        className={`relative z-[1] ml-0.5 text-xs font-bold ${corIndicador}`}
        aria-hidden="true"
      >
        {ativo ? '✓' : '+'}
      </span>
    </motion.button>
  );
}
