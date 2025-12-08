// register.js - 纯前端注册逻辑 (用于 GitHub Pages)
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 1. 获取输入值（请根据你HTML中实际的输入框ID修改！）
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const email = document.getElementById('email') ? document.getElementById('email').value : '';

            // 2. 简单的输入验证
            if (!username || !password) {
                alert('用户名和密码不能为空！');
                return;
            }

            // 3. 从 localStorage 读取现有用户
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

            // 4. 检查用户名是否已存在
            if (existingUsers.find(user => user.username === username)) {
                alert('用户名已存在，请更换！');
                return;
            }

            // 5. 创建新用户对象
            const newUser = {
                username: username,
                password: password,
                email: email
            };

            // 6. 添加到数组并保存回 localStorage
            existingUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(existingUsers));

            // 7. 成功提示并跳转
            alert('注册成功！即将跳转到登录页面。');
            window.location.href = 'login.html'; // 跳转到登录页
        });
    } else {
        console.error('未找到注册表单，请检查表单ID是否为“registerForm”。');
    }
});
