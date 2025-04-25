// 尽可能用require
const Mock = require('mockjs')
// console.log(Mock)

// 调用Mock方法 生成模拟的数据

// 生成一个用户名 *出现1-10次
var data1 = Mock.mock({
  'username|1-10': '*'
})
console.log(data1)

// 生成一个用户名 *出现5次
var data2 = Mock.mock({
  'username|5': '*'
})
console.log(data2)

// 生成一个年龄 年龄18-40岁中间
var data3 = Mock.mock({
  'api|18-40': 0
})
console.log(data3)

// 随机生成一个id
var data4 = Mock.mock('@id')
console.log(data4)

// 随机生成一个中文名称
var data5 = Mock.mock('@cname()')
console.log(data5)

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