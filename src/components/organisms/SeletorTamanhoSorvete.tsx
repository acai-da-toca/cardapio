import { formatarPreco, TAMANHOS, type TamanhoAcai } from '../../data/menu';
import { SORVETE_IMG } from '../../data/sorvete';
import { FotoProduto } from '../atoms/FotoProduto';
import { SizePills } from '../molecules/SizePills';

interface Props {
  selecionado: TamanhoAcai | null;
  onSelecionar: (t: TamanhoAcai) => void;
}

/**
 * Organismo: foto do sorvete em destaque + pílulas de tamanho/preço. Mesmos
 * tamanhos e preços do açaí (self-service usa a mesma tabela).
 */
export function SeletorTamanhoSorvete({ selecionado, onSelecionar }: Props) {
  const destaque = selecionado ?? TAMANHOS[TAMANHOS.length - 1];

  if (!SORVETE_IMG) {
    return <SizePills selecionado={selecionado} onSelecionar={onSelecionar} />;
  }

  return (
    <div className="grid grid-cols-[minmax(120px,40%)_1fr] items-center gap-4 sm:gap-5">
      <FotoProduto
        src={SORVETE_IMG}
        volume={destaque.volume}
        preco={formatarPreco(destaque.preco)}
        alt="Sorvete self-service com calda, chantilly e casquinha"
      />
      <SizePills selecionado={selecionado} onSelecionar={onSelecionar} />
    </div>
  );
}
