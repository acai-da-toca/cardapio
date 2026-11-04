import { COPO_TRUFADO, formatarPreco } from '../../data/menu';
import { WHATSAPP } from '../../data/loja';
import type { ResumoPedido as Resumo } from '../../hooks/usePedido';

interface Props {
  resumo: Resumo;
}

/** Monta a mensagem de pedido em texto a partir do resumo. */
function montarMensagem(r: Resumo): string {
  if (!r.tamanho) return '';
  const linhas: string[] = ['Olá! Quero montar meu açaí 🍨', ''];
  linhas.push(`🥤 Tamanho: ${r.tamanho.volume} (${formatarPreco(r.tamanho.preco)})`);
  if (r.frutas.length) linhas.push(`🍓 Frutas: ${r.frutas.join(', ')}`);
  if (r.coberturas.length) linhas.push(`🍫 Coberturas: ${r.coberturas.join(', ')}`);
  if (r.acompanhamentos.length)
    linhas.push(`✨ Acompanhamentos: ${r.acompanhamentos.join(', ')}`);
  const trufado = COPO_TRUFADO.find((t) => t.id === r.trufado)?.nome;
  if (trufado) linhas.push(`🍯 Trufado: ${trufado}`);
  linhas.push('', `💰 Total: ${formatarPreco(r.total)}`);
  return linhas.join('\n');
}

/**
 * Organismo: CTA de pedido. Barra fixa que desliza de baixo quando o cliente
 * escolhe o tamanho — transforma "ver o cardápio" em "fazer o pedido".
 */
export function BotaoPedido({ resumo }: Props) {
  if (!resumo.tamanho) return null;

  const mensagem = montarMensagem(resumo);
  const href = WHATSAPP
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`
    : undefined;

  const conteudo = (
    <>
      <span className="flex min-w-0 flex-col text-left leading-tight">
        <span className="truncate text-xs uppercase tracking-wider opacity-90">
          Seu açaí {resumo.tamanho.volume}
        </span>
        <span className="text-xl font-bold">{formatarPreco(resumo.total)}</span>
      </span>
      <span className="flex flex-none items-center gap-2 whitespace-nowrap rounded-full bg-white/20 px-3 py-2 text-sm font-bold sm:px-4">
        <span className="hidden xs:inline">Pedir no </span>WhatsApp
        <svg
          viewBox="0 0 24 24"
          className="size-5 fill-current"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.588 5.945l-.999 3.648 3.91-1.292z" />
        </svg>
      </span>
    </>
  );

  return (
    <div className="pointer-events-none sticky bottom-0 z-20 -mx-5 mt-4 px-5 pb-3">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex w-full items-center justify-between gap-3
            rounded-2xl bg-[#25a244] px-5 py-3 text-white shadow-xl
            transition-transform duration-150 hover:scale-[1.01] active:scale-95
            motion-safe:animate-slide-up"
        >
          {conteudo}
        </a>
      ) : (
        <div
          title="Configure o número do WhatsApp em src/data/loja.ts"
          className="pointer-events-auto flex w-full items-center justify-between gap-3
            rounded-2xl bg-[#25a244] px-5 py-3 text-white shadow-xl
            motion-safe:animate-slide-up"
        >
          {conteudo}
        </div>
      )}
    </div>
  );
}
