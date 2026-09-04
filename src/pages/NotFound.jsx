import { useEffect } from "react";
import { Button } from "../components/Button";
import { ChurchSilhouette } from "../components/ChurchSilhouette";

export function NotFound() {
  useEffect(() => {
    document.title = "Página não encontrada — Paróquia São José";
  }, []);

  return (
    <div className="mesh-stone grain-overlay relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <ChurchSilhouette className="h-40 w-40 opacity-70" fill="var(--color-gold)" />
        <p className="mt-8 font-sans text-sm font-medium text-green-mid">Erro 404</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-ink md:text-4xl">
          Esta página não foi encontrada
        </h1>
        <p className="mt-4 max-w-md text-ink/75">
          O endereço acessado não existe ou foi movido. Volte para a página
          inicial e continue a navegação.
        </p>
        <Button as="link" to="/" variant="primary" className="mt-8">
          Voltar à página inicial
        </Button>
      </div>
    </div>
  );
}
