# ⚡ TickTask - Capacitor 快速上手（5分钟版）

如果您熟悉iOS开发，这份快速指南能让您5分钟内运行起来。

---

## 🚀 快速命令

```bash
# 1. 克隆/下载项目到Mac
git clone <your-repo>
cd ticktask

# 2. 安装所有依赖
npm install
npm install @capacitor/core @capacitor/cli @capacitor/ios
npm install @capacitor/status-bar @capacitor/splash-screen

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，设置 VITE_API_URL=你的服务器地址

# 4. 构建Web应用
npm run build

# 5. 添加iOS平台
npx cap add ios

# 6. 同步资源
npx cap sync

# 7. 打开Xcode
npx cap open ios

# 在Xcode中：
# - 选择Team（Signing & Capabilities）
# - 选择设备/模拟器
# - 点击运行 ▶️
```

---

## 📝 重要文件

已为您准备好：
- ✅ `capacitor.config.ts` - Capacitor配置
- ✅ `client/src/lib/config.ts` - API地址配置
- ✅ `client/public/manifest.json` - PWA manifest
- ✅ `.env.example` - 环境变量模板

---

## 🎨 准备应用图标

```bash
# 1. 安装工具
npm install @capacitor/assets --save-dev

# 2. 创建图标文件
mkdir -p resources
# 将图标放入：
# - resources/icon.png (1024×1024)
# - resources/splash.png (2732×2732)

# 3. 生成所有尺寸
npx capacitor-assets generate --ios
```

---

## 🔄 日常开发流程

```bash
# 修改代码后
npm run build
npx cap sync
# 在Xcode中重新运行
```

---

## 📱 发布到App Store

```bash
# 1. 在Xcode中选择 "Any iOS Device"
# 2. Product → Archive
# 3. Distribute App → App Store Connect
# 4. 在App Store Connect提交审核
```

---

## 🆘 遇到问题？

查看完整指南：`CAPACITOR_SETUP.md`

---

**就这么简单！🎉**
