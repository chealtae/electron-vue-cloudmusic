<template>
    <div style="margin:25px auto;width:700px">
        <span class="title">编辑个人信息</span>
        <div class="Info">
            <div class="form">
                <el-form  label-width="40px" :model="formLabelAlign">
                    <el-form-item label="昵称">
                        <el-input v-model="formLabelAlign.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="介绍">
                        <el-input type="textarea" 
                        maxlength="300"
                        show-word-limit
                        :rows="3"
                         v-model="formLabelAlign.introduction"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="formLabelAlign.sex">
                        <el-radio label="0">保密</el-radio>
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="地区">
                        <el-input v-model="formLabelAlign.region"></el-input>
                    </el-form-item>
                </el-form>
                <el-button round mini type="primary" @click="save">保存</el-button>
                <el-button round mini @click="cancel">取消</el-button>
            </div>
            <!-- <div class="userImg">
                <img :src="formLabelAlign.image" alt="" class="imgItem">
                <el-button round mini  style="margin-left:50px">修改头像</el-button>
            </div> -->
            <div class="userImg">
                <el-upload
                    class="avatar-uploader"
                    action="http://localhost:8888/User/uploadImg"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <el-button round mini  style="margin-top:20px;">修改头像</el-button>
                </el-upload>
            </div>
        </div>
    </div>
</template>
<script>
import Bus from '../Common/bus'
export default {
    data() {
        return {
            formLabelAlign: {
                nickname: this.$route.query.nickname,
                region: this.$route.query.region,
                introduction: this.$route.query.introduction,
                sex:this.$route.query.sex,
                image:this.$route.query.image
            },
            imageUrl:this.$route.query.image,
            uploadRes:'',//上传成功后返回的图片名称
            uploadFlag:false,//判断是否上传过图片
        }
    },
    mounted() {
        console.log(this.$route.query)
    },
    methods:{ 
        handleClose(){
            this.dialogVisible = false
        },
        handleAvatarSuccess(res, file) { //上传成功返回
            this.imageUrl = URL.createObjectURL(file.raw);
            this.uploadRes = res.filename;//获得上传成功图片名称
            this.uploadFlag = true
        },
        beforeAvatarUpload(file) { 
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        cancel(){
            this.$router.back();
        },
        save(){
            this.formLabelAlign.userId = Number(localStorage.getItem("userId"));
            this.formLabelAlign.sex = Number(this.formLabelAlign.sex);

            if(this.uploadFlag){ //只有上传后才改变
                this.formLabelAlign.image = this.uploadRes;
            }

            this.$axios.post(`/User/saveEdit`,this.formLabelAlign).then((res) => {
                if(res.data.success){
                    this.$message.success("修改成功")
                    Bus.$emit('update',true) //菜单栏需要同步
                    this.$router.back();
                }
            })
        }
    }
}
</script>
<style scoped>
    .Info{
        display: flex;
    }
    .form{
        width: 500px;
        margin-top: 20px;
    }
    .userImg{
        width: 200px;
        margin-left: 25px;
    }
    .imgItem{
        width: 175px;
        height: 175px;
        margin: 20px auto;
        display: block;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>