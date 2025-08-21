# 教育云平台

这是一个基于现代Web技术构建的教育考试管理平台，提供考试中心、信息通知和我的考试等功能。

## 功能特性

### 🎯 核心功能
- **考试中心**: 展示可用的考试和培训项目
- **信息通知**: 系统通知和公告管理
- **我的考试**: 个人考试记录和状态查看
- **管理后台**: 管理员功能入口

### 🎨 界面设计
- 现代化UI设计，采用蓝色主题色调
- 响应式布局，支持PC和移动设备
- 流畅的动画效果和交互体验
- 清晰的信息层次和视觉引导

### 📱 交互功能
- 考试卡片悬停效果
- 按钮点击动画
- 通知消息系统
- 键盘快捷键支持
- 页面加载动画

## 技术栈

- **HTML5**: 语义化标签和现代HTML特性
- **CSS3**: Flexbox布局、Grid布局、动画效果
- **JavaScript ES6+**: 模块化代码、事件处理、DOM操作
- **响应式设计**: 移动端适配和断点设计

## 文件结构

```
examRegistration/
├── index.html          # 主页面文件
├── styles.css          # 样式文件
├── script.js           # JavaScript功能文件
└── README.md           # 项目说明文档
```

## 快速开始

1. **克隆或下载项目**
   ```bash
   git clone [项目地址]
   cd examRegistration
   ```

2. **打开项目**
   - 直接双击 `index.html` 文件在浏览器中打开
   - 或使用本地服务器（推荐）

3. **使用本地服务器**（推荐）
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 使用Node.js
   npx serve .
   
   # 使用PHP
   php -S localhost:8000
   ```

4. **访问页面**
   在浏览器中打开 `http://localhost:8000`

## 功能说明

### 考试卡片
- 显示考试标题、报名时间和考试时间
- 点击"进入"按钮可进入相应考试
- 支持卡片整体点击和按钮单独点击

### 导航功能
- 考试中心（当前页面）
- 信息通知
- 我的考试
- 管理后台入口

### 用户信息
- 显示当前登录用户（胡锋）
- 用户头像和姓名展示

## 交互特性

### 键盘快捷键
- `Enter`: 触发第一个考试卡片的进入按钮
- `ESC`: 关闭所有通知消息

### 动画效果
- 页面加载时的卡片渐入动画
- Logo呼吸动画效果
- 按钮点击缩放动画
- 卡片悬停提升效果

### 通知系统
- 点击按钮时显示操作提示
- 自动消失的通知消息
- 支持手动关闭通知

## 响应式设计

### 断点设置
- **桌面端**: > 768px
- **平板端**: 768px - 480px
- **移动端**: < 480px

### 适配特性
- 移动端优化的导航布局
- 卡片在小屏幕上的垂直排列
- 按钮在移动端的全宽显示

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 自定义配置

### 修改主题色
在 `styles.css` 中修改CSS变量：
```css
:root {
    --primary-color: #1890FF;
    --secondary-color: #40A9FF;
}
```

### 添加新考试
在 `index.html` 中添加新的考试卡片：
```html
<div class="exam-card">
    <div class="exam-info">
        <div class="exam-title">
            <div class="exam-icon">
                <!-- 图标SVG -->
            </div>
            <h3>考试标题</h3>
        </div>
        <div class="exam-details">
            <p class="registration-time">报名时间: 开始 ~ 结束</p>
            <p class="exam-time">考试时间: 开始 ~ 结束</p>
        </div>
    </div>
    <div class="exam-action">
        <button class="enter-btn">进入</button>
    </div>
</div>
```

## 开发说明

### 代码规范
- 使用语义化HTML标签
- CSS类名采用BEM命名规范
- JavaScript使用ES6+语法
- 代码注释清晰完整

### 性能优化
- 图片使用SVG格式减少文件大小
- CSS和JavaScript文件分离
- 使用CSS3动画代替JavaScript动画
- 响应式图片和字体加载优化

## 许可证

本项目采用 MIT 许可证。

## 联系方式

如有问题或建议，请联系开发团队。

---

**伊犁州智慧教育云平台** - 为教育现代化提供技术支持
