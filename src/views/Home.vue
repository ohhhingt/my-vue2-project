<template>
    <div class="background3">
        <div class="home">
            <p>{{ num }}</p>
            <button class="goto1" @click="goToLogin">去登录页</button>
            <button class="goto2" @click="handleLogout">退出登录</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'Login',
    data() {
        return {
            num: 'sdafasfasdf'
        }
    },
    created() {
        
    },
    methods: {
        ...mapActions(['logout']),
        handleLogout() {
            this.logout()
            // 退出登录后跳转到登录页面
            this.$router.push('/Login')
        },
        goToLogin() {
            this.$router.push('/Login')
        }
    }
}
</script>

<style>
.background3 {
    background-image: url('../assets/草原.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
.loginbox {
    width: 365px;
    height: 335px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #dcdada;
    position: relative;
}
.goto1 {
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 40px;
    background-color: pink;
    line-height: 40px;
}
.goto2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 70px;
    height: 40px;
    background-color: pink;
    line-height: 40px;
}
</style>