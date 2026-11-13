import { formatarPreco, TAMANHOS, TamanhoAcai } from '../../data/menu';
import { Pill } from '../atoms/Pill';

interface Props {
  selecionado: TamanhoAcai | null;
  onSelecionar: (t: TamanhoAcai) => void;
  /** Tabela de tamanhos a listar. Padrão: tamanhos do açaí. */
  tamanhos?: TamanhoAcai[];
}

/** Molécula: lista de pílulas de tamanho/preço. */
export function SizePills({ selecionado, onSelecionar, tamanhos = TAMANHOS }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {tamanhos.map((t) => (
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
