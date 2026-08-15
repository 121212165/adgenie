-- AdGenie:额度扣减 RPC(原子操作,防并发超扣)
-- 对应 lib/credits.ts 的 decrement_credits 调用

create or replace function public.decrement_credits(uid uuid)
returns int
language plpgsql security definer set search_path = public
as $$
declare
  left_credits int;
begin
  update public.users
     set free_credits = greatest(free_credits - 1, 0)
   where id = uid
     and plan = 'free'
   returning free_credits into left_credits;

  if left_credits is null then
    -- 已付费(pro)用户不受免费额度限制,视为无限
    if exists (select 1 from public.users where id = uid and plan = 'pro') then
      return 999999;
    end if;
    return 0;
  end if;

  return left_credits;
end;
$$;
