// src/mock/index.js  
import Mock from 'mockjs';
import data from './data.json'

// 定义 Mock 数据  
const Random = Mock.Random;  

// 模拟用户数据  
Mock.mock('/api/users', 'get', {  
    code: 200,  
    message: '成功',  
    // 使用 data.json中的tableData
    data: data.tableData
});  

// 你可以添加更多的 Mock 接口