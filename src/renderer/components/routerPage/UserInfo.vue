<template>
    <div style="height:100%; overflow:auto">
        <div class="information">
            <img :src="userInfo.image" alt="" class="imgItem">
            <div class="infoItem">
                <div>
                    <span class="userName">{{userInfo.nickname}}</span>
                    <el-button round icon="el-icon-edit" v-if="IsSelf" @click="edit">编辑个人信息</el-button>
                    <el-button round icon="el-icon-plus" v-if="!isFollow && !IsSelf" mini @click="follow" >关注</el-button>
                    <el-button round icon="el-icon-check" v-if="isFollow && !IsSelf" mini @click="cancelFollow">已关注</el-button>
                </div>
                <el-divider></el-divider>
                <div class="fansInfo">
                    <div class="info_item" @click="go2share">
                        <span class="info_span_1">{{otherInfo.shareNumber}}</span><br>
                        <span class="info_span">动态</span>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="info_item" @click="go2follow">
                        <span class="info_span_1">{{otherInfo.followNumber}}</span><br>
                        <span class="info_span">关注</span>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="info_item" @click="go2fans">
                        <span class="info_span_1">{{otherInfo.fansNumber}}</span><br>
                        <span class="info_span">粉丝</span>
                    </div>
                </div>
                <div style="margin-top: 10px;">
                    <span class="item_span">所在地:</span>
                    <span class="item_span">{{region}}</span><br>
                    <span class="item_span">个人介绍:</span>
                    <span class="item_span">{{introduction}}</span>
                    
                </div>
            </div>
        </div>
        <div class="collectList">
            <span class="collectSpan">{{userInfo.nickname}}创建的歌单</span>
            <div class="collect_playlist">
               <div class="collect_playlist_item" v-for="item in collectList" :key="item.id" @click="go2PlayListItem(item.id)">
                   <div class="item_img">
                       <img :src="item.image" alt="" style="width:100% ; height:100%; border-radius:6px">
                   </div>
                   <div class="item_span_1">{{item.name}}</div>
               </div>
           </div>
        </div>
    </div>
