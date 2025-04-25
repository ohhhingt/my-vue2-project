<template>
    <div class="background2">
        <div class="Register">
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
                <button type="submit">注册</button>
            </form>
            <button class="goto" @click="goToLogin">去登录页</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Register',
    data() {
        return {
            username: '',
            password: '',
            rememberMe: false
        }
    },
    created() {
        this.username = 'admin',
            this.password = '12345'
    },
    methods: {
        ...mapActions(['register']),
        async handleSubmit() {
            const user = {
                username: this.username,
                password: this.password
            }

            // 这里是注册逻辑
            const res = await this.register(user)

            if (res) {
                // 确保DOM状态更新后再跳转
                // 而不是立即跳转 那样可能dom没渲染好就过去发生问题  
                this.$nextTick(() => {
                    // 跳转到首页 .catch后面的代码是用来捕获错误的
                    this.$router.replace('/Login').catch(err => {
                        if (err.name !== 'NavigationDuplicated') {
                            console.error(err);
                        }
                    });
                });
                // 显示弹窗
                this.$message({
                    message: '注册成功！',
                    type: 'success'
                });
            } else {
                // 显示弹窗
                this.$message({
                    message: '该用户已被注册！',
                    type: 'error'
                });
            }
            // 清空输入框
            this.username = '';
            this.password = '';
        },
        goToLogin() {
            this.$router.push('/Login')
        }
    }
}
</script>

<style>
.background2 {
    background-image: url('../assets/注册.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.Register {
    width: 365px;
    height: 335px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #dcdada;
    position: relative;
}

.Register form {
    width: 345px;
    height: 290px;
    padding-left: 10px;
}

.tubiao {
    width: 28px;
    height: 23px;
}

.Register form h3 {
    color: #222;
}

.Register form ul {
    width: 327px;
    height: 210px;
    /* background-color: darkgoldenrod; */
    padding-left: 21px;
}

.Register form ul li {
    width: 300px;
    height: 40px;
    /* background-color: darkcyan; */
    display: flex;
    align-items: center;
    border: 1px solid #979797;
    margin-bottom: 14px;
    border-radius: 4px;

}

.Register form ul li:last-child {
    width: 300px;
    height: 20px;
    border: 1px solid #fff;
}

.Register form ul li input {
    width: 262px;
    height: 30px;
}

.Register form ul li .checkbox {
    width: 12px;
    height: 12px;
}

.Register form ul li .checkbox {
    width: 12px;
    height: 12px;
}

.Register form ul li:nth-child(3) {
    width: 300px;
    height: 40px;
    /* background-color: darkcyan; */
    display: flex;
    align-items: center;
    border: 1px solid #979797;
    margin-bottom: 14px;
    border-radius: 4px;
}

.Register form ul li:nth-child(3) input {
    width: 192px;
}

.Register form ul li:nth-child(3) .verificationcode {
    width: 100px;
    height: 40px;
    background-color: darkcyan;
    margin-left: 5px;
    line-height: 40px;
    cursor: pointer;
}

.Register form button {
    width: 320px;
    height: 40px;
    border: 0;
    color: #fff;
    background-color: rgb(54, 141, 224);
    cursor: pointer;
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