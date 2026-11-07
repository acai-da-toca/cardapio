import { BATIDA_IMG, SABORES_BATIDA, TAMANHOS_BATIDA } from '../../data/batidas';
import { formatarPreco } from '../../data/menu';
import { GarrafaFoto } from '../atoms/GarrafaFoto';
import { Pill } from '../atoms/Pill';

interface Props {
  tamanhoId: string | null;
  onSelecionar: (id: string) => void;
}

/** Menor preço entre os sabores para um tamanho (o Tradicional é sempre o mais barato). */
function precoMinimo(tamanhoId: string): number {
  return Math.min(...SABORES_BATIDA.map((s) => s.precos[tamanhoId]));
}

/**
 * Organismo: garrafinha em destaque + pílulas de tamanho. O sabor ainda não
 * foi escolhido neste passo, então o preço mostrado é o mínimo (Tradicional);
 * o valor final aparece no resumo após o sabor ser definido.
 */
export function SeletorTamanhoBatida({ tamanhoId, onSelecionar }: Props) {
  const destaque =
    TAMANHOS_BATIDA.find((t) => t.id === tamanhoId) ??
    TAMANHOS_BATIDA[TAMANHOS_BATIDA.length - 1];

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[minmax(120px,40%)_1fr] items-center gap-4 sm:gap-5">
        {BATIDA_IMG && (
          <GarrafaFoto
            src={BATIDA_IMG}
            volume={destaque.volume}
            preco={formatarPreco(precoMinimo(destaque.id))}
            alt="Açaí na garrafinha"
          />
        )}
        <div className="flex flex-col gap-2">
          {TAMANHOS_BATIDA.map((t) => (
            <Pill
              key={t.id}
              volume={t.volume}
              preco={formatarPreco(precoMinimo(t.id))}
              ativo={tamanhoId === t.id}
              onClick={() => onSelecionar(t.id)}
            />
          ))}
        </div>
      </div>
      <p className="text-xs text-purple/70">
        Valor a partir do Tradicional — o sabor escolhido no próximo passo pode mudar o preço.
      </p>
    </div>
  );
}
