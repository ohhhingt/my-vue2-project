<template>
    <div class="background2">
        <div class="Register">
            <form action="#" @submit.prevent="handleSubmit">
                <h3>若依后台管理系统</h3>
                <ul>
                    <li>
                        <div class="tubiao">✅</div>
                        <input type="text">
                    </li>
                    <li>
                        <div class="tubiao">✅</div>
                        <input type="text">
                    </li>
                    <li>
                        <input type="text">
                        <div class="verificationcode">验证码</div>
                    </li>
                    <li>
                        <input type="checkbox" class="checkbox">
                        <p class="r_password">记住密码</p>
                    </li>
                </ul>
                <button>登录</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            username: '',
            password: '',
            rememberMe: false
        }
    },
    methods: {
        handleSubmit() {
            if (this.username !== 'admin') {
                alert('账号是admin')
            }
            if (this.username !== '12345') {
                alert('密码是12345')
            }
            if (!this.username && !this.password) {
                const rem = this.rememberMe ? '记住了' : '没有记住';  
                alert(`用户名: ${this.username}， 密码: ${this.password}， 记住密码: ${rem}`)
            }
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
.Register form ul li:nth-child(3) input{
    width: 192px;
}
.Register form ul li:nth-child(3) .verificationcode{
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
</style>