<template>
    <div>
        <div>
            <div class="sub_menu">
                <div :class="albumStatus ? 'submenu_item_click':'submenu_item'" @click="playListClick">
                    <span :class="albumStatus ? 'submenu_span_click':'submenu_span'">专辑</span>
                    <div :class="albumStatus ? 'menuLine':''"></div>
                </div>
                <div :class="singerStatus ? 'submenu_item_click':'submenu_item'" @click="commentClick">
                    <span :class="singerStatus ? 'submenu_span_click':'submenu_span'">歌手</span>
                    <div :class="singerStatus ? 'menuLine':''"></div>
                </div>
            </div>
            <div style="width:90%;margin:0px auto">
                <div v-if="albumStatus">
                    <div class="singerItem" v-for="item in albumList" :key="item.id" @click="go2Album(item.id)">
                        <img :src="item.image" alt="" class="imgItem">
                        <span class="userName">{{item.name}}</span>
                    </div> 
                </div>
                <div v-else>
                    <div class="singerItem" v-for="item in singerList" :key="item.id" @click="go2Singer(item.id)">
                        <img :src="item.image" alt="" class="imgItem">
                        <span class="userName">{{item.name}}</span>
                    </div> 
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import { getImgSrc } from '../Common/getSrc';
export default {
    data(){
        return {
            albumStatus:true,
            singerStatus:false,
            albumList:[],
            singerList:[],
            userId:Number(localStorage.getItem('userId'))
        }
    },
    mounted(){
        this.getSingerList();
        this.getAlbumList();
    },
    methods:{
        commentClick(){
            this.singerStatus = true;
            this.albumStatus = false;
        },
        playListClick(){
            this.singerStatus = false;
            this.albumStatus = true;
        },
        getAlbumList(){
            this.$axios.get(`/Album/getCollectAlbum?userId=`+this.userId).then(res=> {
                if(res.data.success){
                    this.albumList = res.data.albumList;
                    this.albumList.forEach(item => {
                        item.image = getImgSrc(item.image)
                    })
                }
            })
        },
        getSingerList(){
            this.$axios.get(`/Singer/getCollectSinger?userId=`+this.userId).then(res=> {
                if(res.data.success){
                    this.singerList = res.data.singerList;
                    this.singerList.forEach(item => {
                        item.image = getImgSrc(item.image)
                    })
                    
                }
            })
        },
        go2Singer(id){
            this.$router.push({
                path:'/singerInfo',
                query:{
                    id:id
                }
            })
        },
        go2Album(id){
            this.$router.push({
                path:'/albumListItem',
                query:{
                    id:id
                }
            })
        }
    }
}
</script>
<style  scoped>
     .submenu_item_click{
        height: 60px;
        cursor: pointer;
        
    }
    .submenu_span{
        display: block;
        margin-top: 24px;
        font-size: 17px;
    }
    .submenu_span_click{
        display: block;
        margin-top: 22px;
        font-size: 21px;
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
    .singerItem{
        height: 75px;
        text-align: left;
        cursor: pointer;
    }
    .imgItem{
        margin-top: 5px;
        margin-left: 5px;
        width: 65px;
        height: 65px;
        border-radius: 5px;
        float: left;
        object-fit: cover
        
    }
    .userName{
        font-size: 14px;
        line-height: 75px;
        margin-left: 12px;
        
    }
</style>