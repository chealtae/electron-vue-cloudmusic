<template>
    <div style="height:100%;overflow:auto">
        <span class="title_span">
            {{nickname}}的关注
        </span>
        <div v-if="followList.length === 0" >
            <div style="text-align:center"> 
                <span>暂无数据</span>
            </div>
        </div>
        <div class="content">
            <div class="user_item" v-for="item in followList" :key="item.id" @click="go2Details(item.id)">
                <img :src="item.image" alt="" class="user_img">
                <div>
                    <div class="name_item">
                        <span>{{item.nickname}}</span>
                    </div>
                    <div class="intro_item">
                        <span>{{item.introduction}}</span>
                    </div>
                </div>
                <!-- <div>
                    <el-button mini></el-button>
                </div> -->
                
                
            </div>
        </div>
        <div style="width:210px;margin:10px auto">
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="50"
                :current-page.sync="currentPage1"
                 @current-change="handleCurrentChange"
                :total="followNumber">
            </el-pagination>
        </div>
    </div>
    
</template>
<script>
import { getImgSrc } from '../Common/getSrc';
export default {
    data() {
        return {
            currentId:Number(this.$route.query.id),
            currentPage1: 1,
            nickname:'',
            followList:[],
            followNumber:Number(this.$route.query.id),
        }
    },
    mounted(){
        this.getFollow();
    },
    methods:{
        getFollow(){
            let info = {
                id:this.currentId,
                offset:(this.currentPage1-1)*10
            }
            this.$axios.post(`/User/getFollow`,info).then(res => {
                if(res.data.success){
                    this.nickname = res.data.baseInfo.nickname
                    this.followList = res.data.followList;
                    this.followList.forEach(item => {
                        item.image = getImgSrc(item.image);
                    })
                }
            })
        },
        handleCurrentChange(){
            this.getFollow();
        },
        go2Details(id){
            this.$router.push({
                path:'UserInfo',
                query:{
                    id:id
                }
            })
        }
    }
}
</script>
<style scoped>
    .title_span{
        font-size: 20px;
        font-weight: bold;
        margin-left: 20px;
        line-height: 60px;
    }
    .user_img{
        margin: 15px;
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
        margin-left: 15px;
    }
    .content{
        display: flex;
        justify-content: flex-start;
        width: 100%;
        flex-wrap: wrap;
    }
    .user_item{
        display: flex;
        width: 50%;
        max-width: 400px;
        margin-bottom: 20px;
        height: 150px;
    }
    .name_item{
        width: 130px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 40px;
        padding-left: 15px;
    }
    .intro_item{
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 60px;
        padding-left: 15px;
    }
    .user_item:hover {
        background: rgba(177, 176, 174, 0.39);
    }
</style>