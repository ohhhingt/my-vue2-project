<template>
    <el-container class="one">
        <!-- 注入tableData数据 -->
        <el-table :data="displayedData">
            <!-- prop是对应对象中的键名 -->
            <!-- label是定义表格的列名 -->
            <el-table-column prop="date" label="日期" width="160px"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
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
        <!-- 1. sync父子组件变量的双向绑定 -->
        <!-- 这里不是父子组件 不用也可以 -->
        <!-- 2. 注意数组使用了 dialogVisible 经过切片的数组渲染 -->
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
                <div>
                    <el-button type="primary" @click="onSubmit">修改</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </div>
            </el-form>
        </el-dialog>

        <!-- 分页器 -->
        <div class="block">
            <!-- 1. 上一页 页码按钮 下一页 -->
            <!-- 2. 当前页码 -->
            <!-- 3. 每页显示的条目 几条数据 -->
            <!-- 4. 总条目数 就是页码 -->
            <!-- 5. 当页码变化时 调用方法重新切出十条数据显示 -->
            <el-pagination 
                layout="prev, pager, next" 
                :current-page="currentPage"
                :page-size="pageSize"
                :total="total"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </el-container>
</template>

<script>
import axios from 'axios';
export default {
    name: 'TablePage',
    data() {
        return {
            dialogVisible: false, // 控制对话框的显示与隐藏  
            currentIndex: null, // 当前编辑行的索引
            form: {
                name: '',
                date: '',
                address: ''
            },
            tableData: [], // 获取接口数据的数组
            // 分页器变量
            displayedData: [], // 用于显示的数据 
            currentPage: 1, // 当前页
            pageSize: 10, // 每页显示的条目数(参与计算需要保留)
            total: 0 // 总页码
        }
    },
    // 初始渲染
    created() {
        this.fetchUsers();
    },
    methods: {
        // 初始渲染选项卡
        async fetchUsers() {
            try {
                const res = await axios.get('/api/users');
                // console.log(res.data); // 打印完整响应
                // 获取数据
                this.tableData = res.data.data;
                // 设置总条目数
                this.total = this.tableData.length;
                // 调用切片数据方法 更新当前页的数据
                this.updateTableData();
            } catch (error) {
                console.error('获取用户数据失败: ', error)
            }
        },
        // 切片数组数据方法
        updateTableData() {
            // 当前页减一，得到从零开始的索引
            // 将页数转换为数据的起始索引
            const start = (this.currentPage - 1) * this.pageSize;
            // 计算当前页数据的结束索引
            const end = start + this.pageSize;
            // 使用 slice 方法从 tableData 中提取出从 start 到 end 的数据，并将其赋值给 displayedData
            this.displayedData = this.tableData.slice(start, end);
        },
        // 分页器的回调
        handleCurrentChange(page) {
            this.currentPage = page; // 更新当前页  
            this.updateTableData(); // 更新显示的数据 
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
.one {
    /*不设置宽度 让他自适应  */
    /* width: 1296px;   */
    height: 628px;
    display: block;
    /* background-color: olivedrab; */
    position: relative;
}

.el-table {
    width: 100%;
    height: 630px;
}

.block {
    height: 33px;
    /* background-color: pink; */
    position: absolute;
    bottom: -2px;
    right: -5px;
}
</style>