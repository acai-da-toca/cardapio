import { AnimatePresence, motion } from 'framer-motion';

export interface SplashPonto {
  id: number;
  x: number;
  y: number;
}

interface Props {
  pontos: SplashPonto[];
  /** Camada do splash. 'back' (z-0, atrás do conteúdo) ou 'front' (z-10, por cima). */
  camada?: 'back' | 'front';
}

// border-radius assimétrico = mancha orgânica (não círculo perfeito).
const BLOB = '46% 54% 42% 58% / 52% 44% 56% 48%';

// Gotas que espirram: posição, tamanho e formato irregulares (polpa de cereja).
const GOTAS = [
  { dx: -24, dy: -16, s: 0.55, r: '60% 40% 55% 45% / 45% 55% 45% 55%' },
  { dx: 22, dy: -20, s: 0.42, r: '50% 50% 40% 60% / 60% 40% 60% 40%' },
  { dx: -18, dy: 20, s: 0.48, r: '45% 55% 60% 40% / 50% 60% 40% 50%' },
  { dx: 27, dy: 13, s: 0.36, r: '55% 45% 48% 52% / 42% 58% 42% 58%' },
  { dx: 4, dy: -28, s: 0.3, r: '50% 50% 55% 45% / 55% 45% 55% 45%' },
  { dx: -30, dy: 4, s: 0.26, r: '48% 52% 50% 50% / 50% 50% 48% 52%' },
];

/**
 * Átomo: mancha de cereja esmagada no ponto exato do clique.
 * Formas irregulares (blobs) + rotação = respingo orgânico, não um círculo
 * genérico. Renderize dentro de um container `relative overflow-hidden`.
 */
export function CherrySplash({ pontos, camada = 'back' }: Props) {
  return (
    <span
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        camada === 'front' ? 'z-10' : 'z-0'
      }`}
    >
      <AnimatePresence>
        {pontos.map((p) => (
          <span key={p.id}>
            {/* mancha central irregular que cresce, gira e some */}
            <motion.span
              className="absolute"
              style={{
                left: p.x,
                top: p.y,
                width: 22,
                height: 22,
                marginLeft: -11,
                marginTop: -11,
                borderRadius: BLOB,
                background:
                  'radial-gradient(circle at 42% 38%, #C21325 0%, #9d0c1a 50%, rgba(141,10,23,0) 74%)',
              }}
              initial={{ scale: 0, opacity: 0.95, rotate: -20 }}
              animate={{ scale: 6, opacity: [0.95, 0.5, 0], rotate: 25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* gotas irregulares que espirram */}
            {GOTAS.map((g, i) => (
              <motion.span
                key={i}
                className="absolute bg-[#B30F1F]"
                style={{
                  left: p.x,
                  top: p.y,
                  width: 12,
                  height: 12,
                  marginLeft: -6,
                  marginTop: -6,
                  borderRadius: g.r,
                }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0.95, rotate: 0 }}
                animate={{
                  x: g.dx,
                  y: g.dy,
                  scale: g.s,
                  opacity: [0.95, 0.65, 0],
                  rotate: g.dx > 0 ? 40 : -40,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            ))}
          </span>
        ))}
      </AnimatePresence>
    </span>
  );
}
