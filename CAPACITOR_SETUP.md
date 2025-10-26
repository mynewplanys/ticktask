# 📱 TickTask - iOS App 部署指南

这份文档将指导您如何将TickTask Web应用转换为iOS原生应用并发布到App Store。

---

## 📋 前置要求

### 硬件/软件
- ✅ **Mac电脑**（必须，iOS开发只能在macOS上进行）
- ✅ **macOS 13.0+**（建议最新版）
- ✅ **Xcode 16.0+**（从Mac App Store下载）
- ✅ **Node.js 18+**（LTS版本）
- ✅ **CocoaPods**（iOS依赖管理工具）

### Apple账号
- ✅ **Apple Developer账号**（$99美元/年）
- 注册地址：https://developer.apple.com

---

## 🚀 快速开始（一步步操作）

### 步骤 1：安装开发工具

```bash
# 1. 安装Xcode命令行工具
xcode-select --install

# 2. 安装CocoaPods
sudo gem install cocoapods

# 3. 验证安装
xcode-select -p  # 应该显示 /Applications/Xcode.app/Contents/Developer
pod --version    # 应该显示版本号，如 1.14.3
```

**重要**：首次安装Xcode后，必须打开一次并同意许可协议！

---

### 步骤 2：下载项目代码到Mac

#### 方法A：使用Git（推荐）
```bash
# 克隆您的Replit项目
git clone <your-replit-git-url>
cd ticktask

# 安装依赖
npm install
```

#### 方法B：下载ZIP
1. 在Replit中导出项目为ZIP
2. 解压到Mac本地文件夹
3. 在终端中进入项目目录
4. 运行 `npm install`

---

### 步骤 3：安装Capacitor依赖

```bash
# 安装Capacitor核心包
npm install @capacitor/core @capacitor/cli

# 安装iOS平台支持
npm install @capacitor/ios

# 安装常用插件（可选但推荐）
npm install @capacitor/status-bar
npm install @capacitor/splash-screen
npm install @capacitor/keyboard
npm install @capacitor/haptics
```

---

### 步骤 4：配置环境变量

创建 `.env.local` 文件（用于移动端构建）：

```bash
# 复制示例文件
cp .env.example .env.local

# 编辑文件，填入您的API地址
nano .env.local
```

在 `.env.local` 中配置：
```bash
# 指向您部署的Replit应用地址
VITE_API_URL=https://your-replit-app.replit.app

# 或者使用自定义域名
# VITE_API_URL=https://api.ticktask.com
```

**注意**：
- Web开发时保持 `VITE_API_URL` 为空
- iOS App需要完整的服务器地址

---

### 步骤 5：构建Web应用

```bash
# 使用生产环境配置构建
npm run build

# 验证dist目录已生成
ls -la dist/
```

---

### 步骤 6：初始化iOS项目

```bash
# 初始化Capacitor（如果之前没做过）
npx cap init

# 提示时输入：
# App name: TickTask
# App ID: com.yourname.ticktask （必须是唯一的反向域名格式）
# Web directory: dist

# 添加iOS平台
npx cap add ios

# 同步Web资源到iOS项目
npx cap sync
```

**App ID命名建议**：
- ✅ `com.yourname.ticktask`
- ✅ `com.yourcompany.ticktask`
- ❌ 不要用 `com.example.*`（Apple会拒绝）

---

### 步骤 7：准备应用图标

#### 创建图标文件

在项目根目录创建 `resources` 文件夹：

```bash
mkdir -p resources
```

准备以下图片（PNG格式，透明背景）：
- `resources/icon.png` - **1024×1024px**（应用图标）
- `resources/splash.png` - **2732×2732px**（启动画面）

#### 自动生成所有尺寸

```bash
# 安装资源生成工具
npm install @capacitor/assets --save-dev

# 生成所有所需的图标和启动画面
npx capacitor-assets generate --ios
```

**图标设计建议**：
- 使用简洁的图标设计
- 避免文字（太小看不清）
- 确保在深色/浅色背景都清晰可见
- 可以使用在线工具：Canva、Figma

---

