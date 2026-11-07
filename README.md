# Açaí da Toca — Cardápio Digital

Cardápio interativo do Açaí da Toca (Macaúbas-BA). O cliente escolhe o açaí
(Tradicional ou Batidas), o tamanho, monta com complementos, coberturas, frutas,
sorvetes e adicionais, vê o total em tempo real e envia o pedido pelo WhatsApp.

Publicado em https://acai-da-toca.github.io/cardapio/ (GitHub Actions → Pages).

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS (design tokens no `tailwind.config.js`)
- Framer Motion (animações)

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # build de produção em dist/
```

## Atualizando o cardápio

Itens e preços ficam em **`src/data/menu.ts`**; dados da loja (WhatsApp,
Instagram, endereço) em **`src/data/loja.ts`**.

- `LINHAS`: Tradicional e Batidas, com tamanhos, preços e sabores.
- `CATEGORIAS`: grupos de itens (complementos, coberturas, frutas, sorvetes, adicionais).
- `ADICIONAIS`: itens com preço. `preco: null` = "a confirmar" (entra na mensagem
  do WhatsApp como pendente e não soma no total).

## Organização (Atomic Design)

```
src/components/
  atoms/       Chip, Pill, CopoFoto, CherrySplash, SectionHeading, ...
  molecules/   ChipGroup, SizePills
  organisms/   SeletorLinha, SeletorTamanho, ResumoPedido, BotaoPedido, HeroVideo
  templates/   CardapioTemplate
src/hooks/     usePedido (estado e total do pedido), useCherrySplash
src/App.tsx    página (template + conteúdo + estado do pedido)
```
