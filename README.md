# Monte seu Açaí — Cardápio Digital

Frontend interativo do cardápio "Monte seu Açaí". O cliente escolhe o tamanho,
monta frutas / coberturas / acompanhamentos, pode adicionar copo trufado e vê o
total calculado em tempo real (incluindo adicionais por item extra).

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS (design tokens no `tailwind.config.js`)
- Three.js (copo de açaí 3D realista, arraste para girar — carregado sob demanda)

## Organização (Atomic Design)

```
src/components/
  atoms/       Logo, SectionHeading, Chip, Pill
  molecules/   ChipGroup, SizePills
  organisms/   SeletorTamanho, TabelaInclusoes, Extras, ResumoPedido, AcaiCopo3D
  templates/   CardapioTemplate   (esqueleto de layout)
  src/App.tsx  página (template + conteúdo real + estado do pedido)
```

Átomos são elementos isolados; moléculas agrupam átomos com um propósito único;
organismos são seções da interface; o template define o layout; a página preenche
com conteúdo real. Cores e fontes ficam como design tokens em `tailwind.config.js`.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # build de produção em dist/
npm run preview  # pré-visualiza o build
```

## Estrutura

```
src/
  data/menu.ts            # tamanhos, preços, itens e regras (fonte única de verdade)
  hooks/usePedido.ts      # estado do pedido + cálculo de extras e total
  components/
    SeletorTamanho.tsx    # etapa 1: escolha do tamanho
    SeletorItens.tsx      # chips de frutas/coberturas/acompanhamentos
    SeletorTrufado.tsx    # opção de copo trufado
    ResumoPedido.tsx      # resumo e total em tempo real
  App.tsx                 # composição da página
  styles/global.css       # identidade visual (roxo/magenta/laranja)
```

## Regras de preço

| Tamanho | Preço     | Coberturas | Acomp. | Frutas |
| ------- | --------- | ---------- | ------ | ------ |
| 330ml   | R$ 15,99  | 1          | 2      | 1      |
| 440ml   | R$ 18,99  | 1          | 2      | 2      |
| 550ml   | R$ 22,99  | 2          | 2      | 2      |
| 770ml   | R$ 34,90  | 2          | 3      | 2      |

- Cada item além do incluso: **+R$ 3,00**
- Copo trufado (Nutella / Ovomaltine / Creme Leitinho): **+R$ 5,00**

Para ajustar preços ou itens, edite apenas `src/data/menu.ts`.
