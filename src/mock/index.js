const Mock = require('mockjs');
const data = require('./data.json')
// console.log(data.chinamapdata)
// 注意点
// 1. 为什么会报错 可能的原因是系统不知道这些数据
// 最好打印一下 可能就好了
// 2. 修改完下面那些暴露什么的 最好重启一下项目

Mock.mock('/api/bardata', 'get', {
  code: 200,
  message: '成功',
  data: data.bardata
});

Mock.mock('/api/horizontaldata', 'get', {
  code: 200,
  message: '成功',
  data: data.horizontaldata
});

Mock.mock('/api/lineData', 'get', {
  code: 200,
  message: '成功',
  data: data.linedata
});

Mock.mock('/api/linevariesdata', 'get', {
  code: 200,
  message: '成功',
  data: data.linevariesdata
});

Mock.mock('/api/piechartonedata', 'get', {
  code: 200,
  message: '成功',
  data: data.piechartonedata
});

Mock.mock('/api/piecharttwodata', 'get', {
  code: 200,
  message: '成功',
  data: data.piecharttwodata
});

Mock.mock('/api/chinamapdata', 'get', {
  code: 200,
  message: '成功',
  data: data.chinamapdata
});

// 将上面这个接口向外暴露  
module.exports = function (app) {
  // node中的express框架  
  // 参数1：接口地址; 参数2：服务器处理函数  
  app.use('/api/bardata', (req, res) => { // 确保路径前面有斜杠  
    // 将模拟的数据转成json格式返回给浏览器  
    res.json({
      code: 200,
      message: '成功',
      data: data.bardata
    });
  });

  app.use('/api/horizontaldata', (req, res) => {
    res.json({
      code: 200,
      message: '成功',
      data: data.horizontaldata
    });
  });

  app.use('/api/lineData', (req, res) => {
    res.json({
      code: 200,
      message: '成功',
      data: data.linedata
    });
  });

  app.use('/api/linevariesdata', (req, res) => {
    res.json({
      code: 200,
      message: '成功',
      data: data.linevariesdata
    });
  });

  app.use('/api/piechartonedata', (req, res) => {
    res.json({
      code: 200,
      message: '成功',
      data: data.piechartonedata
    });
  });

  app.use('/api/piecharttwodata', (req, res) => {
    res.json({
      code: 200,
      message: '成功',
      data: data.piecharttwodata
    });
  });

  app.use('/api/chinamapdata', (req, res) => {
    res.json({
      code: 200,
      message: '成功',
      data: data.chinamapdata
    });
  });

};