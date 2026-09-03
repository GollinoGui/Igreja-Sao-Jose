import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../Button";

const EMPTY_ROW = { day_label: "", time: "", note: "" };

export function MassScheduleEditor() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRow, setNewRow] = useState(EMPTY_ROW);
  const [status, setStatus] = useState(null);

  async function loadRows() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("mass_schedule")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) {
        setStatus({ type: "error", text: error.message });
      } else {
        setRows(data ?? []);
      }
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRows();
  }, []);

  function handleUpdateField(id, field, value) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  }

  async function handleSaveRow(row) {
    setStatus(null);
    const { error } = await supabase
      .from("mass_schedule")
      .update({ day_label: row.day_label, time: row.time, note: row.note || null })
      .eq("id", row.id);
    setStatus(error ? { type: "error", text: error.message } : { type: "success", text: "Horário salvo." });
  }

  async function handleDeleteRow(id) {
    setStatus(null);
    const { error } = await supabase.from("mass_schedule").delete().eq("id", id);
    if (error) {
      setStatus({ type: "error", text: error.message });
      return;
    }
    setRows((current) => current.filter((row) => row.id !== id));
  }

  async function handleAddRow(event) {
    event.preventDefault();
    setStatus(null);
    const sort_order = rows.length > 0 ? Math.max(...rows.map((r) => r.sort_order ?? 0)) + 1 : 1;
    const { data, error } = await supabase
      .from("mass_schedule")
      .insert({ ...newRow, note: newRow.note || null, sort_order })
      .select()
      .single();
    if (error) {
      setStatus({ type: "error", text: error.message });
      return;
    }
    setRows((current) => [...current, data]);
    setNewRow(EMPTY_ROW);
  }

  return (
    <div>
      <h2 className="font-serif text-xl font-semibold text-ink">Horários de missa</h2>

      {status && (
        <p className={`mt-3 text-sm ${status.type === "error" ? "text-liturgical-red" : "text-green-mid"}`}>
          {status.text}
        </p>
      )}

      {loading ? (
        <p className="mt-4 text-ink/60">Carregando…</p>
      ) : (
        <div className="mt-4 space-y-3">
          {rows.map((row) => (
            <div key={row.id} className="grid grid-cols-1 gap-3 border border-stone-200 p-4 sm:grid-cols-[1fr_1fr_1.5fr_auto_auto]">
              <input
                aria-label="Dia"
                value={row.day_label}
                onChange={(event) => handleUpdateField(row.id, "day_label", event.target.value)}
                className="border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
              />
              <input
                aria-label="Horário"
                value={row.time}
                onChange={(event) => handleUpdateField(row.id, "time", event.target.value)}
                className="border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
              />
              <input
                aria-label="Observação"
                placeholder="Observação (opcional)"
                value={row.note ?? ""}
                onChange={(event) => handleUpdateField(row.id, "note", event.target.value)}
                className="border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
              />
              <Button type="button" variant="secondary" onClick={() => handleSaveRow(row)}>
                Salvar
              </Button>
              <Button type="button" variant="secondary" onClick={() => handleDeleteRow(row.id)}>
                Excluir
              </Button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleAddRow} className="mt-6 grid grid-cols-1 gap-3 border-t border-stone-200 pt-6 sm:grid-cols-[1fr_1fr_1.5fr_auto]">
        <input
          required
          aria-label="Dia"
          placeholder="Dia (ex: Sábado)"
          value={newRow.day_label}
          onChange={(event) => setNewRow((r) => ({ ...r, day_label: event.target.value }))}
          className="border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
        />
        <input
          required
          aria-label="Horário"
          placeholder="Horário (ex: 18h30)"
          value={newRow.time}
          onChange={(event) => setNewRow((r) => ({ ...r, time: event.target.value }))}
          className="border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
        />
        <input
          aria-label="Observação"
          placeholder="Observação (opcional)"
          value={newRow.note}
          onChange={(event) => setNewRow((r) => ({ ...r, note: event.target.value }))}
          className="border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
        />
        <Button type="submit" variant="primary">
          Adicionar
        </Button>
      </form>
    </div>
  );
}
