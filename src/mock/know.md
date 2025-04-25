## 1.Mock.js有什么作用？
一种模拟后端接口的解决方案，能让我们提前调用模拟接口，完成前端开发
## 2.Mock.js的语法规范包括哪两部分？
数据模板和数据占位符
## 3.Mock.js基本代码格式
// 随机生成一个对象
var data6 = Mock.mock({
  id: '@id',
  username: '@cname',
  date: '@date{yyyy-MM-dd}',
  description: '@paragraph()',
  email: '@email()',
  'age|18-40': 0
})
console.log(data6)
