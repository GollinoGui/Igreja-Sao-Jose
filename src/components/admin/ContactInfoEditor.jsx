import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { CONTACT_FALLBACK } from "../../lib/content";
import { Button } from "../Button";

const FIELDS = [
  { key: "phone", label: "Telefone" },
  { key: "whatsapp_url", label: "URL do WhatsApp" },
  { key: "address", label: "Endereço" },
  { key: "email", label: "E-mail" },
  { key: "office_hours", label: "Horário de atendimento" },
  { key: "instagram_url", label: "URL do Instagram" },
];

export function ContactInfoEditor() {
  const [form, setForm] = useState(CONTACT_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from("contact_info").select("*").eq("id", 1).maybeSingle();
        if (data) setForm(data);
      } catch {
        // mantém os valores padrão em caso de falha de rede
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);
    const fields = Object.fromEntries(FIELDS.map(({ key }) => [key, form[key] ?? ""]));
    const { error } = await supabase.from("contact_info").upsert({ id: 1, ...fields });
    setStatus(error ? { type: "error", text: error.message } : { type: "success", text: "Dados de contato salvos." });
  }

  if (loading) return <p className="text-ink/60">Carregando…</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-serif text-xl font-semibold text-ink">Dados de contato</h2>

      {status && (
        <p className={`text-sm ${status.type === "error" ? "text-liturgical-red" : "text-green-mid"}`}>
          {status.text}
        </p>
      )}

      {FIELDS.map((field) => (
        <div key={field.key}>
          <label htmlFor={field.key} className="block text-sm font-medium text-ink">
            {field.label}
          </label>
          <input
            id={field.key}
            value={form[field.key] ?? ""}
            onChange={(event) => setForm((f) => ({ ...f, [field.key]: event.target.value }))}
            className="mt-1 w-full border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
          />
        </div>
      ))}

      <Button type="submit" variant="primary">
        Salvar
      </Button>
    </form>
  );
}
