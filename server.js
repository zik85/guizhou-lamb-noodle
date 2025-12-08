const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dataFile = path.join(__dirname, 'data.json');

// 读取数据
async function readData() {
    try {
        const data = await fs.readFile(dataFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { users: [] };
    }
}

// 保存数据
async function saveData(data) {
    await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
}

// 注册接口
app.post('/api/register', async (req, res) => {
    console.log('📥 收到注册请求:', req.body);
    
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: '请填写所有字段' 
            });
        }
        
        const data = await readData();
        
        if (data.users.find(user => user.username === username)) {
            return res.status(400).json({ 
                success: false,
                message: '用户名已存在' 
            });
        }
        
        const newUser = {
            id: Date.now(),
            username,
            email,
            password,
            createdAt: new Date().toISOString()
        };
        
        data.users.push(newUser);
        await saveData(data);
        
        console.log('✅ 用户注册成功:', username);
        
        res.json({ 
            success: true,
            message: '注册成功！', 
            userId: newUser.id
        });
        
    } catch (error) {
        console.error('💥 注册错误:', error);
        res.status(500).json({ 
            success: false,
            message: '服务器错误' 
        });
    }
});

// 测试接口
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true,
        message: '✅ 后端服务正常运行!' 
    });
});

// 使用3001端口
const PORT = 3001;

app.listen(PORT, () => {
    console.log('='.repeat(40));
    console.log('🚀 服务器启动成功!');
    console.log('📍 端口: 3001');
    console.log('🌐 地址: http://localhost:3001');
    console.log('='.repeat(40));
});