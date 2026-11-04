import { motion } from 'framer-motion';

interface Props {
  texto?: string;
}

/**
 * Átomo: dica de affordance ("toque para escolher"). O dedinho acena algumas
 * vezes e PARA — chama atenção no início sem virar distração contínua.
 */
export function DicaToque({ texto = 'toque para escolher' }: Props) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white/90">
      <motion.span
        aria-hidden="true"
        animate={{ rotate: [0, -18, 0, -18, 0] }}
        transition={{ duration: 1.2, repeat: 2, repeatDelay: 1.5, ease: 'easeInOut' }}
      >
        👆
      </motion.span>
      {texto}
    </span>
  );
}
