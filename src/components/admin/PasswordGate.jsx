import { useState } from "react";
import { Button } from "../Button";

const SESSION_KEY = "psj-admin-unlocked";

// TODO: substituir por Supabase Auth quando o protótipo for aprovado.
// Por enquanto, uma senha única guardada em variável de ambiente protege
// o /admin no cliente — suficiente para manter o painel fora de buscadores
// e de acessos casuais, mas não é autenticação de verdade.
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (!ADMIN_PASSWORD) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-serif text-2xl font-semibold text-ink">Admin não configurado</h1>
        <p className="mt-4 text-ink/75">
          Defina <code>VITE_ADMIN_PASSWORD</code> no arquivo <code>.env</code>{" "}
          para habilitar o acesso ao painel administrativo.
        </p>
      </div>
    );
  }

  if (unlocked) return children;

  function handleSubmit(event) {
    event.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
      <h1 className="font-serif text-2xl font-semibold text-ink">Acesso administrativo</h1>
      <p className="mt-2 text-sm text-ink/70">
        Área restrita à equipe da paróquia.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="admin-password" className="block text-sm font-medium text-ink">
            Senha
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-ink focus:border-gold"
            autoFocus
          />
        </div>
        {error && <p className="text-sm text-liturgical-red">Senha incorreta.</p>}
        <Button type="submit" variant="primary" className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  );
}
