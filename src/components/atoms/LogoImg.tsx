import logo from '../../assets/logo.jpg';

interface Props {
  className?: string;
}

/** Átomo: logo da marca (imagem). Já vem em círculo roxo. */
export function LogoImg({ className }: Props) {
  return (
    <img
      src={logo}
      alt="Logo Monte seu Açaí"
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
