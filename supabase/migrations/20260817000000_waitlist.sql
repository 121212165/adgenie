-- Waitlist 表(阶段3:未接支付前收集意向用户)
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- 只允许服务端(service role)写入;普通用户无需读取
create policy "waitlist_insert_via_service" on public.waitlist
  for insert with check (auth.role() = 'service_role');
