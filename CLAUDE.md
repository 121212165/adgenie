# CLAUDE.md — AdGenie 项目说明书

> 由 /init 生成(等价产物)。给任何 agent/协作者的开场白:本项目是什么、怎么跑、边界在哪。

## 项目一句话

**AdGenie** — AI 电商广告素材生成器:一张商品图,十分钟,一套多平台广告素材(FB/IG/TikTok 创意图 + 文案,一键导出)。

## 规范来源(先读这些)

| 文件 | 位置 | 作用 |
|------|------|------|
| SPEC.md | `../打卡材料包/spec.md` | 唯一需求输入(Overview→Scope→AC) |
| tech-spec.md | `../打卡材料包/tech-spec.md` | 技术方案(架构/接口/数据模型) |
| tasks.md | `../打卡材料包/tasks.md` | 任务清单(P0 核心动线 / later) |
| plan.md | `../打卡材料包/plan.md` | worktree 并行计划 |

> 工作目录说明:产品代码在本 `adgenie/` 目录,设计文档在上级 `打卡材料包/`。改动 SPEC 类文档需回到打卡材料包目录。

## 技术栈(定稿)

- **前端/后端**:Next.js(App Router)+ Tailwind CSS
- **数据/认证/存储**:Supabase(Auth + Postgres + Storage 私有桶)
- **AI**:图像生成 API(按量付费)+ LLM API(文案)
- **支付**:Stripe 订阅
- **部署**:Vercel

## 核心动线(AC 验收)

```
上传/链接导入 → 生成(图+文案,≤60s)→ 平台切换预览 → 导出(免费带水印/Pro 高清)→ 额度用尽付费引导
```

## 常用命令

```bash
npm run dev        # 本地开发
npm run build      # 构建
npx supabase start # 本地 Supabase(未登录时不可用)
```

## 边界与约定

- **不做**:多语言素材 / 批量处理 / 团队协作 / 自建模型 / 社媒一键发布(见 SPEC Not Doing)
- **合规**:导出物必须带 AI 生成声明(Meta/TikTok 政策)
- **安全**:API Key 只进服务端 `.env.local`;额度扣减在服务端执行
- **提交粒度**:按 SPEC Implementation Plan 的 commit 粒度提交

## 状态(2026-08-15)

- [x] 基建检查:gh 已登录;vercel/supabase CLI 已装
- [ ] vercel / supabase 登录(需本人浏览器授权)
- [ ] Phase 1 地基(Next.js 骨架 + Supabase 建表 + 落地页)
