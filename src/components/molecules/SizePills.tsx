import { formatarPreco, TAMANHOS, TamanhoAcai } from '../../data/menu';
import { Pill } from '../atoms/Pill';

interface Props {
  selecionado: TamanhoAcai | null;
  onSelecionar: (t: TamanhoAcai) => void;
}

/** Molécula: lista de pílulas de tamanho/preço. */
export function SizePills({ selecionado, onSelecionar }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {TAMANHOS.map((t) => (
        <Pill
          key={t.id}
          volume={t.volume}
          preco={formatarPreco(t.preco)}
          ativo={selecionado?.id === t.id}
          onClick={() => onSelecionar(t)}
        />
      ))}
    </div>
  );
}
