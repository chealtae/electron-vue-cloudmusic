<template>
    <div class="logoutContent">
        <div class="userInfomatioin">
            <div class="info_item">
                <span class="info_span">{{otherInfo.shareNumber}}</span><br>
                <span class="info_span">动态</span>
            </div>
            <div class="info_item">
                <span class="info_span">{{otherInfo.followNumber}}</span><br>
                <span class="info_span">关注</span>
            </div>
            <div class="info_item">
                <span class="info_span">{{otherInfo.fansNumber}}</span><br>
                <span class="info_span">粉丝</span>
            </div>
        </div>
        <el-divider></el-divider>
        <div @click="logout" style="cursor:pointer ;height: 40px;">
            <img src="../../assets/img/logout.svg" alt="" style="float:left ;margin-left: 15px;"> 
            <span class="logout_span">退出登录</span>
        </div>
    </div>

</template>
<script>
import { ipcRenderer } from 'electron'
export default {
    data() {
        return{
            otherInfo:{fansNumber:'',followNumber:'',shareNumber:''},
            userId:Number(localStorage.getItem("userId")),
        }
    },
    mounted() {
        this.getOtherInfo();
    },
    methods:{
        logout(){
            localStorage.removeItem("userId")
            ipcRenderer.send("restart");
            //整个窗口刷新更数据
        },
        getOtherInfo(userId){
            this.$axios.get(`/Operation/getOtherInfo?userId=`+this.userId).then((res) => {
                if(res.data.success){
                    this.otherInfo.shareNumber = res.data.shareNumber;
                    this.otherInfo.fansNumber = res.data.fansNumber;
                    this.otherInfo.followNumber = res.data.followNumber;
                }
            })
        }
    }
}
</script>
<style scoped>
    .logoutContent{
        position: fixed;
        right: 200px;
        background-color: white;
        box-shadow: 1px 2px 6px 0px #c1baba;
        border-radius: 3px;
    }
    .userInfomatioin{
        display: flex;
        justify-content: space-around;
        width: 190px;
        margin-top: 20px;
    }
    .info_item{
        text-align: center;
    }
    .info_item:hover .info_span{
        color: black;
        font-size: 14px;
        cursor: pointer;
    }
    .info_span{
        color: rgba(80, 76, 76, 0.81);
        font-size: 14px;
    }
    .logout_span{
        display: inline-block;
        width: 100px;
        margin-top: 8px;
    }
    .el-divider--horizontal {
        display: block;
        height: 1px;
        width: 177px;
        margin: 5px auto;
    }
</style>