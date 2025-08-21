// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化...');
    
    // 检查页面元素是否存在
    const examCenter = document.getElementById('exam-center');
    const myExams = document.getElementById('my-exams');
    const infoNotice = document.getElementById('info-notice');
    
    console.log('页面元素检查:', {
        examCenter: !!examCenter,
        myExams: !!myExams,
        infoNotice: !!infoNotice
    });
    
    // 初始化页面功能
    initPage();
});

// 初始化页面功能
function initPage() {
    // 添加导航链接点击事件
    initNavigation();
    
    // 添加考试卡片交互
    initExamCards();
    
    // 添加按钮点击事件
    initButtons();
    
    // 添加页面动画效果
    initAnimations();
}

// 初始化导航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page-content');
    
    console.log('找到导航链接数量:', navLinks.length);
    console.log('找到页面内容数量:', pages.length);
    
    navLinks.forEach((link, index) => {
        console.log(`导航链接 ${index + 1}:`, link.textContent.trim());
    });
    
    pages.forEach((page, index) => {
        console.log(`页面内容 ${index + 1}:`, page.id);
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('导航链接被点击:', this.textContent.trim());
            
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            
            // 根据导航文本切换页面
            const linkText = this.textContent.trim();
            console.log('点击的导航:', linkText);
            
            let targetPage = null;
            
            if (linkText === '考试中心') {
                targetPage = document.getElementById('exam-center');
            } else if (linkText === '我的考试') {
                targetPage = document.getElementById('my-exams');
            } else if (linkText === '信息通知') {
                targetPage = document.getElementById('info-notice');
            }
            
            if (targetPage) {
                targetPage.classList.add('active');
                console.log('成功切换到页面:', targetPage.id);
            } else {
                console.error('找不到目标页面:', linkText);
                // 默认显示考试中心
                const examCenter = document.getElementById('exam-center');
                if (examCenter) {
                    examCenter.classList.add('active');
                }
            }
        });
    });
}

// 初始化考试卡片交互
function initExamCards() {
    const examCards = document.querySelectorAll('.exam-card');
    
    examCards.forEach(card => {
        // 添加鼠标悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // 添加点击事件
        card.addEventListener('click', function(e) {
            // 如果点击的不是按钮，则触发按钮点击
            if (!e.target.classList.contains('enter-btn')) {
                const button = this.querySelector('.enter-btn');
                if (button) {
                    button.click();
                }
            }
        });
    });
}

// 初始化按钮功能
function initButtons() {
    // 进入按钮点击事件
    const enterButtons = document.querySelectorAll('.enter-btn');
    
    enterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 添加点击动画效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // 获取考试信息
            const card = this.closest('.exam-card');
            const examTitle = card.querySelector('h3').textContent;
            
            // 显示提示信息
            showNotification(`正在进入: ${examTitle}`, 'info');
            
            // 这里可以添加实际的页面跳转逻辑
            console.log('进入考试:', examTitle);
        });
    });
    
    // 管理后台链接点击事件
    const adminLink = document.querySelector('.admin-link');
    if (adminLink) {
        adminLink.addEventListener('click', function(e) {
            // 支持按住 Ctrl/Cmd 在新标签页打开
            if (e.ctrlKey || e.metaKey) return;
            // 不再阻止默认行为，允许浏览器直接跳转
            showNotification('正在跳转到管理后台...', 'info');
            console.log('跳转到管理后台');
            // 可选：为了看到提示，微小延迟后再跳转（不阻止正常行为时可省略）
            // e.preventDefault();
            // setTimeout(() => { window.location.href = adminLink.getAttribute('href') || 'admin.html'; }, 150);
        });
    }
}

// 初始化页面动画
function initAnimations() {
    // 页面加载动画
    const examCards = document.querySelectorAll('.exam-card');
    
    examCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Logo动画
    const logoShape = document.querySelector('.logo-shape');
    if (logoShape) {
        logoShape.style.animation = 'logoPulse 2s ease-in-out infinite';
    }
}

// 显示通知消息
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'info' ? '#1890FF' : '#52C41A'};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // 自动关闭
    setTimeout(() => {
        hideNotification(notification);
    }, 3000);
}

// 隐藏通知
function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes logoPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .notification-message {
        flex: 1;
        font-size: 14px;
    }
`;
document.head.appendChild(style);

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭通知
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            hideNotification(notification);
        });
    }
    
    // Enter键触发第一个考试卡片的进入按钮
    if (e.key === 'Enter' && !e.target.matches('input, textarea')) {
        const firstEnterBtn = document.querySelector('.enter-btn');
        if (firstEnterBtn) {
            firstEnterBtn.click();
        }
    }
});

// 添加页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('页面已隐藏');
    } else {
        console.log('页面已显示');
    }
});

// 添加窗口大小变化处理
window.addEventListener('resize', function() {
    // 可以在这里添加响应式处理逻辑
    console.log('窗口大小已改变:', window.innerWidth, 'x', window.innerHeight);
});

// 初始化我的考试页面功能
initMyExams();

// 初始化信息通知页面功能
initInfoNotice();

// 初始化我的考试页面功能
function initMyExams() {
    // 详情链接点击事件
    const detailLinks = document.querySelectorAll('.detail-link');
    detailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const examName = this.closest('tr').querySelector('td:nth-child(2)').textContent;
            showNotification(`查看考试详情: ${examName}`, 'info');
            console.log('查看考试详情:', examName);
        });
    });
    
    // 分页按钮点击事件
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageNumbers = document.querySelectorAll('.page-number');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (!this.disabled) {
                showNotification('跳转到上一页', 'info');
                console.log('跳转到上一页');
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (!this.disabled) {
                showNotification('跳转到下一页', 'info');
                console.log('跳转到下一页');
            }
        });
    }
    
    pageNumbers.forEach(page => {
        page.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                pageNumbers.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                showNotification(`跳转到第${this.textContent}页`, 'info');
                console.log('跳转到第', this.textContent, '页');
            }
        });
    });
    
    // 每页条数选择事件
    const pageSizeSelect = document.querySelector('.page-size-select');
    if (pageSizeSelect) {
        pageSizeSelect.addEventListener('change', function() {
            showNotification(`每页显示${this.value}条`, 'info');
            console.log('每页显示条数:', this.value);
        });
    }
}

// 初始化信息通知页面功能
function initInfoNotice() {
    const noticeTabs = document.querySelectorAll('.notice-tab');
    const noticeItems = document.querySelectorAll('.notice-item');
    const attachmentItems = document.querySelectorAll('.attachment-item');
    
    // 通知分类标签切换
    noticeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 更新标签状态
            noticeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选通知项目
            noticeItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            console.log('切换到分类:', category);
        });
    });
    
    // 附件点击事件
    attachmentItems.forEach(attachment => {
        attachment.addEventListener('click', function(e) {
            e.preventDefault();
            const fileName = this.querySelector('span').textContent;
            showNotification(`下载文件: ${fileName}`, 'info');
            console.log('下载文件:', fileName);
        });
    });
    
    // 通知项目点击事件
    noticeItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 如果点击的是附件，不触发通知点击
            if (e.target.closest('.attachment-item')) {
                return;
            }
            
            const title = this.querySelector('.notice-title').textContent;
            showNotification(`查看通知详情: ${title}`, 'info');
            console.log('查看通知:', title);
        });
    });
}
