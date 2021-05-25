<template>
    <div class="sharePage">
        <div class="share_title">
            <span class="share_title_span" >动态</span>
            <el-button type="primary" round icon="el-icon-plus" size="mini" @click="writeShare">写动态</el-button>
        </div>
        <div v-infinite-scroll="load">
            <div v-for="item in shareContent" :key="item.id" class="share_content">
                <img :src="item.userimage" class="userImg">
                <div style=" margin-left: 50px;">
                    <span class="userName_span" @click="pushToUser">{{item.nickName}}</span>
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
                        <img class="good_icon" src="../../assets/img/good.svg" alt="">
                        <span style="cursor: pointer; font-size:14px"></span>
                        <el-divider direction="vertical"></el-divider>
                        <i class="el-icon-chat-line-round" @click="showComment(item)"></i>
                        <el-divider direction="vertical"></el-divider>
                        <i class="el-icon-share"></i>
                    </div>
                    
                </div>
                <el-divider></el-divider>
                <div v-if="item.showComment" >
                    <comment :commentInfo="item.id"></comment>
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