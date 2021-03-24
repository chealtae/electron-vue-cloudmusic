<template>
    <div style="margin:0px 35px">
        
        <div class="comment_input">
            <el-input style="width:100%"
                type="textarea"
                :rows="2"
                placeholder="发表评论"
                prefix-icon="el-icon-search"
                maxlength="130"
                show-word-limit
                v-model="textarea">
            </el-input>
        </div>
        <div class="comment_button">
            <el-button style="float:right;margin-top:5px" size="mini" round>评论</el-button>
        </div>
        <div class="comment">
            <span>精彩评论</span>
            <div class="topComment" v-for="item in commentItem" :key="item.userId">
                    <img :src="item.img" alt="" class="author_img">
                <div class="comment_content">
                    <span class="comment_span">{{item.authorName}}</span>
                    <span class="comment_span">{{item.commentContent}}</span>
                    <div style="background-color:rgba(173, 173, 173, 0.37);;">
                        <span class="comment_span">@{{item.authorName}}</span>
                        <span class="comment_span">{{item.commentContent}}</span>
                    </div>
                    <div  class="operation_line" style="margin-top:5px">
                        <span  class="comment_span_1">{{item.commentData}}</span>
                        <div  style="float:right">
                            <span class="report_span" v-if="mineId !== item.userId">举报</span>
                            <i class="el-icon-delete" v-else></i>
                            <el-divider direction="vertical"></el-divider>
                            <img class="good_icon" src="../../assets/img/good.svg" alt="">
                            <span style="cursor: pointer font-size:14px">{{item.likeNumber}}</span>
                            <el-divider direction="vertical"></el-divider>
                            <i class="el-icon-chat-line-round"></i>
                            <el-divider direction="vertical"></el-divider>
                            <i class="el-icon-share"></i>
                        </div> 
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            textarea:'',
            mineId:1,
            commentItem:[{
                userId:1,
                img:require("@/assets/img/img1.jpg"),
                authorName:'爱因斯飞毯',
                commentContent:'20年前，我们一起降临到这个世界上，14年前，为了不让她受伤，大冬天被邻居家的大狗托在地上几十米，5年前，每天傻傻的看着她发呆，3年前，隔着电话吐槽她，2年前，视频里她对我说加拿大好危险，我对她说武汉下雨我腿好痛，她说还记得我那时候为了她受的伤，1年前，她对我说要结婚了。',
                commentData:'2016年4月1日',
                commentId:1,
                likeNumber:7766
            }],
            commentNumber:7770
        }
    }
}
</script>
<style scoped>
    .author_img{
        height: 30px;
        width: 30px;
        border-radius: 50%;
        float: left;
    }
    .comment_button{
        height: 40px;
    }

    .comment_content{
        margin-left: 40px;
    }
    .comment_span{
        font-size: 12px;
    }
    .comment_span_1{
        font-size: 12px;
        color:rgba(115, 115, 115, 0.74);
    }
    .el-icon-chat-line-round{
        font-size: 14px;
        cursor: pointer;
    }
    .el-icon-share{
        font-size: 14px;
        cursor: pointer;
    }
    .el-icon-delete{
        font-size: 14px;
        cursor: pointer;
    }
    .good_icon{
        cursor: pointer;
    }
    .operation_line .report_span{
        display: none;
        font-size: 14px;
        cursor: pointer;
    }
    .operation_line:hover .report_span{
        display: inline;
    }

</style>