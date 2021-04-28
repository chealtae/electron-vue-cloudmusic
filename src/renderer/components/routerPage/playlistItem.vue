<template>
    <div class="mian_content">
        <div class='introduce_header'>
            <div class="introduce_img">
                <img :src="playListDeatils.image" alt="" style="height:100%; width:100%">
            </div>
            <div class="introduce_content">
                <div class="title">
                    <div class="deatil_type">
                        <span class="type_span">
                            歌单
                        </span>
                    </div>
                    <div class="playListName">
                        <span class="playListName_span">
                            {{playListDeatils.name}}
                        </span>
                    </div>
                </div>
                <div class="author">
                    <img :src="playListDeatils.url" alt="" class="author_img">
                    <span class="author_span">
                        {{playListDeatils.author}}
                    </span>
                    <span class="createTime_span">  
                        {{playListDeatils.createtime}}
                    </span>
                </div>
                <div class="opreation">
                    <el-row>
                        <el-button type="primary" size="small" round icon="el-icon-caret-right">播放全部</el-button>
                        <el-button v-if="isCollect"  size="small" round icon="l-icon-folder-checked">已收藏({{playListDeatils.totalcollect}})</el-button>
                        <el-button v-else round size="small" icon="el-icon-folder-add" :disabled="isMine">收藏({{playListDeatils.totalcollect}})</el-button>
                        <el-button round size="small" icon="el-icon-share">分享({{playListDeatils.totalshare}})</el-button>
                        <el-button round size="small" icon="el-icon-download">全部下载</el-button>
                    </el-row>
                </div>
                <div class="label">
                    <span class="label_span" style="float:left">标签</span>
                    <div v-for="item in playListDeatils.label" :key="item.name" style="float:left" >
                        <span class="label_span1" >{{item.name}}</span>
                        <span>/</span>
                    </div>
                </div>
                <div class="playtimes">
                    <span>歌曲:{{tableData.length}} &nbsp&nbsp&nbsp 播放:{{playListDeatils.totalplay}}</span>
                </div>
                <div class="introduction">
                    <span>介绍:{{playListDeatils.introduction}}</span>
                    <div class="introduction_content"></div>
                </div>
            </div>
        </div>
        <div>
            <div class="sub_menu">
                <div :class="playListStatus ? 'submenu_item_click':'submenu_item'" @click="playListClick">
                    <span :class="playListStatus ? 'submenu_span_click':'submenu_span'">歌单</span>
                    <div :class="playListStatus ? 'menuLine':''"></div>
                </div>
                <div :class="commentStatus ? 'submenu_item_click':'submenu_item'" @click="commentClick">
                    <span :class="commentStatus ? 'submenu_span_click':'submenu_span'">评论({{this.commentNumber}})</span>
                    <div :class="commentStatus ? 'menuLine':''"></div>
                </div>
            </div>
        </div>
        <div v-show="playListStatus === true" style="width:100%"> 
            <template>
                <el-table :data="tableData" stripe style="width: 99%">
                    <el-table-column type="index" ></el-table-column>
                    <el-table-column width="80">
                         <template slot-scope="scope">
                            <i class="el-icon-star-on" v-if="scope.row.collect" @click="handleEdit(scope.$index, scope.row)"></i>
                            <i class="el-icon-star-off" v-else @click="handleEdit(scope.$index, scope.row)"></i>
                            <i class="el-icon-download icon01" @click="handleDelete(scope.$index, scope.row)"></i>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="音乐标题"
                    sortable
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="singer"
                    label="歌手">
                    </el-table-column>
                    <el-table-column
                    prop="album"
                    label="专辑"
                    sortable
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="singTime"
                    label="时长"
                    sortable
                    width="180">
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div v-show ="commentStatus === true">
            <comment></comment>
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
            playListStatus:true,
            commentStatus:false,
            listId:'',
            isMine:false,
            isCollect:true,
            commentNumber:7788,
            playListDeatils:{
                url:require("@/assets/img/img1.jpg"),
                type:'歌单',
                name:'「欧美」 慵懒的嗓音在你耳边问你现在睡吗',
                author: '周末回家睡懒觉',
                createdTime: '2017-07-13',
                singNumber:72,
                playTimes:'22万',
                introduce: '',
                collectTime:44,
                shareTime:55,
                label:[{name:'欧美'},{name:'夜晚'}]
            },
            singList:[],
            comment:[],
            activeName: 'first',
            tableData: [],
        }
    },
    mounted(){
        if(this.$route.query){
            this.listId = this.$route.query.id;
            this.isMine = this.$route.query.isAuthor;
            this.$axios.get(`SongListInfo/getSongListInfo?listId=${this.listId}`).then((res) => {
                if(res.data.success){
                    this.playListDeatils = res.data.playListDeatils;
                    this.playListDeatils.image = getImgSrc(res.data.playListDeatils.image)
                    console.log(this.playListDeatils)
                    console.log(getImgSrc(res.data.playListDeatils.image))
                    this.tableData = res.data.songList;
                }
            })
        }
        this.busListener();
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);

        },
        handleEdit(scope,row){
            console.log(row,scope)
            row.collect = !row.collect //collect需要再数据获取的时候就初始哈
            console.log(row.collect )
            //点击都要发送请求
        },
        commentClick(){
            this.commentStatus = true;
            this.playListStatus = false;
        },
        playListClick(){
            this.commentStatus = false;
            this.playListStatus = true;
        },
        busListener(){
            Bus.$on('playListItem', (state) =>{
                this.listId = state.id;
                this.isMine = state.isAuthor;
            });
        },
        getDetails(id){

        }
    }
}
</script>
<style scoped>
    .mian_content{
        display: flex;
        flex-direction: column;
        min-width: 780px;
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
    .playListName{
        margin-left: 5px;

    }
    .playListName_span{
        font-size: 22px;
        font-weight: bold;
    }
    .author_img{
        border-radius: 50%;
        height: 20px;
        width: 20px;
    }
    .author_span{
        color: cornflowerblue;
        cursor: pointer;
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
</style>