### 步骤 8：在Xcode中打开项目

```bash
# 打开iOS项目
npx cap open ios
```

Xcode会自动启动并打开项目。

---

## 🔧 Xcode配置

### 1. 配置团队和签名

1. **选择项目**：点击左侧项目导航器中的 `App` 图标
2. **选择Target**：选择 `App` target
3. **签名设置**：
   - 点击 "Signing & Capabilities" 标签
   - 勾选 "Automatically manage signing"
   - 在 "Team" 下拉菜单选择您的Apple Developer团队
   - Bundle Identifier会自动填充（与capacitor.config.ts一致）

### 2. 配置应用信息

在 `App` target 的 "General" 标签中：
- **Display Name**: TickTask
- **Bundle Identifier**: com.yourname.ticktask
- **Version**: 1.0.0
- **Build**: 1
- **Deployment Target**: iOS 13.0+

### 3. 配置权限（如果需要）

在 `ios/App/App/Info.plist` 中添加权限说明：

```xml
<key>NSCameraUsageDescription</key>
<string>我们需要访问相机以拍摄任务相关照片</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>我们需要访问相册以选择任务相关图片</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>我们需要您的位置信息以提供基于位置的提醒</string>
```

**注意**：只添加您实际使用的权限！

---

## 📱 测试运行

### 在模拟器中测试

1. 在Xcode顶部选择模拟器设备（如 iPhone 15 Pro）
2. 点击 ▶️ 播放按钮（或按 `Cmd + R`）
3. 等待编译完成，应用会在模拟器中启动

### 在真机上测试

1. 用USB连接iPhone到Mac
2. 在设备上信任此电脑
3. 在Xcode顶部选择您的iPhone
4. 点击 ▶️ 运行
5. **首次运行**：在iPhone上 设置 → 通用 → VPN与设备管理 → 信任开发者证书

---

## 🌐 更新Web代码

**每次修改Web代码后**，需要重新同步：

```bash
# 1. 构建Web应用
npm run build

# 2. 同步到iOS
npx cap sync

# 3. 在Xcode中重新运行
```

**开发技巧**：
```bash
# 只复制Web资源（快）
npx cap copy

# 完全同步（包含插件更新）
npx cap sync
```

---

## 🏪 发布到App Store

### 准备工作

1. **在App Store Connect创建应用**
   - 登录：https://appstoreconnect.apple.com
   - 点击 "My Apps" → "+" → "New App"
   - 填写：
     - Platform: iOS
     - Name: TickTask
     - Primary Language: Chinese (Simplified)
     - Bundle ID: 选择您的 `com.yourname.ticktask`
     - SKU: 任意唯一标识符，如 `TICKTASK001`

2. **准备应用截图**（必须）
   
   需要两套截图：
   - **6.7英寸显示屏**（iPhone 15 Pro Max）
     - 至少3张，最多10张
     - 尺寸：1290 × 2796 像素
   
   - **6.5英寸显示屏**（iPhone 11 Pro Max）
     - 至少3张，最多10张
     - 尺寸：1242 × 2688 像素

   **获取截图方法**：
   ```bash
   # 在Xcode中选择对应的模拟器
   # 运行应用后按 Cmd + S 保存截图
   ```

3. **准备应用描述**
   - 应用名称：TickTask - 滴答任务
   - 副标题：高效的重复任务管理工具
   - 描述：详细介绍应用功能（建议200-500字）
   - 关键词：任务,提醒,计划,效率,GTD（最多100字符）
   - 支持URL：您的网站或支持邮箱
   - 隐私政策URL：**必须提供**

### 创建存档（Archive）

1. **选择目标设备**
   - 在Xcode顶部选择 **"Any iOS Device (arm64)"**
   - 不要选择模拟器！

2. **创建存档**
   - 菜单：**Product → Archive**
   - 等待编译完成（可能需要几分钟）
   - 完成后会自动打开 Organizer 窗口

