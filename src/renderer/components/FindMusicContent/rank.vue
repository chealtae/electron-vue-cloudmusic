<template>
    <div style="height:100%;overflow:auto">
        <div style="width:90%;max-width:1100px;margin:0px auto;overflow:hidden">
            <span class="rank_span">
                榜单
            </span>
            <div class="rank_item" >
                <img src="../../assets/img/rank1.jpg" class="img_item">
                <div style="width: 73%;" class="songList">
                    <div v-for="item in HotList" :key="item.id" @dblclick="playSong(item.id)">
                        <span class="name_span">{{item.name}}</span>
                        <span class="singer_span">{{item.singer}}</span>
                    </div>
                </div>
            </div>
            <div class="rank_item">
                <img src="../../assets/img/rank2.jpg" class="img_item">
                <div style="width: 73%;" class="songList">
                    <div v-for="item in NewList" :key="item.id" @dblclick="playSong(item.id)">
                        <span class="name_span">{{item.name}}</span>
                        <span class="singer_span">{{item.singer}}</span>
                    </div>
                </div>
            </div>
            <div class="rank_item">
                <img src="../../assets/img/rank3.jpg" class="img_item">
                <div style="width: 73%;" class="songList">
                    <div v-for="item in HotList" :key="item.id" @dblclick="playSong(item.id)">
                        <span class="name_span">{{item.name}}</span>
                        <span class="singer_span">{{item.singer}}</span>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import Bus from '../Common/bus'
export default {
    data() {
        return {
            NewList:[],
            HotList:[],
        }
    },
    mounted(){
        /* 
            todo 毕设 排行榜半送功能 由于时间原因，后端没有时间添加 日期和播放量关系的时间表 
            导致接口写的就是有问题 。后端这里的接口都是需要重新设计的
        
        */
        this.getNewList();
        this.getHotList()
    },
    methods:{
        getNewList(){
            this.$axios.get(`/SongInfo/getNewRank`).then(res => {
                if(res.data.success){
                    this.NewList = res.data.NewList;
                }
            })
        },
        getHotList(){
            this.$axios.get(`/SongInfo/getHotRank`).then(res => {
                if(res.data.success){
                    this.HotList = res.data.HotList;
                }
            })
        },
        playSong(id){
            Bus.$emit('playFromList',id)//传递歌曲id
            //这里不需要加入播放列表
        }
    }
}
</script>
<style  scoped>
    .rank_span{
        font-size: 22px;
        font-weight: bold;
        line-height: 30px;
    }
    .img_item{
        width:175px;
        height: 175px;
    }
    .rank_item{
        margin-top: 10px;
        margin-bottom: 40px;
        display: flex;
        justify-content: space-between;
    }
    .singer_span{
        float: right;
        font-size: 14px;
        line-height: 35px;
        padding-right: 20px;
        
    }
    .name_span{
        font-size: 14px;
        line-height: 35px;
        padding-left: 20px;
        /* background-color: white; */
    }
    .songList > :nth-child(2n-1){
        background-color:rgba(183, 179, 173, 0.23) ;
    }
</style>