<template>
    <div class="sharePage">
        <div class="share_title">
            <span class="share_title_span" >动态</span>
            <el-button type="primary" round icon="el-icon-plus" size="mini" @click="writeShare">写动态</el-button>
        </div>
        <div v-infinite-scroll="load">
            <div v-for="(item,index) in shareContent" :key="index" class="share_content">
                <img :src="item.userimage" class="userImg" @click="go2UserInfo(item.userid)">
                <div style=" margin-left: 50px;">
                    <span class="userName_span" @click="go2UserInfo(item.userid)">{{item.nickName}}</span>
                    <span class="share_span">发布动态</span>
                    <span class="shareTime">{{item.createtime}}</span>
                    <div>
                        <span class="share_span_1">{{item.content}}</span>
                        <div style="max-width:394px; max-height:393px">
                            <div>
                                <el-image v-for="imgItem in item.shareimage" :key="imgItem.id"
                                    style="width: 125px; height: 125px"
                                    :src="imgItem.image"
                                    :preview-src-list="[imgItem.image]"
                                    :fit="fit"
                                    ></el-image>
                            </div>
                        </div>
                    </div>
                    <div class="shareSing" v-if="item.musicid !== 0" @dblclick="playSong(item.musicid)">
                        <img :src="item.songimage" class="shareSingImg">
                        <span class="shareSing_span">{{item.musicname}}</span>
                        <span class="shareSing_span_1">{{item.singer}}</span>
                    </div>
                    <div style="float:right;margin-top: 5px">
                        <i class="el-icon-delete" v-if="userId == item.userid" @click="deleteShare(item.id)"></i>
                        <el-divider v-if="userId == item.userid" direction="vertical"></el-divider>
                        <img v-if="!item.isLike" class="good_icon" src="../../assets/img/good.svg" alt="" @click="like(item)">
                        <img v-else class="good_icon" src="../../assets/img/good2.svg" alt="" @click="cancelLike(item)">
                        <span style="cursor: pointer; font-size:14px"></span>
                        <el-divider direction="vertical"></el-divider>
                        <i class="el-icon-chat-line-round" @click="showComment(item)"></i>
                        <el-divider direction="vertical"></el-divider>
                        <i class="el-icon-share"></i>
                    </div>
                    
                </div>
                <el-divider></el-divider>
                <div v-if="item.showComment" >
                    <comment :commentItemId="item.id" :commentType="3"></comment>
                </div>
            </div>
        </div>
        
        <el-dialog
        v-if="dialogVisible"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
            <upload @closeMessage="close"></upload>
        </el-dialog>

        
    </div>
</template>
<script>
import Comment from './Comment.vue'
import Upload from './upload.vue'
import Bus from '../Common/bus'
import {getImgSrc} from './getSrc'
export default {
    components:{
        Comment,
        Upload

    },
    data() {
        return {
            shareContent:[],
            dialogVisible: false,
            srcList: [
            
            ],
            fit:'cover',
            shareList:[],
            count:0,
            commentInfo:{type:3}, //0 歌曲  1专辑 2歌单 3动态 4排行
            userId:Number(localStorage.getItem("userId"))
        }

    },
    mounted(){
        this.getShare();
    },      
    methods:{
        pushToUser() {
            //this.$router.push()
        },
        showComment(item) {
            item.showComment = !item.showComment
            this.$forceUpdate(); //数据变更需要强制刷新
            console.log(item.showComment);
        },
        writeShare(){
            this.dialogVisible = true;
        },
        handleClose(done) {
            this.dialogVisible = false;
        },
        close(data){
            console.log(data)
            this.dialogVisible = false;
            this.shareContent = [];
            this.count = 0
            this.getShare();
        },
        getShare(){
            let info ={
                userId: Number(localStorage.getItem("userId")),
                offset:this.count
            }
            this.$axios.post(`/Share/getShare`,info).then(res => {
                if(res.data.success){
                    // this.shareContent = res.data.shareList;
                    this.shareList = res.data.shareList
                    this.shareList.map(item => {
                        item.userimage = getImgSrc(item.userimage)
                        item.showComment = false; // 获得数据时设置不显示评论
                        item.songimage = getImgSrc(item.songimage)
                        
                        item.shareimage.map(item1 => {
                            item1.image = getImgSrc(item1.image)
                            return item1
                        }) 
                        return item
                    })
                    this.shareList.forEach(item => {
                        this.shareContent.push(item)
                    })
                    console.log(this.shareContent)
                }
            })
        },
        playSong(id){
            
            localStorage.setItem('currentPlayId',id)
            Bus.$emit('playFromList',id)//传递歌曲id

        },
        load(){
            this.count += 10
            this.getShare();
        },
        go2UserInfo(id){
            this.$router.push({
                path:"/UserInfo",
                query:{
                    id:id,
                }
            })
        },
        like(item){
            let info = {
                userId:this.userId,
                typeId :item.id,
                collectType : 3
            }
            this.$axios.post(`/Operation/like`,info).then(res => {
                if(res.data.success){
                    item.isLike = !item.isLike;
                }
            })
        },
        cancelLike(item){
            let info = {
                userId:this.userId,
                typeId :item.id,
                collectType : 3
            }
            this.$axios.post(`/Operation/cancelLike`,info).then(res => {
                if(res.data.success){
                    item.isLike = !item.isLike;
                }
            })
        },
        deleteShare(id){
            this.$axios.get(`/Share/deleteShare?id=`+id).then((res) => {
                if(res.data.success){
                    this.$message.success('删除成功');
                    this.count = 0;
                    this.shareContent = [];
                    this.getShare();
                }
            })
        }

    }
}
</script>
<style scoped>
    .sharePage{
        margin: 0 30px;
        width: 100%;
        position: relative;
    }
    .userImg{
        height: 40px;
        width: 40px;
        border-radius: 50%;
        float: left;
    }
    .share_title_span{
        font-size: 20px;
        font-weight: bold;
    }
    .share_title .el-button{
        float: right;
    }
    .share_title{
        position: absolute;
        padding-top: 20px;
        width: 100%;
        background: white;
    }
    .share_content{
        padding-top: 52px;
    }
    .el-image{
        border-radius: 7px;
        margin: 3px 6px 6px 0px;
    }
    .userName_span{
        color: rgb(73, 134, 212);
        cursor: pointer;
        font-size: 14px;
        
    }
    .share_span{
        font-size: 14px;
        margin-left: 6px;
    }
    .shareTime{
        display: block;
        font-size: 12px;
        color:rgba(115, 115, 115, 0.74);
        line-height: 34px;
    }
    .share_span_1{
        line-height: 33px;
    }
    .el-icon-share{
        font-size: 14px;
        cursor: pointer;
    }
    .el-icon-chat-line-round{
        font-size: 14px;
        cursor: pointer;
    }
    .good_icon{
        cursor: pointer;
    }
    .shareSing{
        height: 50px;
        background: rgba(173, 173, 173, 0.37);
    }
    .shareSingImg{
        padding-top: 5px;
        padding-left: 5px;
        border-radius: 3px;
        height: 45px;
        float: left;
    }
    .shareSing_span{
        font-size: 12px;
        line-height: 30px;
        margin-left: 10px;
    }
    .shareSing_span_1{
        display: block;
        font-size: 12px;
        margin-left: 55px;
    }
</style>