3. **上传到App Store**
   - 在 Organizer 中选择刚创建的存档
   - 点击 **"Distribute App"**
   - 选择 **"App Store Connect"**
   - 选择 **"Upload"**
   - 勾选 **"Include bitcode"** 和 **"Upload your app's symbols"**
   - 点击 **"Next"** 并确认
   - 等待上传完成

### 提交审核

1. **在App Store Connect填写信息**
   - 返回 https://appstoreconnect.apple.com
   - 选择您的应用
   - 填写所有必填信息：
     - 截图
     - 描述
     - 关键词
     - 支持URL
     - 隐私政策
     - 年龄分级（Content Rights）
     - 价格（免费或付费）

2. **选择构建版本**
   - 在 "Build" 部分选择刚上传的版本
   - 等待处理完成（可能需要30分钟）

3. **提交审核**
   - 点击 "Submit for Review"
   - 回答审核问卷（如有）
   - 确认提交

### 审核时间
- 通常：**1-3个工作日**
- 首次提交可能更久
- 可以在App Store Connect查看状态

---

## 🔄 版本更新流程

发布新版本时：

```bash
# 1. 更新版本号（在Xcode中）
# General → Version: 1.1.0
# General → Build: 2

# 2. 构建并同步
npm run build
npx cap sync

# 3. 创建Archive并上传
# 在Xcode中: Product → Archive

# 4. 在App Store Connect提交新版本
```

---

## 🐛 常见问题

### 问题1：Code Signing Error

**错误**：`No signing certificate found`

**解决**：
1. 在Xcode中登录Apple ID：Preferences → Accounts
2. 选择您的账号，点击 "Download Manual Profiles"
3. 确保在项目设置中选择了正确的Team

---

### 问题2：应用不更新

**原因**：忘记同步Web资源

**解决**：
```bash
npm run build
npx cap sync
# 在Xcode中：Product → Clean Build Folder (Cmd + Shift + K)
# 然后重新运行
```

---

### 问题3：API请求失败

**原因**：
- VITE_API_URL未配置
- CORS跨域问题
- 服务器未部署

**解决**：
1. 检查 `.env.local` 中的 `VITE_API_URL`
2. 确保后端服务器已部署并可访问
3. 检查服务器CORS设置

---

### 问题4：构建失败 - Pod Install

**错误**：`pod install failed`

**解决**：
```bash
cd ios/App
pod repo update
pod install
cd ../..
npx cap sync
```

---

## 📚 有用的资源

### 官方文档
- [Capacitor iOS文档](https://capacitorjs.com/docs/ios)
- [App Store审核指南](https://developer.apple.com/app-store/review/guidelines/)
- [App Store Connect帮助](https://help.apple.com/app-store-connect/)

### 学习资源
- [Capacitor视频教程](https://www.youtube.com/results?search_query=capacitor+ios+tutorial)
- [iOS开发者论坛](https://developer.apple.com/forums/)

### 社区支持
- [Capacitor Discord](https://discord.com/invite/UPYYRhtyzp)
- [Capacitor GitHub](https://github.com/ionic-team/capacitor)

---

## ✅ 检查清单

发布前确保：

- [ ] 已在真机上测试
- [ ] 应用图标已设置（1024x1024）
- [ ] 启动画面已设置
- [ ] 版本号正确（Version & Build）
- [ ] Bundle ID与App Store Connect一致
- [ ] API地址配置正确
- [ ] 所有权限说明已添加
- [ ] 应用在深色/浅色模式下都正常
- [ ] 应用在不同屏幕尺寸都正常
- [ ] 截图已准备（两套）
- [ ] 应用描述已准备
- [ ] 隐私政策URL已准备
- [ ] 支持联系方式已准备

---

## 🎉 恭喜！

如果您按照本指南操作，您的TickTask应用应该已经：
1. ✅ 成功转换为iOS原生应用
2. ✅ 在iPhone上流畅运行
3. ✅ 准备好提交到App Store

祝您的应用审核顺利，早日上架App Store！🚀

---

## 💡 需要帮助？

如有问题，请：
1. 查看本文档的常见问题部分
2. 访问Capacitor官方文档
3. 在GitHub Issues寻求帮助

**最后更新**：2025年1月
