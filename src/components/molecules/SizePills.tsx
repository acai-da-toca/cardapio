import { formatarPreco, type TamanhoPreco } from '../../data/menu';
import { Pill } from '../atoms/Pill';

interface Props {
  tamanhos: TamanhoPreco[];
  selecionadoId: string | null;
  onSelecionar: (id: string) => void;
}

/** Molécula: lista de pílulas de tamanho/preço. */
export function SizePills({ tamanhos, selecionadoId, onSelecionar }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {tamanhos.map((t) => (
        <Pill
          key={t.id}
          volume={t.volume}
          preco={formatarPreco(t.preco)}
          ativo={selecionadoId === t.id}
          onClick={() => onSelecionar(t.id)}
        />
      ))}
    </div>
  );
}
