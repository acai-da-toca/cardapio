import { motion } from 'framer-motion';
import { Chip } from '../atoms/Chip';

type Cor = 'fruta' | 'cobertura' | 'acompanhamento' | 'sorvete' | 'adicional';

interface Props {
  titulo: string;
  cor: Cor;
  opcoes: string[];
  selecionados: string[];
  incluso: number | null;
  onToggle: (valor: string) => void;
}

// Variants: os chips surgem em cascata (stagger) quando a seção entra na tela,
// sinalizando que são elementos interativos.
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};
const item = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
};

/**
 * Molécula: rótulo + conjunto de chips selecionáveis com um propósito único
 * (escolher frutas, coberturas ou acompanhamentos).
 */
export function ChipGroup({
  titulo,
  cor,
  opcoes,
  selecionados,
  incluso,
  onToggle,
}: Props) {
  const extras =
    incluso === null ? 0 : Math.max(0, selecionados.length - incluso);

  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-3 inline-block rounded-md bg-amber px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-deep">
        {titulo}
        {incluso !== null && (
          <>
            {' '}· {selecionados.length}/{incluso}
            {extras > 0 ? ` (+${extras})` : ''}
          </>
        )}
      </div>
      <motion.div
        className="flex flex-wrap gap-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {opcoes.map((opcao) => (
          <motion.div key={opcao} variants={item}>
            <Chip
              label={opcao}
              cor={cor}
              ativo={selecionados.includes(opcao)}
              onToggle={() => onToggle(opcao)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
