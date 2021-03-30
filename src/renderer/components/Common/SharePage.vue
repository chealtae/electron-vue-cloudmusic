<template>
    <div class="sharePage">
        <div class="share_title">
            <span class="share_title_span" >动态</span>
            <el-button type="primary" round icon="el-icon-plus" size="mini">写动态</el-button>
        </div>
        <div v-for="item in shareContent" :key="item.id" class="share_content">
            <img :src="item.img" class="userImg">
            <div style=" margin-left: 50px;">
                <span class="userName_span" @click="pushToUser">{{item.userName}}</span>
                <span class="share_span">发布动态</span>
                <span class="shareTime">{{item.shareDate}}</span>
                <div>
                    <span class="share_span_1">{{item.shareContent}}</span>
                    <div style="max-width:394px; max-height:393px">
                        <div>
                            <el-image v-for="imgItem in item.shareImg" :key="imgItem.url"
                                style="width: 125px; height: 125px"
                                :src="imgItem.url"
                                :preview-src-list="srcList"
                                :fit="fit"
                                ></el-image>
                        </div>
                    </div>
                </div>
                <div class="shareSing">
                    <img :src="item.singImg" class="shareSingImg">
                    <span class="shareSing_span">{{item.singName}}</span>
                    <span class="shareSing_span_1">{{item.singers}}</span>
                </div>
                <div style="float:right;margin-top: 5px">
                    <img class="good_icon" src="../../assets/img/good.svg" alt="">
                    <span style="cursor: pointer; font-size:14px">({{item.likeNumber}})</span>
                    <el-divider direction="vertical"></el-divider>
                    <i class="el-icon-chat-line-round" @click="showComment(item)">({{item.commentNumber}})</i>
                    <el-divider direction="vertical"></el-divider>
                    <i class="el-icon-share">({{item.shareNumber}})</i>
                </div>
                
            </div>
            <el-divider></el-divider>
            <div v-if="item.showComment">
                <comment :commentId="item.id"></comment>
            </div>
        </div>
    </div>
</template>
<script>
import Comment from './Comment.vue'
export default {
    components:{
        Comment

    },
    data() {
        return {
            shareContent:[{
                id:1,
                userId:1,
                img:require("@/assets/img/img1.jpg"),
                userName:'爱因斯飞毯',
                shareDate:'3月4日14:00',
                shareContent:"来之不易 才最珍惜",
                shareImg:[{url:require("@/assets/img/img1.jpg")},{url:require("@/assets/img/banner1.jpg")}],
                likeNumber:999,
                commentNumber:999,
                shareNumber:12,
                singImg:require("@/assets/img/img1.jpg"),
                singName:'下一段旅程',
                singers:'杨和苏KeyNG/张杰',
                showComment:false //后面获取数据后再加入
            }],
            srcList: [
            'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
            '../../assets/img/img1.jpg'
            ],
            fit:'cover'
        }

    },
    methods:{
        pushToUser() {
            //this.$router.push()
        },
        showComment(item) {
            item.showComment = !item.showComment
        }
    }
}
</script>
<style scoped>
    .sharePage{
        margin: 0 30px;
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
        width: 77%;
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
        margin-left: 50px;
    }
</style>