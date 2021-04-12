<template>
    <div class="login_main">
        <div>
            <i class="el-icon-close" ></i>
        </div>
        <div class="login_form">
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
                <el-form-item label="邮箱账号" prop="username">
                    <el-input  v-model="loginForm.username" class="form_input"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password"  class="form_input"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
                <div style="text-align:center">
                    <span class ="logon_span">
                        注册
                    </span>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            loginForm:{username:'',password:''},
            rules:{
                password: [
                    {required: true, message: '请输入密码',trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    // { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('wwwwwwwwwwwwwwww')
                    this.$axios.post(`User/login`,this.loginForm).then((res) => {
                        if(res.data.success){
                            this.$message.success(res.data.message)
                        }
                        else{
                            this.$message.error(res.data.message)
                        }
                    }).catch((error) => {
                        this.$message.error(error.data.message)
                    })
                } 
            });
        }
    }
}
</script>
<style scoped>
    .el-icon-close{
        cursor: pointer;
        font-size: 16px;
        float: right;
    }
    .login_form{
        padding-top: 50px;
    }
    .form_input{
        width: 210px;
    }
    .logon_span{
        cursor: pointer;
        color: cornflowerblue;
        text-decoration: underline;
    }
</style>