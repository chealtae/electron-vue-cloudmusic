<template>
    <div style="margin:25px auto;width:700px">
        <span class="title">编辑歌单信息</span>
        <div class="Info">
            <div class="form">
                <el-form  label-width="40px" :model="listInfo">
                    <el-form-item label="名称">
                        <el-input v-model="listInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input type="textarea" 
                        maxlength="300"
                        show-word-limit
                        :rows="3"
                         v-model="listInfo.introduction"></el-input>
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
                    <el-button round mini  style="margin-top:20px">封面编辑</el-button>
                </el-upload>
            </div>
        </div>
    </div>
</template>
<script>
import Bus from '../Common/bus'
import {getImgSrc} from '../Common/getSrc'
export default {
    data() {
        return {
            listId:'',
            listInfo:{},
            imageUrl:'',
            uploadRes:'',//上传成功后返回的图片名称
            uploadFlag:false,//判断是否上传过图片
        }
    },
    mounted() {
        console.log(this.$route.query)
        if(this.$route.query.listId){
            this.listId = this.$route.query.listId;
            this.getListInfo();
        }
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
            this.listInfo.userId = Number(localStorage.getItem("userId"));

            if(this.uploadFlag){ //只有上传后才改变
                this.listInfo.image = this.uploadRes;
            }

            this.$axios.post(`/SongListInfo/saveEdit`,this.listInfo).then((res) => {
                if(res.data.success){
                    this.$message.success("修改成功")
                    this.$router.back();
                }
            })
        },
        getListInfo(){
            this.$axios.get(`SongListInfo/getSongListInfo?listId=${this.listId}`).then((res) => {
                    if(res.data.success){
                        this.listInfo = res.data.playListDeatils;
                        this.listInfo.image = getImgSrc(res.data.playListDeatils.image);
                        this.imageUrl = this.listInfo.image;
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