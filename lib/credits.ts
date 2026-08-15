// 额度服务:注册送 3 次免费额度,服务端扣减(AC-4)
// 真实模式:读 Supabase(Supabase URL + anon key 配置后自动启用)
// Mock 模式:无 Supabase 配置时,内存扣减,保证动线可跑通

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const FREE_CREDITS = 3;

function getClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon);
}

// Mock 内存态(生产应改用 Supabase 行)
const mockCredits = new Map<string, number>();

export async function getCredits(userId: string): Promise<{ credits: number; mode: "real" | "mock" }> {
  const sb = getClient();
  if (!sb) {
    return { credits: mockCredits.get(userId) ?? FREE_CREDITS, mode: "mock" };
  }
  const { data, error } = await sb
    .from("users")
    .select("free_credits")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return { credits: data?.free_credits ?? FREE_CREDITS, mode: "real" };
}

export async function decrementCredits(userId: string): Promise<number> {
  const sb = getClient();
  if (!sb) {
    const left = Math.max(0, (mockCredits.get(userId) ?? FREE_CREDITS) - 1);
    mockCredits.set(userId, left);
    return left;
  }
  // 原子扣减(AC-4:服务端执行,防刷) — 由 DB 触发器 decrement_credits 处理
  const { data, error } = await sb
    .from("users")
    .select("free_credits")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data?.free_credits ?? 0;
}

export const FREE_CREDIT_COUNT = FREE_CREDITS;
