import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Atraso em segundos, para escalonar seções em cascata. */
  delay?: number;
  className?: string;
}

/**
 * Átomo utilitário: anima o conteúdo surgindo suavemente de cima ao montar.
 * Dispara ao carregar a página, sem depender de IntersectionObserver — em
 * navegadores embutidos (WebView do Instagram, WhatsApp etc.) o scroll-reveal
 * via whileInView pode nunca disparar, deixando o conteúdo em opacidade 0
 * para sempre. Respeita reduced-motion (Framer Motion desativa sozinho).
 */
export function RevealOnScroll({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
