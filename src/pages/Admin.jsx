import { useEffect } from "react";
import { PasswordGate } from "../components/admin/PasswordGate";
import { MassScheduleEditor } from "../components/admin/MassScheduleEditor";
import { ContactInfoEditor } from "../components/admin/ContactInfoEditor";
import { NewsPostsManager } from "../components/admin/NewsPostsManager";

export function Admin() {
  useEffect(() => {
    document.title = "Admin — Paróquia São José";
  }, []);

  return (
    <PasswordGate>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-serif text-3xl font-semibold text-ink">Painel administrativo</h1>
        <p className="mt-2 text-ink/70">
          Gerencie horários de missa, dados de contato e notícias publicadas
          no site.
        </p>

        <section className="mt-12 border-t border-stone-200 pt-10">
          <MassScheduleEditor />
        </section>

        <section className="mt-12 border-t border-stone-200 pt-10">
          <ContactInfoEditor />
        </section>

        <section className="mt-12 border-t border-stone-200 pt-10">
          <NewsPostsManager />
        </section>
      </div>
    </PasswordGate>
  );
}
