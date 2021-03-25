<template>
    <div>
        <div class="share_title">
            <span>动态</span>
            <el-button type="primary" round icon="el-icon-plus" size="mini">写动态</el-button>
        </div>
        <div v-for="item in shareContent" :key="item.id">
            <img :src="item.img" class="userImg">
            <div>
                <span>{{item.userName}}</span>
                <span>发布动态</span>
                <span class="shareTime">{{item.shareDate}}</span>
                <div>
                    <span>{{item.shareContent}}</span>
                    <div>
                        <el-image v-for="imgItem in item.shareImg" :key="imgItem.url"
                            style="width: 100px; height: 100px"
                            :src="imgItem.url"
                            :fit="fit"></el-image>
                    </div>
                </div>
                <div  style="float:right">
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
</template>
<script>
export default {
    data() {
        return {
            shareContent:[{
                id:1,
                userId:1,
                img:require("@/assets/img/img1.jpg"),
                userName:'爱因斯飞毯',
                shareDate:'3月4日14:00',
                shareContent:"来之不易 才最珍惜",
                shareImg:[{url:require("@/assets/img/img1.jpg")},{url:require("@/assets/img/img1.jpg")}]
            }]
        }
    }
}
</script>
<style scoped>

</style>