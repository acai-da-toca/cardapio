import { motion } from 'framer-motion';
import { useCherrySplash } from '../../hooks/useCherrySplash';
import { CherrySplash } from '../atoms/CherrySplash';

export type ModoPedido = 'copo' | 'batida' | 'sorvete';

const OPCOES: {
  id: ModoPedido;
  titulo: string;
  descricao: string;
  gradienteIdle: string;
  gradienteAtivo: string;
}[] = [
  {
    id: 'copo',
    titulo: 'Açaí no Copo',
    descricao: 'Monte com frutas, coberturas e acompanhamentos',
    gradienteIdle: 'from-purple/90 to-deep',
    gradienteAtivo: 'from-magenta to-deep',
  },
  {
    id: 'batida',
    titulo: 'Batida de Açaí',
    descricao: 'Na garrafinha, escolha o sabor',
    gradienteIdle: 'from-purple/90 to-deep',
    gradienteAtivo: 'from-magenta to-deep',
  },
  {
    id: 'sorvete',
    titulo: 'Sorvete',
    descricao: 'Monte com frutas, coberturas e acompanhamentos',
    gradienteIdle: 'from-purple/90 to-deep',
    gradienteAtivo: 'from-magenta to-deep',
  },
];

interface Props {
  modo: ModoPedido;
  onSelecionar: (modo: ModoPedido) => void;
}

export function SeletorModo({ modo, onSelecionar }: Props) {
  return (
    <div className="mb-2">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-purple">
        O que voc&#xEA; quer pedir?
      </p>
      <div className="grid grid-cols-2 gap-3">
        {OPCOES.map((o, i) => {
          const sozinhoNaLinha =
            i === OPCOES.length - 1 && OPCOES.length % 2 !== 0;
          return (
            <CartaoModo
              key={o.id}
              opcao={o}
              ativo={modo === o.id}
              largo={sozinhoNaLinha}
              onSelecionar={() => onSelecionar(o.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

function CartaoModo({
  opcao,
  ativo,
  largo,
  onSelecionar,
}: {
  opcao: (typeof OPCOES)[number];
  ativo: boolean;
  largo?: boolean;
  onSelecionar: () => void;
}) {
  const { pontos, disparar } = useCherrySplash();
  const grad = ativo ? opcao.gradienteAtivo : opcao.gradienteIdle;

  return (
    <motion.button
      type="button"
      aria-pressed={ativo}
      onClick={(e) => {
        disparar(e);
        onSelecionar();
      }}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      animate={{ scale: ativo ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      className={`relative flex flex-col items-center gap-1.5 overflow-hidden rounded-2xl border-2 px-4 py-4 text-center text-white bg-gradient-to-br ${grad} ${
        largo ? 'col-span-2' : ''
      } ${
        ativo
          ? 'border-amber shadow-[0_0_0_3px_rgba(253,183,91,.55)]'
          : 'border-transparent'
      }`}
    >
      <CherrySplash pontos={pontos} camada="front" />
      <span className="relative z-[1] text-base font-bold leading-tight">
        {opcao.titulo}
      </span>
      <span className="relative z-[1] text-[0.7rem] leading-snug text-white/75">
        {opcao.descricao}
      </span>
    </motion.button>
  );
}
