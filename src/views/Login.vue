<template>
    <div class="background1">
        <div class="loginbox">
            <form action="#" @submit.prevent="handleSubmit">
                <h3>若依后台管理系统</h3>
                <ul>
                    <li>
                        <div class="tubiao">✅</div>
                        <input type="text" v-model="username" placeholder="用户名">
                    </li>
                    <li>
                        <div class="tubiao">✅</div>
                        <input type="password" v-model="password" placeholder="密码">
                    </li>
                    <li>
                        <input type="text" placeholder="验证码">
                        <div class="verificationcode">验证码</div>
                    </li>
                    <li>
                        <input type="checkbox" class="checkbox" v-model="rememberMe">
                        <p class="r_password">记住密码</p>
                    </li>
                </ul>
                <button type="submit">登录</button>
            </form>
            <button class="goto" @click="goToRegister">去注册页</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            rememberMe: false,
        }
    },
    created() {
        this.username = 'admin',
        this.password = '12345'
    },
    methods: {
        ...mapActions(['login']),
        async handleSubmit() {
            const user = {
                username: this.username,
                password: this.password
            }

            // 调用 Vuex 仓库中的 login 方法，并等待结果  
            const success = await this.login(user);

            if (success) {
                console.log('Login successful, navigating to home...'); 
                // 存储用户信息
                localStorage.setItem('currentUser', JSON.stringify(user));

                // 确保状态更新后再跳转  
                this.$nextTick(() => {
                    // 跳转到首页  
                    this.$router.replace('/home').catch(err => {
                        if (err.name !== 'NavigationDuplicated') {
                            console.error(err);
                        }
                    });
                });
                // 显示弹窗
                this.$message({
                     message: '登录成功！',
                     type: 'success'
                });
            } else {
                console.log('登录失败')
            }
        },
        goToRegister() {
            this.$router.push('/register')
        }
    }
}
</script>

<style>
.background1 {
    background-image: url('../assets/登录.webp');
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

.loginbox form {
    width: 345px;
    height: 290px;
    padding-left: 10px;
}

.tubiao {
    width: 28px;
    height: 23px;
}

.loginbox form h3 {
    color: #222;
}

.loginbox form ul {
    width: 327px;
    height: 210px;
    /* background-color: darkgoldenrod; */
    padding-left: 21px;
}

.loginbox form ul li {
    width: 300px;
    height: 40px;
    /* background-color: darkcyan; */
    display: flex;
    align-items: center;
    border: 1px solid #979797;
    margin-bottom: 14px;
    border-radius: 4px;

}

.loginbox form ul li:last-child {
    width: 300px;
    height: 20px;
    border: 1px solid #fff;
}

.loginbox form ul li input {
    width: 262px;
    height: 30px;
}

.loginbox form ul li .checkbox {
    width: 12px;
    height: 12px;
}

.loginbox form ul li .checkbox {
    width: 12px;
    height: 12px;
}

.loginbox form ul li:nth-child(3) {
    width: 300px;
    height: 40px;
    /* background-color: darkcyan; */
    display: flex;
    align-items: center;
    border: 1px solid #979797;
    margin-bottom: 14px;
    border-radius: 4px;
}

.loginbox form ul li:nth-child(3) input {
    width: 192px;
}

.loginbox form ul li:nth-child(3) .verificationcode {
    width: 100px;
    height: 40px;
    background-color: darkcyan;
    margin-left: 5px;
    line-height: 40px;
    cursor: pointer;
}

.loginbox form button {
    width: 320px;
    height: 40px;
    background-color: rgb(54, 141, 224);
}

.r_password {
    font-size: 14px;
    color: #222;
}

.goto {
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 40px;
    background-color: pink;
    line-height: 40px;
}
</style>