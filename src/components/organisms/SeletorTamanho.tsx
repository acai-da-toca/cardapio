import { COPO_IMG } from '../../data/copo';
import { formatarPreco, TAMANHOS, TamanhoAcai } from '../../data/menu';
import { CopoFoto } from '../atoms/CopoFoto';
import { SizePills } from '../molecules/SizePills';
import { AcaiCopo3D } from './AcaiCopo3D';

interface Props {
  selecionado: TamanhoAcai | null;
  onSelecionar: (t: TamanhoAcai) => void;
}

/**
 * Organismo: copo em destaque + pílulas de tamanho/preço.
 * Usa a foto realista (COPO_IMG) quando disponível; senão, o copo 3D procedural.
 */
export function SeletorTamanho({ selecionado, onSelecionar }: Props) {
  const destaque = selecionado ?? TAMANHOS[TAMANHOS.length - 1];
  const volume = destaque.volume;
  const preco = formatarPreco(destaque.preco);

  return (
    <div className="grid grid-cols-[minmax(120px,40%)_1fr] items-center gap-4 sm:gap-5">
      {COPO_IMG ? (
        <CopoFoto src={COPO_IMG} volume={volume} preco={preco} />
      ) : (
        <AcaiCopo3D volume={volume} preco={preco} />
      )}
      <SizePills selecionado={selecionado} onSelecionar={onSelecionar} />
    </div>
  );
}
