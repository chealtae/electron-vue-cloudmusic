<template>
    <div class="mian_content">
        <div class='introduce_header'>
            <div class="introduce_img">
                <img :src="playListDeatils.url" alt="" style="height:100%; width:100%">
            </div>
            <div class="introduce_content">
                <div class="title">
                    <div class="deatil_type">
                        <span class="type_span">
                            {{playListDeatils.type}}
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
                        {{playListDeatils.createdTime}}
                    </span>
                </div>
                <div class="opreation">
                    <el-row>
                        <el-button type="primary" round icon="el-icon-caret-right">播放全部</el-button>
                        <el-button v-if="isCollect" round icon="l-icon-folder-checked">已收藏({{playListDeatils.collectTime}})</el-button>
                        <el-button v-else round icon="el-icon-folder-add" :disabled="isMine">收藏({{playListDeatils.collectTime}})</el-button>
                        <el-button round icon="el-icon-share">分享({{playListDeatils.shareTime}})</el-button>
                        <el-button round icon="el-icon-download">全部下载</el-button>
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
                    <span>歌曲:{{playListDeatils.singNumber}} 播放:{{playListDeatils.playTimes}}</span>
                </div>
                <div class="introduction">
                    <span>介绍:</span>
                    <div class="introduction_content"></div>
                </div>
            </div>
        </div>
        <div>
            <el-tabs v-model="activeName" @tab-click="handleClick" style="width:375px">
                <el-tab-pane label="歌曲列表" name="first"></el-tab-pane>
                <el-tab-pane label="评论" name="second"></el-tab-pane>
            </el-tabs> 
        </div>
        <div v-show="activeName === 'first'" style="width:100%"> 
            <template>
                <el-table :data="tableData" stripe style="width: 99%">
                    <el-table-column type="index" :index="indexMethod"></el-table-column>
                    <el-table-column width="180">
                         <template slot-scope="scope">
                            <i class="el-icon-star-on" v-if="scope.row.collect" @click="handleEdit(scope.$index, scope.row)"></i>
                            <i class="el-icon-star-off" v-else @click="handleEdit(scope.$index, scope.row)"></i>
                            <i class="el-icon-download icon01" @click="handleDelete(scope.$index, scope.row)"></i>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="songName"
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
        <div v-show ="activeName === 'second'">
            <comment></comment>
        </div>
    </div>
</template>
<script>
import Comment from '../Common/Comment.vue';
export default {
    components:{
        Comment,
    },
    data() {
        return {
            isMine:false,
            isCollect:true,
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
            tableData: [{
            songName: '2016-05-02',
            singer: '王小虎',
            album: '上海',
            singTime: '普陀区',
            collect:false},
            {
            songName: '2016-05-02',
            singer: '王小虎',
            album: '上海',
            singTime: '普陀区',
            collect:true},]
        }
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
        }
    }
}
</script>
<style scoped>
    .mian_content{
        display: flex;
        flex-direction: column;
    }
    .introduce_header{
        height: 180px;
        border: black 1px solid;
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
        border: solid black 1px;
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
</style>