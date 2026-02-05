-- ============================================
-- Villano.ai Supabase Schema
-- Run this in your Supabase SQL editor
-- ============================================

-- Enable RLS
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;

-- ============================================
-- LEADS TABLE (email capture)
-- ============================================
create table if not exists leads (
  id bigint generated always as identity primary key,
  email text not null unique,
  source text default 'landing',
  ip_address text,
  user_agent text,
  converted boolean default false,
  created_at timestamptz default now()
);

create index if not exists leads_email_idx on leads (email);
create index if not exists leads_created_at_idx on leads (created_at);

-- RLS: anon can INSERT only, no read/update/delete
alter table leads enable row level security;

create policy "Allow anonymous email capture"
  on leads for insert
  to anon
  with check (true);

create policy "Service role full access on leads"
  on leads for all
  to service_role
  using (true)
  with check (true);

-- ============================================
-- PURCHASES TABLE (payment tracking)
-- ============================================
create table if not exists purchases (
  id bigint generated always as identity primary key,
  email text not null,
  name text,
  mercadopago_payment_id text unique,
  mercadopago_status text not null,
  amount numeric(10,2) not null,
  currency text default 'USD',
  product text default 'metodo-villano',
  delivered boolean default false,
  delivered_at timestamptz,
  raw_webhook jsonb,
  created_at timestamptz default now()
);

create index if not exists purchases_email_idx on purchases (email);
create index if not exists purchases_status_idx on purchases (mercadopago_status) where mercadopago_status = 'approved';
create index if not exists purchases_mp_id_idx on purchases (mercadopago_payment_id);

-- RLS: no public access, service_role only
alter table purchases enable row level security;

create policy "Service role full access on purchases"
  on purchases for all
  to service_role
  using (true)
  with check (true);

-- ============================================
-- EVENTS TABLE (analytics)
-- ============================================
create table if not exists events (
  id bigint generated always as identity primary key,
  event_type text not null,
  session_id text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create index if not exists events_type_created_idx on events (event_type, created_at);
create index if not exists events_session_idx on events (session_id);

-- RLS: anon can INSERT only
alter table events enable row level security;

create policy "Allow anonymous event tracking"
  on events for insert
  to anon
  with check (true);

create policy "Service role full access on events"
  on events for all
  to service_role
  using (true)
  with check (true);
