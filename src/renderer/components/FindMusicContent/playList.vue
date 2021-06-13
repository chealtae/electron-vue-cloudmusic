<template>
    <div style="height:100%;overflow:auto">
        <div style="margin:0px auto;width:90%;max-width:1100px;overflow:hidden">
            <el-radio-group v-model="listtype" size="mini" @change="getList">
            <div style="overflow:hidden">
                <span class="type_span">
                    语种:
                </span>
                <el-radio-button  v-for="item in languageType" :key="item.id" :label="item.id">{{item.name}}</el-radio-button>
            </div>
            <div style="overflow:hidden">
                <span class="type_span">
                    风格:
                </span>
                <el-radio-button v-for="item in styleTyep" :key="item.id" :label="item.id">{{item.name}}</el-radio-button>
            </div>
            <div style="overflow:hidden">
                <span class="type_span">
                    场景:
                </span>
                <el-radio-button v-for="item in positionType" :key="item.id" :label="item.id">{{item.name}}</el-radio-button>
            </div>
            <div style="overflow:hidden">
                <span class="type_span">
                    情感:
                </span>
                <el-radio-button v-for="item in emotionType" :key="item.id" :label="item.id">{{item.name}}</el-radio-button>
            </div>
             </el-radio-group>
        </div>
        <div class="recommend_list">
            <div class="recommend_list_box">
                <span class="recommend_span" >歌单</span>
                </div>
            <div class="recommend_singerList">
                <div class="recommend_singerList_item" v-for="item in songList" :key="item.id" @click="go2list(item.id)">
                    <div class="item_img">
                        <img :src="item.image" alt="" style="width:100% ; border-radius:6px">
                    </div>
                    <div class="item_span">{{item.name}}</div>
                </div>
            </div>
        </div>
        <div style="width:210px;margin:10px auto">
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :current-page.sync="currentPage1"
                 @current-change="changeList"
                :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getImgSrc} from '../Common/getSrc'
export default {
    data() {
        return {
            listtype:1,
            tags:[],
            languageType:[],
            styleTyep:[],
            positionType:[],
            emotionType:[],
            pageSize:20,
            currentPage1:1,
            songList:[],
            count:0,
        }
    },
    mounted(){
        this.getListTag()
        this.getList()
        // this.getListCount()
    },
    methods:{
        getList(){
            this.currentPage1 = 1;
            let info = {
                tagId:this.listtype,
                size:this.pageSize,
                offset:this.pageSize * (this.currentPage1-1)
            }
            this.$axios.post(`/SongListInfo/getListByTag`,info).then(res => {
                if(res.data.success){
                    this.songList = res.data.songList
                    this.songList.forEach(item => {
                        item.image = getImgSrc(item.image)
                    })
                    this.count = res.data.count;
                    // console.log('xxxxx',this.songList)
                }
            })
        },
        getListTag(){
            this.$axios.get(`Tag/getListTag`).then((res) => {
                if(res.data.success){
                    this.tags = res.data.tags;
                    this.tags.forEach(item => {
                        if(item.parent_type === 0) {
                            this.languageType.push(item)
                        } else if (item.parent_type === 1){
                            this.styleTyep.push(item)
                        } else if (item.parent_type === 2){
                            this.positionType.push(item)
                        } else if (item.parent_type === 3){
                            this.emotionType.push(item)
                        }
                    })
                }
            })
        },
        changeList(){
            let info = {
                tagId:this.listtype,
                size:this.pageSize,
                offset:this.pageSize * (this.currentPage1-1)
            }
            this.$axios.post(`/SongListInfo/getListByTag`,info).then(res => {
                if(res.data.success){
                    this.songList = res.data.songList
                    this.songList.forEach(item => {
                        item.image = getImgSrc(item.image)
                    })
                }
            })
        },
        go2list(id){
            this.$router.push({
                path:'/playlistItem',
                query:{
                    id:id,
                }
            })
        }
    }
}
</script>
<style  scoped>
    .type_span{
        float: left;
        font-size: 14px;
        line-height: 30px;
        margin-right: 10px;
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
    .recommend_singerList{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 20px;
        margin-top: 13px;
    }
    .recommend_singerList_item{
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