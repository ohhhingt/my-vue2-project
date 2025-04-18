# my-vue2-project笔记

## 在有v-model的输入框中使用value v-model会覆盖value的值
所有应该设置v-model的值 而不是设置html的value

## vuex提交最好在store中 而本地存储最好的页面的方法中
只有vuex成功后返回结果 再进行本地存储

## 样式注意点
-   Element-UI的标签有默认样式 而且优先级很高

此时应该一切从简 可以设置的设置 有一些实在是设置不了的就换标签

-   注意style后面要加scoped防止样式混乱

-   不要使用元素选择器 比如直接 .el-container {} .el-table {}

因为可能会导致后面的样式继承 然后异常难以设置

-   只要能达到功能 样式代码应该是越少越好

比如 ` <el-table-column prop="date" label="日期"></el-table-column>`

的width="100px" 就不应该设置 这样窗口缩小放大会 自动放大放小

## 今天之前的版本 没有做 -   面包屑 标签

右边的版本有做面包屑 但是被改了vuex登录状态被改

用这边这个来做 因为那边漏太多

-   左边有 标签 面包屑移植过来

-   提示弹框

-   登录退出

    直接去清除users 回来发现点登录还能登录 然后就去改

-   mock echarts


