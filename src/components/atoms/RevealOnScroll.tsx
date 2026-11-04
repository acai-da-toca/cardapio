import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Atraso em segundos, para escalonar seções em cascata. */
  delay?: number;
  className?: string;
}

/**
 * Átomo utilitário: revela o conteúdo ao entrar na viewport (cai suavemente de
 * cima). Dispara UMA vez — boa prática: guia o olhar sem virar loop/distração.
 * Respeita reduced-motion (Framer Motion desativa sozinho quando o usuário pede).
 */
export function RevealOnScroll({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
