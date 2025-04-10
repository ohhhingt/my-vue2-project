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
                    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        <el-menu-item index="2" @click="navigateTo('one')">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航一</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="navigateTo('two')">
                            <i class="el-icon-document"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
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
        // 跳转方法 避免重复导航
        // 这么做的好处是 如果已经在当前路由 则不做处理
        navigateTo(pageNum) {
            // 输出当前路由
            // console.log('当前路由:', this.$route.path);

            if (this.$route.path !== `/${pageNum}`) { // 检查当前路由  
                console.log(`跳转到 /${pageNum}`); // 输出跳转信息  
                this.$router.push(`/${pageNum}`).catch(err => {
                    if (err.name !== 'NavigationDuplicated') {
                        // console.error(err); // 处理其他错误  
                    }
                });
            } else {
                console.log('已经在 /one 路由，不需要跳转'); // 输出已在目标路由的信息  
            }
        }
    }
}
</script>

<style scoped>
/* 整体设置 */
.el-container:nth-child(1) {
    display: flex;
}

/* 整个aside侧边栏 */
.el-aside {
    width: 200px !important;
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
    flex-shrink: 0;
    /* 禁止缩小 */
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
    width: 199px;
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
    /* line-height: 668px; */
}
</style>