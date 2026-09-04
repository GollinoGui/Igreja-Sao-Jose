import { useInView } from "../hooks/useInView";

const DIRECTIONS = {
  up: "translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  none: "",
};

/**
 * Wrapper genérico de entrada ao rolar a página, usado nas seções internas
 * (fora do Hero, que tem sua própria coreografia). `delay` em ms permite
 * escalonar itens de uma lista/grade.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  direction = "up",
  className = "",
  children,
  ...props
}) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${DIRECTIONS[direction]}`
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      {...props}
    >
      {children}
    </Tag>
  );
}
