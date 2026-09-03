-- Paróquia São José — schema inicial do Supabase
-- Rode este arquivo no SQL Editor do Supabase (ou via supabase db push)

-- ============================================================
-- mass_schedule: horários de missa
-- ============================================================
create table if not exists mass_schedule (
  id uuid primary key default gen_random_uuid(),
  day_label text not null,        -- ex: "Terça a Sexta", "Sábado", "Domingo"
  sort_order int not null default 0,
  time text not null,             -- ex: "19h", "9h30"
  note text,                      -- observação opcional
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table mass_schedule enable row level security;

create policy "Public can read mass_schedule"
  on mass_schedule for select
  using (true);

-- TODO: restringir insert/update/delete a usuários autenticados quando
-- o Supabase Auth for implementado no /admin. Por enquanto liberado
-- para leitura pública e escrita anônima (protótipo).
create policy "Anon can write mass_schedule"
  on mass_schedule for all
  using (true)
  with check (true);

-- ============================================================
-- contact_info: linha única com dados de contato
-- ============================================================
create table if not exists contact_info (
  id int primary key default 1,
  phone text not null,
  whatsapp_url text not null,
  address text not null,
  email text not null,
  office_hours text not null,
  instagram_url text not null,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

alter table contact_info enable row level security;

create policy "Public can read contact_info"
  on contact_info for select
  using (true);

create policy "Anon can write contact_info"
  on contact_info for all
  using (true)
  with check (true);

-- ============================================================
-- news_posts: posts de notícias (embed do Instagram)
-- ============================================================
create table if not exists news_posts (
  id uuid primary key default gen_random_uuid(),
  embed_url text not null,        -- URL do post do Instagram
  caption text,                   -- legenda opcional
  published_at date not null default current_date,
  created_at timestamptz not null default now()
);

alter table news_posts enable row level security;

create policy "Public can read news_posts"
  on news_posts for select
  using (true);

create policy "Anon can write news_posts"
  on news_posts for all
  using (true)
  with check (true);

-- ============================================================
-- Seed: horários de missa (dado de 2013 — a confirmar com a secretaria)
-- ============================================================
insert into mass_schedule (day_label, sort_order, time, note)
select * from (values
  ('Terça a Sexta', 1, '19h', null::text),
  ('Sábado', 2, '18h30', null::text),
  ('Domingo', 3, '9h30', null::text),
  ('Domingo', 4, '19h', null::text)
) as seed(day_label, sort_order, time, note)
where not exists (select 1 from mass_schedule);

-- ============================================================
-- Seed: contato
-- ============================================================
insert into contact_info (id, phone, whatsapp_url, address, email, office_hours, instagram_url)
values (
  1,
  '(16) 3826-1315',
  'https://wa.me/5516992412269',
  'Praça São José, s/n, Centro, Orlândia-SP, CEP 14620-000',
  'pqsjorlandia@gmail.com',
  'Segunda a sexta, 8h às 18h; sábado, 8h às 11h30; domingo fechado',
  'https://www.instagram.com/matrizsaojoseorl/'
)
on conflict (id) do update set
  phone = excluded.phone,
  whatsapp_url = excluded.whatsapp_url,
  address = excluded.address,
  email = excluded.email,
  office_hours = excluded.office_hours,
  instagram_url = excluded.instagram_url;
