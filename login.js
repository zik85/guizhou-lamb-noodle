// login.js - 纯前端登录验证 (用于 GitHub Pages)
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 1. 获取输入值（请根据你HTML中实际的输入框ID修改！）
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // 2. 简单的输入验证
            if (!username || !password) {
                alert('用户名和密码不能为空！');
                return;
            }

            // 3. 从 localStorage 读取用户数据
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

            // 4. 查找匹配的用户
            const foundUser = existingUsers.find(user => 
                user.username === username && user.password === password
            );

            // 5. 验证并跳转
            if (foundUser) {
                alert('登录成功！');
                // 跳转到网站主页，例如 home.html
                window.location.href = 'home.html'; // 请确认你的主页文件名
            } else {
                alert('用户名或密码错误！');
            }
        });
    } else {
        console.error('未找到登录表单，请检查表单ID是否为“loginForm”。');
    }
});
