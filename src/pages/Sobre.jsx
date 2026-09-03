import { useEffect } from "react";
import { HISTORY_MILESTONES } from "../lib/content";
import { TrinityDivider } from "../components/TrinityDivider";
import { ScriptureQuote } from "../components/ScriptureQuote";

export function Sobre() {
  useEffect(() => {
    document.title = "Sobre — Paróquia São José";
  }, []);

  return (
    <div>
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-20">
        <p className="font-sans text-sm font-medium text-green-mid">Sobre a paróquia</p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl font-semibold text-ink md:text-5xl">
          Uma história de mais de 130 anos
        </h1>
        <p className="mt-6 max-w-xl content-measure text-lg text-ink/80">
          Da antiga capela de madeira à Igreja Matriz erguida em pedra, a
          Paróquia São José acompanha a história de Orlândia desde o fim do
          século XIX.
        </p>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <ol className="space-y-10 border-l border-stone-200 pl-8">
          {HISTORY_MILESTONES.map((item) => (
            <li key={item.year} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[38px] top-1 h-2.5 w-2.5 rounded-full bg-gold"
              />
              <p className="font-sans text-sm font-medium text-gold">{item.year}</p>
              <h2 className="mt-1 font-serif text-xl font-semibold text-ink md:text-2xl">
                {item.title}
              </h2>
              <p className="mt-2 max-w-xl content-measure text-ink/80">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <TrinityDivider className="mx-auto max-w-6xl px-6" />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
            Dois José, uma mesma providência
          </h2>
          <div className="mt-6 space-y-4 content-measure text-ink/80">
            <p>
              A tradição cristã sempre viu, no José do Antigo Testamento, uma
              figura que anuncia o José do Evangelho. O filho de Jacó, contador
              de sonhos, foi vendido pelos próprios irmãos e, ainda assim,
              tornou-se governador do Egito — posição da qual salvaria seu povo
              da fome (Gn 37–50).
            </p>
            <p>
              Muitos séculos depois, outro José — esposo de Maria — é também
              guiado por sonhos e pela visita de um anjo. É ele quem recebe, em
              sono, a missão de acolher o filho que Maria esperava, e quem mais
              tarde conduz a Sagrada Família em fuga para o Egito, o mesmo
              lugar onde o primeiro José havia reinado (Mt 1–2).
            </p>
            <p>
              Dois homens chamados José, dois caminhos até o Egito, uma mesma
              confiança na providência de Deus — um paralelo que a Igreja
              recorda com carinho especial numa paróquia que leva o nome do
              segundo.
            </p>
          </div>
          <ScriptureQuote
            className="mt-8"
            text="Um anjo do Senhor lhe apareceu em sonho e disse: José, filho de Davi, não temas receber Maria, tua mulher"
            reference="Mt 1,20"
          />
        </div>
      </section>
    </div>
  );
}
