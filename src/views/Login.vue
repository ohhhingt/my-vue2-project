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
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            rememberMe: false,
        }
    },
    computed: {  
        ...mapGetters(['getUser']), // 映射 Vuex 的 getUser getter  
    },  
    methods: {
        ...mapActions(['login']),
        handleSubmit() {
            if (this.username === 'admin' && this.password === '12345') {  
                // 包装对象  
                const user = {  
                    username: this.username  
                }  
                console.log(user) // 有东西
                console.log(this.login); // 打印 login 方法  
                // 调用 vuex 仓库中的 login 方法  
                this.login(user); // 把包装好的对象丢进去  
                // const rem = this.rememberMe ? '记住了' : '没有记住';  
                // alert(`用户名: ${this.username}， 密码: ${this.password}， 记住密码: ${rem}`)  
            } else {  
                if (this.username !== 'admin') {  
                    alert('请重新输入账号');  
                }  
                if (this.password !== '12345') {  
                    alert('请重新输入密码');  
                }  
            } 
        },
    },
    // watch: {  
    //     getUser(newValue) {  // 监听 Vuex 的 getUser  
    //         console.log('用户信息已更新:', newValue);  
    //     }   
    // }  
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
.loginbox form ul li:nth-child(3) input{
    width: 192px;
}
.loginbox form ul li:nth-child(3) .verificationcode{
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
    border: 0;
    color: #fff;
    background-color: rgb(54, 141, 224);
    cursor: pointer;
}
.r_password {
    font-size: 14px;
    color: #222;
}

</style>