<template>
    <div>
        <div class="comment_title">
            <span>评论</span>
            <span>已有{{}}条评论</span>
        </div>
        <div class="comment_input">
            <el-input style="width:80%"
                type="textarea"
                :rows="2"
                placeholder="发表评论"
                prefix-icon="el-icon-search"
                maxlength="130"
                show-word-limit
                v-model="textarea">
            </el-input>
        </div>
        <div>
            <span>精彩评论</span>
            <div class="topComment" v-for="item in commentItem" :key="item.userId">
                    <img :src="item.img" alt="" class="author_img">
                <div>
                    <span>{{item.authorName}}</span>
                    <span>{{item.commentContent}}</span>
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
            commentItem:[{
                userId:1,
                img:require("@/assets/img/img1.jpg"),
                authorName:'爱因斯飞毯',
                commentContent:'20年前，我们一起降临到这个世界上，14年前，为了不让她受伤，大冬天被邻居家的大狗托在地上几十米，5年前，每天傻傻的看着她发呆，3年前，隔着电话吐槽她，2年前，视频里她对我说加拿大好危险，我对她说武汉下雨我腿好痛，她说还记得我那时候为了她受的伤，1年前，她对我说要结婚了。',
                commentData:'2016年4月1日',
                commentId:1,
                likeNumber:7766
            }]
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
</style>