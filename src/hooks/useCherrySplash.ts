import { useCallback, useRef, useState } from 'react';
import type { SplashPonto } from '../components/atoms/CherrySplash';

/**
 * Gerencia os splashes de cereja a partir da posição exata do clique.
 * `disparar` recebe o evento do pointer e calcula x/y relativos ao elemento.
 * Os pontos se autolimpam após a animação.
 */
export function useCherrySplash() {
  const [pontos, setPontos] = useState<SplashPonto[]>([]);
  const proximoId = useRef(0);

  const disparar = useCallback(
    (e: React.MouseEvent<HTMLElement> | React.PointerEvent<HTMLElement>) => {
      const alvo = e.currentTarget;
      const rect = alvo.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = proximoId.current++;
      setPontos((atual) => [...atual, { id, x, y }]);
      // remove o ponto depois que a animação termina (~1s)
      window.setTimeout(() => {
        setPontos((atual) => atual.filter((p) => p.id !== id));
      }, 1000);
    },
    [],
  );

  return { pontos, disparar };
}
