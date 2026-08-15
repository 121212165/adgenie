-- AdGenie 初始建表 + RLS
-- 对应 tech-spec.md 数据模型:users / generations / payments

-- ========== users ==========
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  free_credits int not null default 3 check (free_credits >= 0),
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

-- 用户只能读/改自己
create policy "users_select_own" on public.users
  for select using (auth.uid() = id);
create policy "users_update_own" on public.users
  for update using (auth.uid() = id);

-- 注册时自动创建 users 行(触发器)
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.users (id, email, plan, free_credits)
  values (new.id, new.email, 'free', 3);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ========== generations ==========
create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  product_name text not null,
  image_url text not null,
  result_url text not null,
  platform text not null check (platform in ('facebook', 'instagram', 'tiktok')),
  size text not null,
  created_at timestamptz not null default now()
);

alter table public.generations enable row level security;

-- 用户只能读写自己的生成记录
create policy "generations_select_own" on public.generations
  for select using (auth.uid() = user_id);
create policy "generations_insert_own" on public.generations
  for insert with check (auth.uid() = user_id);

-- ========== payments ==========
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  stripe_session_id text unique not null,
  status text not null check (status in ('pending', 'succeeded', 'failed')),
  amount int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.payments enable row level security;

-- 用户只能读自己的支付记录;写入由服务端(RLS bypass 或 service role)处理
create policy "payments_select_own" on public.payments
  for select using (auth.uid() = user_id);

-- ========== 索引 ==========
create index if not exists idx_generations_user_id on public.generations (user_id);
create index if not exists idx_generations_created_at on public.generations (created_at desc);
create index if not exists idx_payments_user_id on public.payments (user_id);
