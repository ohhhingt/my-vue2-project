<template>
    <el-container>
        <!-- 决定不适用aside 因为有默认宽度 而且优先级极高 -->
        <!-- aside原先位置 -->
        <!-- 侧边栏内容 -->
        <el-row class="tac">
            <el-col>
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b" :collapse="isCollapse">
                    <el-menu-item>
                        <img class="logo" src="../assets/logo.png" alt="">
                        <span class="logoh5" slot="title">若依管理系统</span>
                    </el-menu-item>
                    <!-- 选项卡 -->
                    <el-menu-item index="2" @click="navigateTo('HomePage')">
                        <i class="el-icon-house"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <!-- 表格页面 -->
                    <el-menu-item index="1-2" @click="navigateTo('TablePage')">
                        <i class="el-icon-document"></i>
                        <span slot="title">表格页面</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>

        <el-container>
            <el-header class="one-el-header">
                <div class="header-position">
                    <!-- 展开收起 -->
                    <div class="zhankai" @click="toggleCollapse">
                        <i class="el-icon-s-unfold"></i>
                        <span>{{ isCollapse ? '展开' : '收起' }}</span>
                    </div>
                    <!-- 面包屑 -->
                    <div class="Breadcrumb">
                        <!-- 面包屑完工 -->
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item v-for="breadCrumbItem in breakCrumbList" :key="breadCrumbItem.path">
                                {{ breadCrumbItem.meta.title }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
                <div class="headerright">
                    <ul>
                        <li><img class="header-icon-img" src="../assets/搜索.png" alt="github"></li>
                        <li><img class="header-icon-img" src="../assets/github-fill.png" alt="github"></li>
                        <li><img class="header-icon-img" src="../assets/问号.png" alt="问号"></li>
                        <li><img class="header-icon-img" src="../assets/全屏.png" alt=""></li>
                        <li><img class="header-icon-img" src="../assets/字体大小.png" alt=""></li>
                        <li>
                            <div class="avatar"><img src="../assets/logo.png" alt=""></div>
                        </li>
                        <li>
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="login">去登录页</el-dropdown-item>
                                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul>
                </div>
            </el-header>
            <!-- 标签区 -->
            <div class="el-tag-one">
                <el-tag class="el-tag-item" v-for="(tag, index) in breakCrumbList" 
                    :key="tag.name" :type="tag.meta.type" 
                    @close="handleTagClose(index)" closable>
                    {{ tag.meta.title }}
                </el-tag>
            </div>
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
        // 检测跳转数据 用于填充面包屑
        // console.log(this.$route)
    },
    computed: {
        // 面包屑数组 数据靠下面这个填充
        breakCrumbList() {
            return this.$route.matched
        }
    },
    methods: {
        ...mapActions(['logout']),
        // 下拉菜单方法
        handleCommand(command) {
            switch (command) {
                // 去登录页
                case 'login':
                    this.goToLogin();
                    break;
                // 退出登录
                case 'logout':
                    this.handleLogout();
                    break;
                default:
                    break;
            }
        },
        // 去登录页
        goToLogin() {
            this.$router.push('/Login')
        },
        // 退出登录
        async handleLogout() {
            // 清除当前的user
            // 使用async/await可以确保在重定向之前完成状态更新
            await this.logout()
            // 退出登录后跳转到登录页面
            this.$router.push('/Login')
            // 显示弹窗
            this.$message({
                 message: '退出成功！',
                 type: 'success'
            });
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
        },
        // 展开收缩按钮合并为一个方法
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        },
        // 跳转标签 跳转会上一级
        handleTagClose(index) {
            // 获取当前的面包屑列表  
            const breadcrumbs = this.breakCrumbList;

            // 如果有上一级，返回上一级  
            if (index > 0) {
                const previousTag = breadcrumbs[index - 1];
                this.$router.push(previousTag.path); // 跳转到上一级  
            }
        }


    }
}
</script>

<style scoped>
/* 注意 尽可能不要去设置 元素类名 可能会被继承 */
/* 整体设置 */
.el-container:nth-child(1) {
    display: flex;
}

/* 伸缩盒子的设置 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

/* 左侧sider ul 列表 */
.el-menu-vertical-demo {
    /* 不带宽度 不然无法伸缩 */
    /* width: 199px; */
    height: 729px;
    text-align: left;
}

.logo {
    width: 20px;
    height: 20px;
    margin: 0 5px 0 2px;
}

.logoh5 {
    font-weight: 600;
    font-size: 17px;
}

/* 展开 */
.one-el-header {
    background-color: #fff;
    color: #333;
    text-align: center;
    height: 60px;
    /* line-height: 60px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: inset 0 -1px 0 #E3E5E7;
}

.header-position {
    position: relative;

}

.zhankai {
    cursor: pointer;
    display: inline-block;
    width: 50px;
    height: 33px;
    line-height: 33px;
    position: absolute;
    top: -16px;
    margin: 0;
    border-radius: 5px;

}

.zhankai:hover {
    background-color: rgb(144, 151, 165);
}

.zhankai i {
    font-size: 20px;
    vertical-align: middle;
    margin-top: -2px;
}

.zhankai span {
    font-size: 14px;
    color: #6a6767;
}

/* 面包屑 */
.Breadcrumb {
    width: 270px;
    height: 16px;
    /* background-color: pink; */
    position: absolute;
    top: -5px;
    left: 60px;

}

/* 右侧功能区 */
.headerright {
    width: 230px;
    height: 40px;
    /* background-color: pink; */
}

.headerright ul {
    width: 230px;
    height: 40px;
    /* background-color: rgb(60, 184, 48); */
    display: flex;
    align-items: center;
    justify-content: center;
}

.headerright ul li {
    width: 33px;
    height: 20px;
    cursor: pointer;
    /* background-color: rgb(198, 168, 20); */
}

.headerright .header-icon-img {
    width: 20px;
    height: 20px;
    /* background-color: rgb(60, 184, 48); */
}

.avatar {
    width: 30px;
    height: 30px;
    /* background-color: pink; */
    margin: -5px 5px 0 2px;
}

.avatar img {
    width: 30px;
    height: 30px;
}

/* 下拉菜单 */
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}

/* 跳转标签 */
.el-tag-one {
    height: 30px;
    /* background-color: rgb(185, 185, 185); */
    text-align: left;
    padding: 0 20px;
    box-shadow: inset 0 -1px 0 #E3E5E7;
}

.el-tag-item {
    margin-right: 7px;
}



/* 这个只设置基础样式 后续的样式在各自页面中实现 */
.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    height: 668px;
    padding: 5px 20px 0;
    /* line-height: 668px; */
}
</style>