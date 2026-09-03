# Igreja-Sao-Jose

Site oficial da Paróquia São José de Orlândia (SP) — Diocese de Franca. Traz horários de missas, história da igreja (fundada em 1893), notícias e acesso às redes sociais da comunidade.

## Stack

React + Vite, React Router, Tailwind CSS v4, Supabase.

## Rodando localmente

```bash
npm install
cp .env.example .env   # preencha com as chaves do seu projeto Supabase
npm run dev
```

## Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No SQL Editor do projeto, rode o conteúdo de `supabase/migrations/0001_init.sql` — isso cria as tabelas `mass_schedule`, `contact_info` e `news_posts`, com as policies de leitura pública e popula os dados iniciais (horários de missa e contato).
3. Copie a "Project URL" e a "anon public key" (Project Settings → API) para `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` no `.env`.

## Admin (`/admin`)

Protegido por uma senha simples definida em `VITE_ADMIN_PASSWORD` (ver `.env.example`). Isso é um placeholder — o TODO no código (`src/components/admin/PasswordGate.jsx`) marca onde substituir por Supabase Auth quando o protótipo for aprovado.

## Estrutura

```
src/
  components/   componentes de UI reutilizáveis (Navbar, Footer, Hero, ...)
  components/admin/  formulários de CRUD do painel /admin
  pages/        uma página por rota
  hooks/        hooks de dados (Supabase) e comportamento (scroll, motion)
  lib/          cliente Supabase, conteúdo institucional, calendário litúrgico
supabase/migrations/  schema + seed do banco
```
