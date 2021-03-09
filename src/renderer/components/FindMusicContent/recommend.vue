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
               <span class="recommend_span">推荐歌单</span>
            </div>
           <div class="recommend_playlist">
               <div class="recommend_playlist_item" v-for="item in playlist" :key="item.id">
                   <div class="item_img">
                       <img :src="item.url" alt="" style="width:100% ; height:100%; border-radius:6px">
                   </div>
                   <div class="item_span">{{item.title}}</div>
               </div>
           </div>
           <div class="recommend_playlist">
               <div class="recommend_playlist_item" v-for="item in playlist" :key="item.id">
                   <div class="item_img">
                       <img :src="item.url" alt="" style="width:100% ; height:100% ;border-radius:6px">
                   </div>
                   <div class="item_span">{{item.title}}</div>
               </div>
           </div>
        </div>
    </div>
    
</template>
<script>
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
            playlist:[
                {
                    id:1,
                    url:require("@/assets/img/img1.jpg"),
                    title:'[华语私人订制] 最懂你的华语推荐 每日更新35首'
                },
                {
                    id:2,
                    url:require("@/assets/img/img1.jpg"),
                    title:'神仙翻唱:每首都是神仙级的Cover'
                },
                {
                    id:3,
                    url:require("@/assets/img/img1.jpg"),
                    title:'神仙翻唱:每首都是神仙级的Cover'
                },
                {
                    id:4,
                    url:require("@/assets/img/img1.jpg"),
                    title:'神仙翻唱:每首都是神仙级的Cover'
                },
                {
                    id:5,
                    url:require("@/assets/img/img1.jpg"),
                    title:'神仙翻唱:每首都是神仙级的Cover'
                },
            ]
        }
    }
}
</script>
<style >
    .recommend_main{
        height: 89%;
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
        justify-content: space-between;
        margin-bottom: 20px;
        margin-top: 13px;
    }
    .recommend_playlist_item{
        width: 18%;
    }
    .item_img{
        border-radius: 8px;
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