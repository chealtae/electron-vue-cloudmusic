<template>
    <div>
        <div>
            <i class="el-icon-close" @click="closeWin" ></i>
        </div>
        <div class="logon_form">
            <el-form :model="logonForm" status-icon :rules="rules" ref="logonForm" label-width="100px" class="demo-logonForm">
                <el-form-item label="邮箱账号" prop="username">
                    <el-input  v-model="logonForm.username" class="form_input"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="logonForm.password"  class="form_input"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="checkpassword">
                    <el-input type="password" v-model="logonForm.checkpassword"  class="form_input"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('logonForm')">注册</el-button>
                    <el-button @click="resetForm('logonForm')">重置</el-button>
                </el-form-item>
                <div style="text-align:center">
                    <span class ="logon_span" @click="logon">
                        登录
                    </span>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import { ipcRenderer } from 'electron';
export default {
    data() {
         var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.logonForm.password) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return{
            logonForm:{username:'',password:'',checkpassword:''},
            rules:{
                password: [
                    {required: true, message: '请输入密码',trigger: 'blur' }
                ],
                checkpassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    methods: {
        closeWin() {
            ipcRenderer.send('closeLogin')
        },
        logon() {
            this.$router.push('/loginWin')
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.checkpassword = ''
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post(`User/logon`,this.logonForm).then((res) => {
                        if(res.data.success){
                            this.$message.success(res.data.message)
                            this.$router.push('/loginWin')
                        }
                        else{
                            this.$message.error(res.data.message)
                        }
                    }).catch((error) => {
                        // this.$message.error(error.data.message)
                    })
                } 
            });
        },
    }
}
</script>
<style scoped>
    .el-icon-close{
        cursor: pointer;
        font-size: 16px;
        float: right;
    }
    .logon_form{
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