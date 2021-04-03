<template>
    <div class="sider">
        <div class="siderHeader"  v-for="item in userInfo" :key="item.id">
            <img :src="item.userImg" alt="" class="userImg">
            <span class="name_span">{{item.userName}}</span>
            <div class="userInfomatioin">
                <div class="info_item">
                    <span class="info_span">{{item.shareItemNumber}}</span><br>
                    <span class="info_span">动态</span>
                </div>
                <div class="info_item">
                    <span class="info_span">{{item.followNmuber}}</span><br>
                    <span class="info_span">关注</span>
                </div>
                <div class="info_item">
                    <span class="info_span">{{item.fansNumber}}</span><br>
                    <span class="info_span">粉丝</span>
                </div>
            </div>
        </div>
        <div class="recom_title">
            <span class="recom_title_span">猜你会关注</span>
            <div v-for="recomItem in recommendUser" :key="recomItem.id" style="margin-bottom:5px">
                <img :src="recomItem.userImg" alt="" class="recomUserImg">
                <span class="recomUser_span">{{recomItem.userName}}</span><br>
                <span class="recomUser_span_1">共有{{recomItem.fansNumber}}人关注</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            userInfo:[{id:1,userImg:require("@/assets/img/img1.jpg"),userName:'简单生活c',shareItemNumber:0,followNmuber:9,fansNumber:10}],
            recommendUser:[{id:1,userImg:require("@/assets/img/img1.jpg"),userName:'简单生活c',fansNumber:188}]
        }
    }
}
</script>
<style scoped>
    .sider{
        
        border-left: rgba(64, 60, 60, 0.16) 1px solid;
    }
    .siderHeader{
        padding:25px 20px;
        background-color: rgba(208, 208, 208, 0.29);
    }
    .userImg{
        height: 50px;
        width: 50px;
        border-radius: 50%;
        float: left;
    }
    .userInfomatioin{
        display: flex;
        justify-content: space-around;
        width: 190px;
        margin-top: 45px;
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
    .name_span{
        font-size: 14px;
        margin-left: 10px;
        line-height: 16px;
    }
    .recom_title{
        padding-left: 20px;
    }
    .recom_title_span{
        font-size: 12px;
        font-weight: bold;
        line-height: 40px;
    }
    .recomUserImg{
        height: 40px;
        width: 40px;
        float: left;
        border-radius: 3px;
    }
    .recomUser_span{
        font-size: 12px;
        margin-left: 5px;
        line-height: 20px;
    }
    .recomUser_span_1{
        font-size: 12px;
        margin-left: 5px;
        line-height: 20px;
        color: gray;
    }
</style>