<template>
    <div class="mian_content">
        <div class='introduce_header'>
            <div class="introduce_img">
                <img :src="singerDeatils.image" alt="" style="height:100%; width:100%; object-fit: cover">
            </div>
            <div class="introduce_content">
                <div class="title">
                    <div class="singerName">
                        <span class="singerName_span">
                            {{singerDeatils.name}}
                        </span>
                    </div>
                </div>
                <div class="opreation">
                    <el-row>
                        <el-button v-if="isCollect"  size="small" round icon="l-icon-folder-checked" @click="cancelCollect">已收藏</el-button>
                        <el-button v-else round size="small" icon="el-icon-folder-add"  @click="collect">收藏</el-button>
                    </el-row>
                </div>
                
                <div class="playtimes">
                    <span>单曲数:  &nbsp&nbsp&nbsp 专辑数:{{albumList.length}}</span>
                </div>

            </div>
        </div>
        <div>
            <div class="sub_menu">
                <div :class="playListStatus ? 'submenu_item_click':'submenu_item'" @click="playListClick">
                    <span :class="playListStatus ? 'submenu_span_click':'submenu_span'">专辑</span>
                    <div :class="playListStatus ? 'menuLine':''"></div>
                </div>
                <div :class="introduction ? 'submenu_item_click':'submenu_item'" @click="commentClick">
                    <span :class="introduction ? 'submenu_span_click':'submenu_span'">歌手简介 </span>
                    <div :class="introduction ? 'menuLine':''"></div>
                </div>
            </div>
        </div>
        <div v-show="playListStatus === true" style="width:100%"> 
            <div style="text-align:center" v-if="albumList.length === 0">
                <span>暂无专辑</span>
            </div>
            <div class="collectList" v-else>
                <span class="collectSpan">{{singerDeatils.name}}的专辑</span>
                <div class="collect_playlist">
                <div class="collect_playlist_item" v-for="item in albumList" :key="item.id">
                    <div class="item_img">
                        <img :src="item.image" alt="" style="width:100% ; height:100%; border-radius:6px">
                    </div>
                    <div class="item_span_1">{{item.name}}</div>
                </div>
            </div>
            </div>
        </div>
        <div v-if ="introduction === true" class="introduction">
            <span>
                {{singerDeatils.introduction}}
            </span>
        </div>
        
    </div>
