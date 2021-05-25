<template>
    <div class="recommend_main">
        <div class="carousel_map">
            <template>
                <el-carousel :interval="4000" type="card" height="170px">
                    <el-carousel-item v-for="item in img" :key="item.id">
                        <img :src="item.url" alt="无图片" style="width:100% ; height:100%">
                    </el-carousel-item>
                </el-carousel>
            </template>
        </div>
        <div class="recommend_list">
           <div class="recommend_list_box">
               <span class="recommend_span" @click="linkToRecommend">推荐歌单</span>
            </div>
           <div class="recommend_playlist">
               <div class="recommend_playlist_item" v-for="item in playList" :key="item.id" @click="showList(item.id)">
                   <div class="item_img">
                       <img :src="item.image" alt="" style="width:100% ; border-radius:6px">
                   </div>
                   <div class="item_span">{{item.name}}</div>
               </div>
           </div>
        </div>
    </div>
    
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {getImgSrc} from './../Common/getSrc'
export default {
    data() {
        return {
            img:[
                {
                    url:require("@/assets/img/banner1.jpg"),
                    id:1
                },
                {
                    url:require("@/assets/img/banner2.jpg"),
                    id:2
                },
                {
                    url:require("@/assets/img/banner3.jpg"),
                    id:3
                },
                {
                    url:require("@/assets/img/banner4.jpg"),
                    id:4
                },
                {
                    url:require("@/assets/img/banner5.jpg"),
                    id:5
                },
                {
                    url:require("@/assets/img/banner6.jpg"),
                    id:6
                }
            ],
            playList:[],   
        }
    },
    methods: {
        ...mapActions(['setActived']),
        linkToRecommend() {
            this.$router.push('/playList')
            this.setActived('playList')
        },
        getRecommend(){
            this.$axios.get(`/SongListInfo/getRecommendList`).then((res) => {
                if(res.data.success){
                    this.playList = res.data.songList
                   
                    this.playList.map((item) => {
                        item.image = getImgSrc(item.image)
                        return item
                    })
                }
            })
        },
        showList(id){
            this.$router.push({
                path:"/playlistItem",
                query:{
                    id:id
                }

            })
        }
    },
    mounted(){
        this.getRecommend();
    }
}
</script>
<style scoped>
    .recommend_main{
        height: 100%;
        overflow: scroll;
    }
    .carousel_map{
        width: 90%;
        margin: auto;
        max-width: 1100px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
        widows: 400px;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
        widows: 400px;
    }

    .recommend_span {
        font-size: 22px;
        font-weight: bolder;
        cursor:pointer;
    }

    .recommend_list_box{
        margin-top: 20px;
    }
    .recommend_list{
        margin: 0px auto;
        width: 90%;
        max-width:1100px;
    }
    .recommend_playlist{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 20px;
        margin-top: 13px;
    }
    .recommend_playlist_item{
        width: 18%;
        cursor: pointer;
        margin-bottom: 10px;
    }
    .item_img{
        border-radius: 8px;
        height: 0px;
        width: 100%;
        padding-bottom: 100%;
        position: relative;
        overflow: hidden;
    }
    .item_span{
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