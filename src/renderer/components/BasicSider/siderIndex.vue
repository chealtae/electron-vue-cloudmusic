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
                        <slot >创建的歌单 
                            <i class="el-icon-plus" @click="createlist"></i>
                        </slot>
                    </div>
                </template>
                <el-menu-item v-for="createdItem in createdItemList" :key="createdItem.playListsId"
                    @click="playlistClick(createdItem.id,true)" >
                    <span class="sider_menu_item" @contextmenu="rightClick($event,createdItem.id,true)">
                        {{createdItem.name}}
                    </span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template  slot="title">
                    <div class="sider_menu_title">
                        <slot >收藏的歌单</slot>
                    </div>
                </template>
                    <el-menu-item v-for="collectedItem in collectedItemList" :key="collectedItem.playListsId" @click="playlistClick(createdItem.id,false)">
                        <span class="sider_menu_item"  @contextmenu="rightClick($event,collectedItem.id,false)">
                            {{collectedItem.name}}
                        </span>
                    </el-menu-item>
            </el-submenu>
        </el-menu>
        <div v-show="menuVisible">
                <ul id="menu" class="menu">
                    <li class="menu_item">播放</li>
                    <li class="menu_item" >编辑歌单</li>
                    <li class="menu_item" v-if="deleteFlag" @click="deleteList">删除歌单</li>
                    <li class="menu_item" v-else @click="cancelCollect">取消收藏</li>
                </ul>
            </div>
    </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import Bus from '../Common/bus'
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
            isActived: 'findMusic',
            currentListId:'',
            menuVisible: false,
                productTypes: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
            deleteFlag:'',
        }
    },
    mounted() {
        if(localStorage.getItem('userId')){
            let userInfo ={
                userId:Number(localStorage.getItem('userId'))
            }
            this.$axios.post(`SongListInfo/getCreateList`,userInfo).then((res) => {
                if(res.data.success){
                    this.createdItemList = res.data.listid;
                }
            })
            this.$axios.post(`SongListInfo/getCollectList`,userInfo).then((res) => {
                if(res.data.success){
                    this.collectedItemList = res.data.listid;
                }
            })
        }
        this.ipcListener();
    },
    methods: {
        cancelCollect() {
            let info ={
                userId:Number(localStorage.getItem('userId')),
                typeId:this.currentListId
            }
            this.$axios.post(`Operation/cancelCollectList`,info).then((res) => {
                if(res.data.success){
                    this.$message.success("删除歌单成功")
                    this.getCollectList();
                }
            })
        },
        deleteList(){
            this.$axios.get(`/SongListInfo/deleteSongList?songListId=` + this.currentListId).then((res) => {
                if(res.data.success){
                    this.$message.success("删除歌单成功")
                    this.getSongList();//刷新界面
                } else {
                    this.$message.error("删除歌单失败")
                }
            })
        },
        showOperation() {
            console.log('222222')
        },
        //右键点击
        rightClick(MouseEvent,id,flag) { // 鼠标右击触发事件
            this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
            this.menuVisible = true  // 显示模态窗口，跳出自定义菜单栏

            this.deleteFlag = flag; //控制不同操作

            var menu = document.querySelector('#menu')
            document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
            menu.style.display = "block";
            menu.style.left = MouseEvent.clientX - 0 + 'px'
            menu.style.top = MouseEvent.clientY - 80 + 'px'
            this.currentListId = id;//存放当前点击的歌单id
            
        },
        foo() { // 取消鼠标监听事件 菜单栏
            this.menuVisible = false
            document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
        },
        createlist(){
            ipcRenderer.send('createMusicList')
        },
        ipcListener(){
            //创建歌单后刷新界面
            ipcRenderer.on('createNewList',() => {
                this.getSongList();
            })
        },
        getSongList(){
            let userInfo ={
                userId:Number(localStorage.getItem('userId'))
            }
            // console.log('接收刷新消息');
            this.$axios.post(`SongListInfo/getCreateList`,userInfo).then((res) => {
                if(res.data.success){
                    this.createdItemList = res.data.listid;
                }
            })
        },
        getCollectList(){
            let userInfo ={
                userId:Number(localStorage.getItem('userId'))
            }
            this.$axios.post(`SongListInfo/getCollectList`,userInfo).then((res) => {
                if(res.data.success){
                    this.collectedItemList = res.data.listid;
                }
            })
        },
        findMusicClick(){
            this.isActived = 'findMusic';
            this.changeStatus();
            this.$router.push("/findMusic")
        },
        musicVedioClick(){
            this.isActived = 'musicVedio';
            this.changeStatus();
            this.$router.push("/musicVedio")
        },
        friendsCircleClick(){
            this.isActived = 'friendsCircle';
            this.changeStatus();
            this.$router.push('/friendsCircle')
        },
        FMClick(){
            this.isActived = 'FM';
            this.changeStatus();
            this.$router.push('/personalFM')
        },
        localMusicClick(){
            this.isActived = 'localMusic';
            this.changeStatus();
            this.$router.push('/localMusic')
        },
        downloadClick(){
            this.isActived = 'download';
            this.changeStatus();
            this.$router.push('/download')
        },
        myCloudMusicClick(){
            this.isActived = 'myCloudMusic';
            this.changeStatus();
            this.$router.push('/myCloudMusic')
        },
        radioStationClick() {
            this.isActived = 'radioStation';
            this.changeStatus();
            this.$router.push('/radioStation')
        },
        myCollectClick() {
            this.isActived = 'myCollect';
            this.changeStatus();
            this.$router.push('/myCollect')
        },
        playlistClick(id,flag) {
            this.isActived = 'playlist';
            this.changeStatus();
            this.$router.push({
                path:`playlistItem`,
                query: {
                    id:id,
                    isAuthor:flag,
                }
            })
            Bus.$emit('playListItem',{id:id,isAuthor:flag})
            
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
        text-overflow: ellipsis;
        white-space: nowrap; 
        overflow: hidden;
        width: 80%;
    }
    .el-submenu .el-menu-item{
        height: 40px;
        position: relative;
        margin-left: -19px;
    }
    .sider_menu_title .el-icon-plus{
        font-size: 16px;
            margin-top: -4px;
    }
    .menu {
        
        width:120px;
        position: absolute;
        border-radius: 3px;
        background-color: #f4f4f4;
        z-index: 20;
        text-align: center;
        box-shadow: 1px 2px 6px 0px #c1baba;
    }

    .menu li:hover {
        background-color: #1790ff;
        color: white;
        cursor: pointer;
    }
    .menu li{font-size:15px;
    list-style: none}
</style>