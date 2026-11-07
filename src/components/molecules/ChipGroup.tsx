import { motion } from 'framer-motion';
import type { CorCategoria } from '../../data/menu';
import { Chip } from '../atoms/Chip';

interface Props {
  titulo: string;
  cor: CorCategoria;
  opcoes: string[];
  selecionados: string[];
  onToggle: (valor: string) => void;
  tema?: 'escuro' | 'claro';
}

// Os chips surgem em cascata quando a seção entra na tela, sinalizando que
// são elementos interativos.
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};
const item = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
};

/**
 * Molécula: rótulo + conjunto de chips selecionáveis com um propósito único
 * (escolher complementos, coberturas, frutas...). O rótulo mostra quantos
 * itens já foram escolhidos, o que ajuda em listas longas.
 */
export function ChipGroup({
  titulo,
  cor,
  opcoes,
  selecionados,
  onToggle,
  tema = 'escuro',
}: Props) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="mb-3 inline-block rounded-md bg-amber px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-deep">
        {titulo}
        {selecionados.length > 0 && <> · {selecionados.length}</>}
      </div>
      <motion.div
        className="flex flex-wrap gap-2"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {opcoes.map((opcao) => (
          <motion.div key={opcao} variants={item}>
            <Chip
              label={opcao}
              cor={cor}
              tema={tema}
              ativo={selecionados.includes(opcao)}
              onToggle={() => onToggle(opcao)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
