import { COPO_IMG } from '../../data/copo';
import {
  formatarPreco,
  type LinhaAcai,
  type TamanhoPreco,
} from '../../data/menu';
import { CopoFoto } from '../atoms/CopoFoto';
import { SizePills } from '../molecules/SizePills';
import { AcaiCopo3D } from './AcaiCopo3D';

interface Props {
  linha: LinhaAcai;
  selecionado: TamanhoPreco | null;
  onSelecionar: (id: string) => void;
}

/**
 * Organismo: copo em destaque + pílulas de tamanho/preço da linha escolhida.
 * Usa a foto realista (COPO_IMG) quando disponível; senão, o copo 3D procedural.
 */
export function SeletorTamanho({ linha, selecionado, onSelecionar }: Props) {
  // O selo mostra o tamanho escolhido ou, por padrão, o maior da linha.
  const destaque = selecionado ?? linha.tamanhos[linha.tamanhos.length - 1];
  const volume = destaque.volume;
  const preco = formatarPreco(destaque.preco);

  return (
    <div className="grid grid-cols-[minmax(120px,40%)_1fr] items-center gap-4 sm:gap-5">
      {COPO_IMG ? (
        <CopoFoto src={COPO_IMG} volume={volume} preco={preco} />
      ) : (
        <AcaiCopo3D volume={volume} preco={preco} />
      )}
      <SizePills
        tamanhos={linha.tamanhos}
        selecionadoId={selecionado?.id ?? null}
        onSelecionar={onSelecionar}
      />
    </div>
  );
}
