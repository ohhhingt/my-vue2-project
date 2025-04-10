<template>
    <el-container>
        <!-- 注入tableData数据 -->
        <el-table :data="tableData">
            <!-- prop是对应对象中的键名 -->
            <!-- label是定义表格的列名 -->
            <el-table-column prop="date" label="日期" width="130"></el-table-column>
            <el-table-column prop="name" label="姓名" width="110"></el-table-column>
            <el-table-column prop="address" label="地址" width="260"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- scope.$index 是当前行的索引 -->
                    <!-- scope.row 是当前行的数据对象 -->
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑对话框 -->
        <!-- sync父子组件变量的双向绑定 -->
        <!-- 这里不是父子组件 不用也可以 -->
        <el-dialog :visible="dialogVisible" title="编辑活动" @close="handLeClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="日期">
                    <el-input v-model="form.date"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-container>
</template>

<script>
import axios from 'axios';
export default {
    name: 'One',
    data() {
        return {
            dialogVisible: false, // 控制对话框的显示与隐藏  
            currentIndex: null, // 当前编辑行的索引
            form: {
                name: '',
                date: '',
                address: ''
            },
            // 输出移动到 Mock/index.js中
            tableData: []
        }
    },
    created() {  
        this.fetchUsers();  
    }, 
    methods: {
        // 初始渲染选项卡
        async fetchUsers() {  
            try {
                const res = await axios.get('/api/users');
                console.log(res.data.data)
                this.tableData = res.data.data;
            } catch (error) {
                console.error('获取用户数据失败: ', error)
            }
        },
        // 删除
        handleDelete(index) {
            // 确认删除操作  
            this.$confirm('确定要删除该行吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 删除数据  
                this.tableData.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 关闭对话框
        handLeClose() {
            console.log('对话框已关闭');
            // 清空表单
            this.form = {
                date: '',
                name: '',
                address: ''
            }
            // 使用变量要用this.
            this.dialogVisible = false
        },
        // 编辑
        handleEdit(index, row) {
            this.currentIndex = index; // 保存当前行的索引
            this.form = { ...row }; // 将当前行的数据复制到表单中  
            this.dialogVisible = true; // 打开对话框 
        },
        // 编辑后提交
        onSubmit() {
            // 使用 $set 确保更新是响应式的  
            this.$set(this.tableData, this.currentIndex, { ...this.form });  
            // 关闭对话框  
            this.dialogVisible = false;
            // 弹出提示框
            this.$message({
                type: 'success',
                message: '编辑成功!'
            });
        }
    }
}  
</script>

<style scoped>
.el-container {
    /*不设置宽度 让他自适应  */
    /* width: 1296px;   */
    height: 628px;
    background-color: olivedrab;
}

.el-table {
    width: 100%;
    height: 590px;
}
</style>