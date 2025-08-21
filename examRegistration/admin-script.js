// 管理后台脚本：菜单切换、折叠侧边栏、新建考试功能

document.addEventListener('DOMContentLoaded', function () {
    initSidebarToggle();
    initMenuSwitch();
    initNewExam();
    initUserManagement();
    initBasicSettings();
    initInfoManagement();
});

function initSidebarToggle() {
    var toggle = document.getElementById('menuToggle');
    var sidebar = document.querySelector('.admin-sidebar');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', function () {
        sidebar.classList.toggle('open');
    });
}

function initMenuSwitch() {
    var items = document.querySelectorAll('.menu-item');
    var pages = document.querySelectorAll('.page-content');
    var currentPageText = document.getElementById('currentPage');

    items.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            var pageId = item.getAttribute('data-page');
            if (!pageId) return;

            // 激活菜单
            items.forEach(function (i) { i.classList.remove('active'); });
            item.classList.add('active');

            // 切换页面
            pages.forEach(function (p) { p.classList.remove('active'); });
            var page = document.getElementById(pageId);
            if (page) page.classList.add('active');

            // 更新面包屑
            var text = item.querySelector('span') ? item.querySelector('span').textContent : '';
            if (currentPageText && text) currentPageText.textContent = text;
        });
    });
}

function initNewExam() {
    var newExamBtn = document.getElementById('newExamBtn');
    var backToListBtn = document.getElementById('backToList');
    var cancelExamBtn = document.getElementById('cancelExam');
    var examManagement = document.getElementById('exam-management');
    var newExam = document.getElementById('new-exam');
    var examForm = document.querySelector('.exam-form');

    // 新建考试按钮点击事件
    if (newExamBtn) {
        newExamBtn.addEventListener('click', function() {
            examManagement.classList.remove('active');
            newExam.classList.add('active');
            
            // 更新面包屑
            var currentPageText = document.getElementById('currentPage');
            if (currentPageText) currentPageText.textContent = '新建考试';
        });
    }

    // 返回列表按钮点击事件
    if (backToListBtn) {
        backToListBtn.addEventListener('click', function() {
            newExam.classList.remove('active');
            examManagement.classList.add('active');
            
            // 更新面包屑
            var currentPageText = document.getElementById('currentPage');
            if (currentPageText) currentPageText.textContent = '考试报名管理';
        });
    }

    // 取消按钮点击事件
    if (cancelExamBtn) {
        cancelExamBtn.addEventListener('click', function() {
            newExam.classList.remove('active');
            examManagement.classList.add('active');
            
            // 更新面包屑
            var currentPageText = document.getElementById('currentPage');
            if (currentPageText) currentPageText.textContent = '考试报名管理';
        });
    }

    // 表单提交事件
    if (examForm) {
        examForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            var formData = new FormData(examForm);
            var examData = {};
            
            // 收集表单数据
            var inputs = examForm.querySelectorAll('input, select, textarea');
            inputs.forEach(function(input) {
                if (input.type === 'radio') {
                    if (input.checked) {
                        examData[input.name] = input.value;
                    }
                } else if (input.type === 'checkbox') {
                    examData[input.name] = input.checked;
                } else {
                    examData[input.name] = input.value;
                }
            });
            
            // 显示保存成功提示
            showNotification('考试创建成功！', 'success');
            
            // 返回列表页面
            setTimeout(function() {
                newExam.classList.remove('active');
                examManagement.classList.add('active');
                
                // 更新面包屑
                var currentPageText = document.getElementById('currentPage');
                if (currentPageText) currentPageText.textContent = '考试报名管理';
            }, 1500);
        });
    }

    // 下载模板按钮点击事件
    var downloadTemplateBtn = document.querySelector('.button-group .ant-btn-primary');
    if (downloadTemplateBtn) {
        downloadTemplateBtn.addEventListener('click', function() {
            showNotification('模板下载中...', 'info');
            // 这里可以添加实际的下载逻辑
        });
    }

    // 导入岗位按钮点击事件
    var importPositionBtn = document.querySelector('.button-group .ant-btn:not(.ant-btn-primary)');
    if (importPositionBtn) {
        importPositionBtn.addEventListener('click', function() {
            showNotification('请选择要导入的岗位文件', 'info');
            // 这里可以添加文件选择逻辑
        });
    }
}