</template>
<script>
import Comment from '../Common/Comment.vue';
import Bus from '../Common/bus'
import {getImgSrc} from '../Common/getSrc'
export default {
    components:{
        Comment,
    },
    data() {
        return {
            introduction:false,
            playListStatus:true,
            singerDeatils:{
                url:require("@/assets/img/img1.jpg"),
                type:'歌单',
                name:'「欧美」 慵懒的嗓音在你耳边问你现在睡吗',
                author: '周末回家睡懒觉',
                createdTime: '2017-07-13',
                singNumber:72,
                introduce: '',
                collectTime:44,
                shareTime:55,
                label:[{name:'欧美'},{name:'夜晚'}]
            },
            albumList:[],
            activeName: 'first',
            isCollect:false,
            albumId:'',
        }
    },
    mounted(){
        if(this.$route.query.id){
            this.albumId = this.$route.query.id
            this.getSingerInfo(this.$route.query.id);
        }
        this.judgeCollect()
    },
    methods: {
       commentClick(){
            this.introduction = true;
            this.playListStatus = false;
        },
        playListClick(){
            this.introduction = false;
            this.playListStatus = true;
        },    
        getSingerInfo(id){
            this.$axios.get(`/Singer/getAllInfo?id=`+id).then(res => {
                if(res.data.success){
                    console.log(res.data)
                    this.singerDeatils = res.data.singerInfo;
                    this.singerDeatils.image = getImgSrc(res.data.singerInfo.image)
                    this.albumList = res.data.albumRes;
                    this.albumList.map(item => {
                        item.image = getImgSrc(item.image)
                    })
                }
            })
        },
        judgeCollect(){
            let info = {
                userId :Number(localStorage.getItem("userId")),
                typeId :Number(this.albumId),
                collectType : 1,
            }
            this.$axios.post(`/Operation/judgeCollect`,info).then((res) => {
                if(res.data.success){
                    this.isCollect = true;  //后端查到数据库结果表示收藏
                }
            })
        },
        collect(){
            let info = {
                userId :Number(localStorage.getItem("userId")),
                typeId :Number(this.albumId),
                collectType : 1,
            }
            this.$axios.post(`/Operation/collect`,info).then((res) => {
                if(res.data.success){
                    this.$message.success("收藏成功")
                    this.isCollect = true;     
                }
            })

           
        },
        cancelCollect(){
            let info ={
                userId:Number(localStorage.getItem('userId')),
                typeId:Number(this.albumId),
                collectType : 1,
            }
            this.$axios.post(`Operation/cancelCollect`,info).then((res) => {
                if(res.data.success){
                    this.$message.success("取消收藏成功")
                    this.isCollect = false;
                }
            })
        },
    }
}
</script>
<style scoped>
    .mian_content{
        display: flex;
        flex-direction: column;
        min-width: 780px;
        height: 100%;
        overflow: auto;
    }
    .introduce_header{
        height: 180px;
        margin-top: 30px;
        margin-left: 30px;
    }
    .introduce_header:after{
        
    }
    .introduce_img{
        width: 180px;
        height: 180px;
        float: left;
    }
    .introduce_content{
        float: left;
        width: 550px;
        height: 180px;
        padding-top: 1px;
        margin-left: 15px;
    }
    .deatil_type{
        border: cornflowerblue 1px solid;
        height: 20px;
        width: 37px;
        margin-top: 2px;
        float: left;
        margin-left: 2px;
        
    }
    .type_span{
        font-size: 14px;
        padding-left: 4px;
    }
    .singerName{
        margin-left: 5px;

    }
    .singerName_span{
        font-size: 22px;
        font-weight: bold;
    }
    .author_img{
        border-radius: 50%;
        height: 20px;
        width: 20px;
        float: left;
    }
    .author_span{
        color: cornflowerblue;
        cursor: pointer;
        line-height: 21px;
    }
    .createTime_span{

    }
    .introduction_content{
        max-height: 500px;
    }
    .label{
        overflow: hidden;
    }
    .el-icon-star-on{
        font-size: 18px;
        color: red;
        cursor: pointer;
    }
    .el-icon-star-off{
        font-size: 18px;
        cursor: pointer;
    }
    .icon01.el-icon-download{
        font-size: 18px;
        cursor: pointer;
    }
     .submenu_item_click{
        height: 60px;
        cursor: pointer;
    }
    .submenu_span{
        display: block;
        margin-top: 24px;
        font-size: 14px;
    }
    .submenu_span_click{
        display: block;
        margin-top: 22px;
        font-size: 14px;
        font-weight: bold;
    }
    .submenu_item{
        height: 60px;
        cursor: pointer;
    }
    .menuLine{
        height: 2px;
        width: 76%;
        background-color: rgba(133, 202, 211, 0.616);
        margin: 0 auto;
        border-radius: 5px;
    }
    .sub_menu{
        display: flex;
        justify-content: space-around;
        width: 120px;
        margin-left: 30px;
    }
    .menu3 {
        
        width:120px;
        position: fixed;
        border-radius: 3px;
        background-color: #f4f4f4;
        z-index: 20;
        text-align: left;
        box-shadow: 1px 2px 6px 0px #c1baba;
    }

    .menu3 li:hover {
        background-color: #1790ff;
        color: white;
        cursor: pointer;
    }
    .menu3 li{font-size:15px;
    list-style: none}
    .opreation{
        margin-top: 10px;
    }
    .playtimes{
        line-height: 40px;
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
        justify-content: space-between;
        margin-bottom: 20px;
        margin-top: 13px;
    }
    .collect_playlist_item{
        width: 23%;
        margin-bottom: 20px;
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
    .introduction{
        margin: 10px 30px;
    }
</style>