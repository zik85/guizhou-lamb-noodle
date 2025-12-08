// 模拟注册功能
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    
    // 简单验证
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: '请填写所有字段' 
      });
    }
    
    // 返回成功响应
    return res.json({
      success: true,
      message: '注册成功（演示模式）',
      userId: Date.now(),
      username: username
    });
  }
  
  return res.status(405).json({ success: false, message: '方法不允许' });
};