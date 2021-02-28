<template>
    <div class="sider_container">
        <div :class="findMusicStatus? 'sider_title_1_click' : 'sider_title_1'" @click="findMusicClick">
            <span :class="findMusicStatus? 'title_span_click' :'title_span'">发现音乐</span>
        </div>
        <div :class="musicVedioStatus? 'sider_title_2_click' : 'sider_title_2'" @click="musicVedioClick">
            <span :class="musicVedioStatus? 'title_span_click' :'title_span'">视频</span>
        </div>
        <div :class="friendsCircleStatus? 'sider_title_2_click' : 'sider_title_2'" @click="friendsCircleClick">
            <span :class="friendsCircleStatus? 'title_span_click' :'title_span'">朋友</span>
        </div>
        <div :class="FMStatus? 'sider_title_2_click' : 'sider_title_2'" @click="FMClick">
            <span :class="FMStatus? 'title_span_click' :'title_span'">私人FM</span>
        </div>
        <div class="sider_title_static">
            <span class="title_span_static">我的音乐</span>
        </div>
        <div :class=" localMusicStatus? 'sider_title_3_click' : 'sider_title_3'" @click="localMusicClick">
            <span :class="localMusicStatus? 'title_span_2_click' :'title_span_2'">本地音乐</span>
        </div>
        <div :class=" downloadStatus? 'sider_title_3_click' : 'sider_title_3'" @click="downloadClick">
            <span :class="downloadStatus? 'title_span_2_click' :'title_span_2'">下载管理</span>
        </div>
        <div :class=" myCloudMusicStatus? 'sider_title_3_click' : 'sider_title_3'" @click="myCloudMusicClick">
            <span :class="myCloudMusicStatus? 'title_span_2_click' :'title_span_2'">我的云音乐</span>
        </div>
        <div :class=" radioStationStatus? 'sider_title_3_click' : 'sider_title_3'" @click="radioStationClick">
            <span :class="radioStationStatus? 'title_span_2_click' :'title_span_2'">我的电台</span>
        </div>
        <div :class=" myCollectStatus? 'sider_title_3_click' : 'sider_title_3'" @click="myCollectClick">
            <span :class="myCollectStatus? 'title_span_2_click' :'title_span_2'">我的收藏</span>
        </div>
        <el-menu :default-openeds="['1', '2']" class="sider_menu" >
            <el-submenu index="1" >
                <template slot="title" >
                    <div class="sider_menu_title">
                        <slot >创建的歌单</slot>
                    </div>
                </template>
                <el-menu-item v-for="createdItem in createdItemList" :key="createdItem.playListsId" >
                    <span class="sider_menu_item">
                        {{createdItem.playlistsName}}
                    </span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template  slot="title">
                    <div class="sider_menu_title">
                        <slot >收藏的歌单</slot>
                    </div>
                </template>
                    <el-menu-item v-for="collectedItem in collectedItemList" :key="collectedItem.playListsId">
                        <span class="sider_menu_item">
                            {{collectedItem.playlistsName}}
                        </span>
                    </el-menu-item>
            </el-submenu>
        </el-menu>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            createdItemList:[
                {
                    playListsId: 1 ,
                    playlistsName:'我喜欢的音乐'
                },
                {
                    playListsId: 2 ,
                    playlistsName:'适合运动的歌曲'
                },
            ],
            collectedItemList:[
                {
                    playListsId: 1 ,
                    playlistsName:'你会爱上这个流行华语歌单'
                },
                {
                    playListsId: 2 ,
                    playlistsName:'「欧美」 慵懒的嗓音在你耳边问你现在睡吗'
                },
            ],
            findMusicStatus: true,
            musicVedioStatus: false,
            friendsCircleStatus : false,
            FMStatus: false,
            localMusicStatus: false,
            downloadStatus: false,
            myCloudMusicStatus: false,
            radioStationStatus: false,
            myCollectStatus: false,
            playlistStatus: false,
            isActived: 'findMusic'
        }
    },
    methods: {
        findMusicClick(){
            this.isActived = 'findMusic';
            this.changeStatus();
            this.$router.push("/")
        },
        musicVedioClick(){
            this.isActived = 'musicVedio';
            this.changeStatus();
            this.$router.push("/MusicVedio")
        },
        friendsCircleClick(){
            this.isActived = 'friendsCircle';
            this.changeStatus();
        },
        FMClick(){
            this.isActived = 'FM';
            this.changeStatus();
        },
        localMusicClick(){
            this.isActived = 'localMusic';
            this.changeStatus();
        },
        downloadClick(){
            this.isActived = 'download';
            this.changeStatus();
        },
        myCloudMusicClick(){
            this.isActived = 'myCloudMusic';
            this.changeStatus();
        },
        radioStationClick() {
            this.isActived = 'radioStation';
            this.changeStatus();
        },
        myCollectClick() {
            this.isActived = 'myCollect';
            this.changeStatus();
        },
        playlistClick() {
            this.isActived = 'playlist';
            this.changeStatus();
        },
        changeStatus(){
            if(this.isActived === 'findMusic'){
                this.findMusicStatus = true;
                this.musicVedioStatus = false;
                this.friendsCircleStatus = false;
                this.FMStatus = false;
                this.localMusicStatus = false;
                this.downloadStatus = false;
                this.myCloudMusicStatus = false;
                this.radioStationStatus = false;
                this.myCollectStatus = false;
                this.playlistStatus = false;
            } else if(this.isActived === 'musicVedio'){
                this.findMusicStatus = false;
                this.musicVedioStatus = true;
                this.friendsCircleStatus = false;
                this.FMStatus = false;
                this.localMusicStatus = false;
                this.downloadStatus = false;
                this.myCloudMusicStatus = false;
                this.radioStationStatus = false;
                this.myCollectStatusStatus = false;
                this.playlistStatus = false;
            } else if(this.isActived === 'friendsCircle'){
                this.findMusicStatus = false;
                this.musicVedioStatus = false;
                this.friendsCircleStatus = true;
                this.FMStatus = false;
                this.localMusicStatus = false;
                this.downloadStatus = false;
                this.myCloudMusicStatus = false;
                this.radioStationStatus = false;
                this.myCollectStatus = false;
                this.playlistStatus = false;
            } else if(this.isActived === 'FM'){
                this.findMusicStatus = false;
                this.musicVedioStatus = false;
                this.friendsCircleStatus = false;
                this.FMStatus = true;
                this.localMusicStatus = false;
                this.downloadStatus = false;
                this.myCloudMusicStatus = false;
                this.radioStationStatus = false;
                this.myCollectStatus = false;
                this.playlistStatus = false;
            } else if(this.isActived === 'localMusic'){
                this.findMusicStatus = false;
                this.musicVedioStatus = false;
                this.friendsCircleStatus = false;
                this.FMStatus = false;
                this.localMusicStatus = true;
                this.downloadStatus = false;
                this.myCloudMusicStatus = false;
                this.radioStationStatus = false;
                this.myCollectStatus = false;
                this.playlistStatus = false;
            } else if(this.isActived === 'download'){
                this.findMusicStatus = false;
                this.musicVedioStatus = false;
                this.friendsCircleStatus = false;
                this.FMStatus = false;
                this.localMusicStatus = false;
                this.downloadStatus = true;
                this.myCloudMusicStatus = false;
                this.radioStationStatus = false;
                this.myCollectStatus = false;
                this.playlistStatus = false;
            } else if(this.isActived === 'myCloudMusic'){
                this.findMusicStatus = false;
                this.musicVedioStatus = false;
                this.friendsCircleStatus = false;
                this.FMStatus = false;
                this.localMusicStatus = false;
                this.downloadStatus = false;
                this.myCloudMusicStatus = true;
                this.radioStationStatus = false;
                this.myCollectStatus = false;
                this.playlistStatus = false;
            } else if(this.isActived === 'radioStation'){
                this.findMusicStatus = false;
                this.musicVedioStatus = false;
                this.friendsCircleStatus = false;
                this.FMStatus = false;
                this.localMusicStatus = false;
                this.downloadStatus = false;
                this.myCloudMusicStatus = false;
                this.radioStationStatus = true;
                this.myCollectStatus = false;
                this.playlistStatus = false;
            } else if(this.isActived === 'myCollect'){
                this.findMusicStatus = false;
                this.musicVedioStatus = false;
                this.friendsCircleStatus = false;
                this.FMStatus = false;
                this.localMusicStatus = false;
                this.downloadStatus = false;
                this.myCloudMusicStatus = false;
                this.radioStationStatus = false;
                this.myCollectStatus = true;
                this.playlistStatus = false;
            } else if(this.isActived === 'playlist'){
                this.findMusicStatus = false;
                this.musicVedioStatus = false;
                this.friendsCircleStatus = false;
                this.FMStatus = false;
                this.localMusicStatus = false;
                this.downloadStatus = false;
                this.myCloudMusicStatus = false;
                this.radioStationStatus = false;
                this.myCollectStatus = false;
                this.playlistStatus = true;
            }
        }
    }
}
</script>
<style scoped>
    ::-webkit-scrollbar{
        width: 0px;
    }
    .sider_container{
        height: 100%;
        overflow: scroll;
    }
    .sider_title_1{
        height: 36px;
        margin-left: 13px;
        margin-top: 12px;
        margin-right: 13px;
        cursor: pointer;
    }
    .sider_title_1_click{
        height: 36px;
        margin-left: 13px;
        margin-top: 12px;
        margin-right: 13px;
        cursor: pointer;
        background: rgba(223, 222, 222, 0.383);
    }
    .sider_title_1:hover{
        background: rgba(223, 222, 222, 0.383);
    }
    .sider_title_2{
        height: 34px;
        margin-left: 13px;
        margin-top: 3px;
        margin-right: 13px;
        cursor: pointer;
    }
    .sider_title_2_click{
        height: 34px;
        margin-left: 13px;
        margin-top: 3px;
        margin-right: 13px;
        cursor: pointer;
        background: rgba(223, 222, 222, 0.383);
    }
    .sider_title_2:hover{
        background: rgba(223, 222, 222, 0.383);
    }
    .sider_title_3{
        height: 37px;
        margin-left: 13px;
        margin-top: 3px;
        margin-right: 13px;
        cursor: pointer;
    }
    .sider_title_3_click{
        height: 37px;
        margin-left: 13px;
        margin-top: 3px;
        margin-right: 13px;
        cursor: pointer;
        background: rgba(223, 222, 222, 0.383);
    }
    .sider_title_3:hover{
        background: rgba(223, 222, 222, 0.383);
    }
    .sider_title_static{
        width: 167px;
        height: 29px;
        margin-left: 13px;
        margin-top: 7px;
        cursor:default
    }
    .title_span{
        display: block;
        padding-top: 10px;
        font-size: 14px;
        padding-left: 8px;
    }
    .title_span_click{
        display: block;
        padding-top: 10px;
        font-size: 16px;
        padding-left: 8px;
        font-weight: bolder;
    }
    .title_span_static{
        display: block;
        padding-top: 10px;
        font-size: 13px;
        padding-left: 8px;
        color: rgb(179, 171, 171);
    }
    .title_span_2{
        display: block;
        padding-top: 11px;
        font-size: 14px;
        padding-left: 8px;
    }
    .title_span_2_click{
        display: block;
        padding-top: 11px;
        font-size: 16px;
        padding-left: 8px;
        font-weight: bolder;
    }
    .sider_menu{
        overflow:hidden; 
        border-right:0;
    }
    .sider_menu_title{
        color: rgb(179, 171, 171);
        font-size: 13px;
    }
    .sider_menu_item{
        height: 100%;
        display: block;
        position: absolute;
        margin-top: -4px;
    }
    .el-submenu .el-menu-item{
        height: 40px;
        position: relative;
        margin-left: -19px;
    }
</style>