</template>
<script>
import {getImgSrc} from '../Common/getSrc'
export default {
    data() {
        return {
            userInfo:'',
            introduction:'', //用户创建的时候默认为空，特地将这两个数据拿出来处理，防止带入编辑界面的数据有误。
            region:'',
            src:'',
            IsSelf:this.$route.query.id === localStorage.getItem("userId"),
            collectList:[],
            isFollow:false,
            otherInfo:{fansNumber:'',followNumber:'',shareNumber:''},
            currentId:  Number(this.$route.query.id),
        }
    },
    mounted() {
        if(this.$route.query){
            let userId = Number(this.$route.query.id)//路由传值过来的数据都会转换成String
            this.getUserInfo(userId)
            this.getOtherInfo(userId);
        }
        this.judgeFollow();
        
    },
    methods: {
        getUserInfo(id){
            this.$axios.get(`/User/getAllInfo?userId=`+id).then((res) => {
                if(res.data.success){
                    this.userInfo = res.data.userInfo;
                    if(!this.userInfo.region){
                        this.region = '未知'
                    }
                    if(!this.userInfo.introduction){
                        this.introduction = '这个人很懒，什么都没有留下'
                    }
                    this.userInfo.imageBackup = this.userInfo.image
                    this.userInfo.image = getImgSrc(res.data.userInfo.image);//个人头像和歌曲列表的图片都要处理
                    this.collectList = res.data.collectList;
                    this.collectList.map((item) => {
                        item.image = getImgSrc(item.image);
                        return item
                    })
                    
                }
            })
        },
        edit(){
            this.$router.push({
                path:'/editInfo',
                query:{
                    nickname:this.userInfo.nickname,
                    region:this.userInfo.region,
                    introduction: this.userInfo.introduction,
                    image:this.userInfo.image,
                    sex:this.userInfo.sex,
                    imageBackup:this.userInfo.imageBackup,
                }
            })
        },
        //判断是否关注该用户
        judgeFollow(){
            let info = {}
            info.userId = Number(localStorage.getItem("userId"))
            info.followType = 1 // 1 代表关注的是用户 0 代表歌手
            info.typeId =   Number(this.$route.query.id) 
            this.$axios.post(`/Operation/judgeFollow`,info).then((res) => {
                if(res.data.success){
                    this.isFollow = true;
                }
            })
        },
        follow(){
            let info = {}
            info.userId = Number(localStorage.getItem("userId"))
            info.followType = 1 // 1 代表关注的是用户 0 代表歌手
            info.typeId =   Number(this.$route.query.id) 
            this.$axios.post(`/Operation/follow`,info).then((res) => {
                if(res.data.success){
                    this.$message.success("关注成功");
                    this.isFollow = true;
                }
            })
        },
        cancelFollow(){
            let info = {}
            info.userId = Number(localStorage.getItem("userId"))
            info.followType = 1 // 1 代表关注的是用户 0 代表歌手
            info.typeId =   Number(this.$route.query.id) 
            this.$axios.post(`/Operation/cancelFollow`,info).then((res) => {
                if(res.data.success){
                    this.$message.success("取消关注成功");
                    this.isFollow = false;
                }
            })
        },
        getOtherInfo(userId){
            this.$axios.get(`/Operation/getOtherInfo?userId=`+userId).then((res) => {
                if(res.data.success){
                    this.otherInfo.shareNumber = res.data.shareNumber;
                    this.otherInfo.fansNumber = res.data.fansNumber;
                    this.otherInfo.followNumber = res.data.followNumber;
                }
            })
        },
        go2PlayListItem(id){    
            this.$router.push({
                path:'/playListItem',
                query:{
                    id:this.currentId,
                }
            })
        },
        go2fans(){
            this.$router.push({
                path:'/fansDetail',
                query:{
                    id:this.currentId,
                    number:this.otherInfo.fansNumber
                }
            })
        },
        go2follow(){
            this.$router.push({
                path:'/followDetail',
                query:{
                    id:this.currentId,
                    number:this.otherInfo.followNumber
                }
            })
        },
        go2share(){
            
        }
    }
}
</script>
<style scoped>
    .imgItem{
        float: left;
        width: 175px;
        height: 175px;
        border-radius: 50%;
        margin-top: 25px;
        margin-left: 20px;
    }
    .infoItem{
        width: 100%;
        padding-left: 215px;
        padding-top: 20px;
        padding-right: 20px;
        height: 230px;
    }
    .fansInfo{
        display: flex;
        justify-content: space-between;
        width: 190px;
        margin-left: 5px;
    }
    .info_item{
        text-align: center;
    }
    /* .info_item:hover .info_span{
        color: black;
        font-size: 14px;
        cursor: pointer;
    }
    .info_item:hover .info_span_1{
        color: black;
        font-size: 18px;
        cursor: pointer;
    } */
    .info_span{
        color:black;
        font-size: 14px;
        cursor: pointer;
    }
    .info_span_1{
        color: black;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
    }
    .el-divider--horizontal{
        margin: 10px 0;
    }
    .userName{
        display: inline-block;
        padding-top: 13px;
        font-size: 22px;
        font-weight: bold;
    }
    .el-button.is-round{
        float: right;
    }
    .fansInfo .el-divider{
        height: 35px;
    }
    .item_span{
        line-height: 25px;
    }
    .collectList{
        margin: 0px 25px;
    }
    .collectSpan{
        font-size: 22px;
        font-weight: bolder;
        cursor:default;
    }
    .collect_playlist{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-bottom: 20px;
        margin-top: 13px;
    }
    .collect_playlist_item{
        width: 23%;
        max-width: 190px;
        margin-bottom: 20px;
        margin-right: 15px;
        cursor: pointer;
    }
    .item_img{
        border-radius: 8px;
    }
    .item_span_1{
        font-size: 14px;
        max-height: 43px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
        line-height: 23px;
    }
</style>