// 用户管理功能
function initUserManagement() {
    // 搜索功能
    var searchInput = document.querySelector('#user-management .ant-input');
    var searchBtn = document.querySelector('#user-management .ant-btn-primary');
    var userTypeSelect = document.querySelector('#user-management .ant-select-input');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            var searchValue = searchInput ? searchInput.value : '';
            var userType = userTypeSelect ? userTypeSelect.value : '';
            
            // 执行搜索逻辑
            performUserSearch(searchValue, userType);
        });
    }
    
    // 用户类型筛选
    if (userTypeSelect) {
        userTypeSelect.addEventListener('change', function() {
            var searchValue = searchInput ? searchInput.value : '';
            var userType = this.value;
            
            // 执行筛选逻辑
            performUserSearch(searchValue, userType);
        });
    }
    
    // 回车搜索
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                var searchValue = this.value;
                var userType = userTypeSelect ? userTypeSelect.value : '';
                
                // 执行搜索逻辑
                performUserSearch(searchValue, userType);
            }
        });
    }
}

// 执行用户搜索
function performUserSearch(searchValue, userType) {
    console.log('搜索用户:', { searchValue, userType });
    
    // 这里可以添加实际的搜索逻辑
    // 例如：过滤表格行、发送API请求等
    
    showNotification('搜索完成', 'info');
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
        background: ${type === 'success' ? '#52C41A' : '#1890FF'};
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

// 信息发布管理：搜索与分页（演示）
function initInfoManagement() {
    var container = document.getElementById('info-management');
    if (!container) return;

    var searchBtn = container.querySelector('#noticeSearchBtn');
    var searchInput = container.querySelector('#noticeSearchInput');
    var pagination = container.querySelector('#noticePagination');

    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            var keyword = searchInput ? searchInput.value.trim() : '';
            showNotification(keyword ? ('已搜索: ' + keyword) : '请输入关键字', 'info');
        });
    }

    if (pagination) {
        pagination.addEventListener('click', function (e) {
            var target = e.target.closest('[data-page]');
            if (!target) return;
            var page = target.getAttribute('data-page');
            showNotification('切换到第 ' + page + ' 页（演示）', 'info');
            var pages = pagination.querySelectorAll('.page');
            pages.forEach(function(p){ p.classList.remove('active'); });
            if (page === 'prev' || page === 'next') return;
            var active = pagination.querySelector('.page[data-page="' + page + '"]');
            if (active) active.classList.add('active');
        });
    }
}

// 基础设置：左侧菜单和右侧内容切换
function initBasicSettings() {
    var container = document.getElementById('basic-settings');
    if (!container) return;

    var menuItems = container.querySelectorAll('.settings-menu-item');
    var tabs = container.querySelectorAll('.settings-tab');

    menuItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var tabId = item.getAttribute('data-tab');
            if (!tabId) return;

            // 菜单高亮
            menuItems.forEach(function (i) { i.classList.remove('active'); });
            item.classList.add('active');

            // 内容切换
            tabs.forEach(function (t) { t.classList.remove('active'); });
            var tab = container.querySelector('#' + tabId);
            if (tab) tab.classList.add('active');
        });
    });

    // 自定义字段“添加字段”演示
    var addBtn = container.querySelector('#addCustomField');
    if (addBtn) {
        addBtn.addEventListener('click', function () {
            var tableBody = container.querySelector('#customFieldsTable tbody');
            if (!tableBody) return;
            var row = document.createElement('tr');
            row.innerHTML = '\n                <td>新字段</td>\n                <td>文本</td>\n                <td>\n                    <div class="ant-switch">\n                        <input type="checkbox">\n                        <label></label>\n                    </div>\n                </td>\n                <td>\n                    <div class="ant-switch">\n                        <input type="checkbox" checked>\n                        <label></label>\n                    </div>\n                </td>\n                <td>\n                    <span class="ant-btn-group">\n                        <button class="ant-btn ant-btn-link">编辑</button>\n                        <button class="ant-btn ant-btn-link ant-btn-danger">删除</button>\n                    </span>\n                </td>\n            ';
            tableBody.appendChild(row);
            showNotification('已添加一个自定义字段', 'success');
        });
    }
}


