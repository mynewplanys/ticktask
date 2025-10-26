# TickTask (滴答任务) - iOS风格任务管理应用

## 项目概述

TickTask是一个双语（中文/英文）iOS风格的Web应用，专注于任务计划和提醒。应用设计为PWA，具有原生iOS的外观和体验，并可通过Capacitor转换为真正的iOS应用发布到App Store。

## 最新更新（2025-10-26）

### ✅ iOS风格底部导航栏
- **移除**：侧边栏导航
- **新增**：iOS原生风格的底部Tab Bar
  - 固定在屏幕底部
  - 图标在上，文字在下
  - 选中状态蓝色高亮
  - 支持iOS安全区域（Safe Area）
  - 毛玻璃背景效果

### 导航结构
- **今日** (Today) - 今日任务页面（首页）
- **任务** (Tasks) - 任务管理页面
- **统计** (Stats) - 统计分析页面
- **设置** (Settings) - 设置页面

## 核心功能

### 1. 任务管理
- 创建带重复计划的任务
- 任务分类和标签
- 优先级设置

### 2. 今日任务
- 查看今日待办事项
- 完成状态管理
- 快速操作

### 3. 统计分析
- 任务完成统计
- 数据可视化
- 筛选功能

### 4. 历史记录
- 历史任务回溯
- 日历选择器
- 过往日期编辑

## 技术栈

### 前端
- React + TypeScript
- Wouter (路由)
- TanStack Query (数据管理)
- Tailwind CSS + Shadcn UI
- Framer Motion (动画)

### 后端
- Express.js
- PostgreSQL (Neon)
- Drizzle ORM

### iOS转换
- Capacitor (已完整配置)
- PWA Manifest
- iOS安全区域支持

## 设计特点

### iOS设备框架
- **桌面端**：430px宽度iPhone框架（19.5:9比例）
- **移动端**：全屏显示
- 圆角边框和阴影效果

### 界面风格
- iOS原生UI设计
- 毛玻璃效果（Backdrop Blur）
- 流畅的页面过渡动画
- 支持浅色/深色模式

### 交互体验
- 滑动返回手势
- 触摸反馈动画
- iOS风格的按钮和卡片

## 项目结构

```
ticktask/
├── client/                      # 前端代码
│   ├── src/
│   │   ├── components/         # 组件
│   │   │   ├── ui/            # Shadcn UI组件
│   │   │   ├── BottomTabBar.tsx  # iOS底部导航栏
│   │   │   └── ThemeToggle.tsx   # 主题切换
│   │   ├── contexts/          # React Contexts
│   │   │   └── LanguageContext.tsx
│   │   ├── hooks/             # 自定义Hooks
│   │   │   └── useSwipeBack.ts
│   │   ├── pages/             # 页面
│   │   │   ├── TodayPage.tsx
│   │   │   ├── TasksPage.tsx
│   │   │   ├── StatisticsPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   ├── lib/              # 工具库
│   │   │   ├── config.ts     # API配置
│   │   │   └── queryClient.ts
│   │   └── index.css         # 全局样式
│   └── public/
│       └── manifest.json      # PWA配置
├── server/                    # 后端代码
│   ├── routes.ts             # API路由
│   └── storage.ts            # 数据存储
├── shared/                   # 共享代码
│   └── schema.ts            # 数据模型
├── capacitor.config.ts       # Capacitor配置
├── CAPACITOR_SETUP.md        # iOS构建指南
└── README_CAPACITOR.md       # Capacitor说明
```

## 国际化

### 双语支持
- 中文（简体）
- English

### 单语言显示模式
- 选择中文时仅显示中文
- 选择英文时仅显示英文
- 通过 `useLanguage` Hook和 `t()` 函数实现

示例：
```typescript
const { t } = useLanguage();
return <h1>{t("今日任务", "Today's Tasks")}</h1>;
```

## 开发状态

### ✅ 已完成
- iOS设备框架显示
- 底部Tab Bar导航（最新）
- 四个核心页面布局
- 浅色/深色模式
- 双语切换
- Capacitor完整配置
- PWA Manifest
- API智能配置（Web/移动端自动适配）

### 🚧 进行中
- 后端API实现
- 数据持久化
- 任务CRUD功能

### 📋 待实现
- 重复任务逻辑
- 通知提醒
- 数据同步
- 离线支持

## 环境配置

### 开发环境变量
```bash
DATABASE_URL=postgresql://...
SESSION_SECRET=your-secret-key
```

### iOS构建环境变量
```bash
VITE_API_URL=https://your-replit-app.replit.app
```

## 运行项目

### 开发模式
```bash
npm install
npm run dev
```
访问：http://localhost:5000

### 构建iOS应用
详见 `CAPACITOR_SETUP.md` 或 `CAPACITOR_QUICK_START.md`

## 用户偏好

### 设计偏好
- iOS原生风格
- 简洁清爽
- 信息密度适中
- 底部导航栏（Tab Bar）

### 功能偏好
- 单语言显示模式
- 重复任务支持
- 历史记录管理
- 统计分析功能

## 发布计划

### Web版本
- 通过Replit部署
- PWA支持（可添加到主屏幕）

### iOS App Store
1. 在Mac上使用Capacitor构建
2. 在Xcode中配置和测试
3. 提交App Store审核

### 两种数据方案
- **方案A**：纯前端（localStorage/SQLite）
- **方案B**：连接云端API（数据同步）

## 注意事项

### Git管理
- 建议通过GitHub进行版本控制
- 重要聊天记录手动保存为文档
- 数据库需单独备份和迁移

### iOS开发
- 需要Mac和Xcode
- 准备应用图标（1024×1024）
- 准备启动画面（2732×2732）

## 更新日志

### 2025-10-26
- ✅ 将侧边栏导航改为iOS底部Tab Bar
- ✅ 优化底部导航栏在桌面和移动端的显示
- ✅ 添加iOS安全区域支持
- ✅ 更新页面布局以适配新导航结构

### 之前
- ✅ Capacitor完整配置
- ✅ iOS设备框架实现
- ✅ 四个核心页面创建
- ✅ 双语支持实现
- ✅ 主题切换功能
