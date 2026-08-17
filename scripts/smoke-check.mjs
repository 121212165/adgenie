// AdGenie smoke-check:上线前冒烟 + 核心功能稳定性测试
// 用法:node scripts/smoke-check.mjs [baseUrl] [生成次数,默认20]
// 覆盖:页面可达性(200) + 核心动线(生成20次/导出/额度) + 政策页 + robots/sitemap

const base = process.argv[2] ?? "http://localhost:3000";
const genCount = Number(process.argv[3] ?? 20);

const results = [];
function check(name, ok, detail = "") {
  results.push({ name, ok, detail });
  console.log(`${ok ? "✅" : "❌"} ${name}${detail ? " — " + detail : ""}`);
}

async function get(path) {
  const r = await fetch(`${base}${path}`, { redirect: "manual" });
  return { status: r.status, text: await r.text() };
}

async function postJson(path, body) {
  const r = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: r.status, json: await r.json().catch(() => ({})) };
}

// 1. 页面可达性(不需要登录)
const pages = ["/", "/generator", "/pricing", "/terms", "/privacy", "/refund", "/acceptable-use", "/contact", "/robots.txt", "/sitemap.xml"];
for (const p of pages) {
  try {
    const { status } = await get(p);
    check(`页面 ${p}`, status === 200, `HTTP ${status}`);
  } catch (e) {
    check(`页面 ${p}`, false, e.message);
  }
}

// 2. 核心动线:生成 genCount 次,每次必须 3 平台 + 文案
let genOk = 0, genFail = 0, totalMs = 0;
for (let i = 0; i < genCount; i++) {
  const t0 = Date.now();
  try {
    const { status, json } = await postJson("/api/generate", {
      image: "data:image/png;base64,test",
      productName: `Test Product ${i + 1}`,
    });
    const ms = Date.now() - t0;
    totalMs += ms;
    if (status === 200 && json.ok && json.ads?.length === 3 && json.ads.every(a => a.copy && a.imageUrl)) {
      genOk++;
    } else {
      genFail++;
      console.log(`   第${i + 1}次异常: status=${status} ok=${json.ok} ads=${json.ads?.length}`);
    }
  } catch (e) {
    genFail++;
    console.log(`   第${i + 1}次异常: ${e.message}`);
  }
}
const avgMs = genOk ? Math.round(totalMs / genCount) : 0;
check(`核心动线 生成${genCount}次`, genOk === genCount, `成功${genOk}/失败${genFail}, 平均 ${avgMs}ms/次`);

// 3. 导出(免费/Pro)
{
  const free = await postJson("/api/export", { imageUrl: "data:image/png;base64,x", platform: "facebook", isPro: false });
  const pro = await postJson("/api/export", { imageUrl: "data:image/png;base64,x", platform: "tiktok", isPro: true });
  check("导出 免费版(带水印)", free.status === 200 && free.json.watermark === true, `file=${free.json.fileName}`);
  check("导出 Pro(无水印)", pro.status === 200 && pro.json.watermark === false, `file=${pro.json.fileName}`);
}

// 4. 额度闭环
{
  const c = await fetch(`${base}/api/credits`, { headers: { "x-user-id": "smoke-test" } }).then(r => r.json());
  check("额度查询", c.ok && typeof c.credits === "number", `credits=${c.credits}`);
}

// 5. Waitlist 表单
{
  const r = await fetch(`${base}/api/waitlist`, { method: "POST", body: new URLSearchParams({ email: "smoke@test.com" }) });
  const j = await r.json().catch(() => ({}));
  check("Waitlist 提交", r.status === 200 && j.ok, j.message ?? "");
}

// 汇总
const failCount = results.filter(r => !r.ok).length;
console.log(`\n===== 汇总:${results.length - failCount}/${results.length} 通过 =====`);
process.exit(failCount === 0 ? 0 : 1);
