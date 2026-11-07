import { AnimatePresence, motion } from 'framer-motion';
import {
  formatarPreco,
  LINHAS,
  type LinhaAcai,
  type LinhaId,
} from '../../data/menu';
import { useCherrySplash } from '../../hooks/useCherrySplash';
import { CherrySplash } from '../atoms/CherrySplash';
import { ChipGroup } from '../molecules/ChipGroup';

interface Props {
  linhaSelecionada: LinhaId;
  onSelecionarLinha: (id: LinhaId) => void;
  sabor: string | null;
  onAlternarSabor: (nome: string) => void;
}

/**
 * Organismo: escolha entre Açaí Tradicional e Batidas de Açaí. Quando a linha
 * tem sabores (batidas), eles aparecem logo abaixo para escolher.
 */
export function SeletorLinha({
  linhaSelecionada,
  onSelecionarLinha,
  sabor,
  onAlternarSabor,
}: Props) {
  const linha = LINHAS.find((l) => l.id === linhaSelecionada);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {LINHAS.map((l) => (
          <CardLinha
            key={l.id}
            linha={l}
            ativo={l.id === linhaSelecionada}
            onSelecionar={() => onSelecionarLinha(l.id)}
          />
        ))}
      </div>

      <AnimatePresence initial={false}>
        {linha?.sabores && (
          <motion.div
            key="sabores"
            className="mt-5"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ChipGroup
              titulo="Sabor da batida"
              cor="sabor"
              tema="claro"
              opcoes={linha.sabores}
              selecionados={sabor ? [sabor] : []}
              onToggle={onAlternarSabor}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CardLinha({
  linha,
  ativo,
  onSelecionar,
}: {
  linha: LinhaAcai;
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
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      animate={{ scale: ativo ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      className={`relative flex flex-col gap-1 overflow-hidden rounded-2xl border-2 p-4 text-left ${
        ativo
          ? 'border-amber bg-gradient-to-br from-magenta to-deep text-white shadow-[0_0_0_3px_rgba(253,183,91,.55)]'
          : 'border-purple/20 bg-white text-deep'
      }`}
    >
      <CherrySplash pontos={pontos} camada="front" />
      <span className="relative z-[1] text-base font-bold leading-tight">
        {linha.nome}
      </span>
      <span
        className={`relative z-[1] text-xs leading-snug ${
          ativo ? 'text-white/80' : 'text-deep/70'
        }`}
      >
        {linha.descricao}
      </span>
      <span className="relative z-[1] mt-2 flex flex-col gap-0.5 text-sm font-bold">
        {linha.tamanhos.map((t) => (
          <span key={t.id} className="flex justify-between gap-2">
            <span>{t.volume}</span>
            <span className={ativo ? 'text-amber' : 'text-magenta'}>
              {formatarPreco(t.preco)}
            </span>
          </span>
        ))}
      </span>
    </motion.button>
  );
}
