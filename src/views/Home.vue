<template>
    <el-container>
        <el-aside>
            <!-- logo -->
            <div class="logo">
                <img src="../assets/logo.png" alt="">
                <h5>若依后台管理系统</h5>
            </div>
            <!-- el-row内容 -->
            <el-row class="tac">
                <el-col>
                    <el-menu default-active="2" class="el-menu-vertical-demo" 
                        @open="handleOpen" @close="handleClose"
                        background-color="#545c64" text-color="#fff" 
                        active-text-color="#ffd04b">
                        <el-menu-item index="2" @click="$router.push('/one')">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航一</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="$router.push('/two')">
                            <i class="el-icon-document"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <!-- 可折叠的选项卡 -->
                        <!-- <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航三</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu> -->
                    </el-menu>
                </el-col>
            </el-row>
        </el-aside>
        <el-container>
            <el-header>
                <div class="loginbutton">
                    <button class="goto1" @click="goToLogin">去登录页</button>
                    <button class="goto2" @click="handleLogout">退出登录</button>
                </div>
            </el-header>
            <!-- 点击左侧的导航后 这个区域要切换页面 -->
            <el-main>
                <router-view></router-view> <!-- 渲染子路由 -->
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'Login',
    data() {
        return {
            isCollapse: true
        }
    },
    created() {

    },
    methods: {
        ...mapActions(['logout']),
        // 退出逻辑
        async handleLogout() {
            // 清除当前的user
            // 使用async/await可以确保在重定向之前完成状态更新
            await this.logout()
            // 退出登录后跳转到登录页面
            this.$router.push('/Login')
            // 退出提示
            console.log('退出成功')
        },
        // 直接跳转到Login
        goToLogin() {
            this.$router.push('/Login')
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>
/* 整体设置 */
.el-container:nth-child(1),
.el-container:nth-child(2) {
    height: 729px;
}

.el-container:nth-child(1) {
    display: flex;
}

.el-container:nth-child(2) {
    width: 1321px;
    /* 这个不用因为 内容区禁止缩小跑非常右边去了 */
    /* flex-shrink: 0; 禁止缩小 */
}
/* 整个aside侧边栏 */
.el-aside {
    width: 200px !important;
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
    flex-shrink: 0; /* 禁止缩小 */
}
/* logo区 */
.logo {
    width: 200px;
    height: 60px;
    line-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo img {
    width: 30px;
    height: 30px;
}

.logo h5 {
    margin: 0;
    width: 110px;
    height: 40px;
    line-height: 40px;
}
/* ul 列表 */
.el-menu-vertical-demo {
    width: 199px !important;
    height: 668px;
    text-align: left;
}


.el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: flex-end;
}

.goto1 {
    width: 70px;
    height: 40px;
    background-color: pink;
    line-height: 40px;
    margin-right: 5px;
}

.goto2 {
    width: 70px;
    height: 40px;
    background-color: pink;
    line-height: 40px;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    height: 668px;
    line-height: 668px;
}
</style>