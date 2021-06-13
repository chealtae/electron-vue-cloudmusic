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
                <div class="author" style="height:25px">
                    <img :src="playListDeatils.image" alt="" class="author_img">
                    <span class="author_span" @click="showAuthor">
                        {{playListDeatils.nickname}}
                    </span>
                    <span class="createTime_span">  
                        {{playListDeatils.createtime}}
                    </span>
                </div>
                <div class="opreation">
                    <el-row>
                        <el-button type="primary" size="small" round icon="el-icon-caret-right">播放全部</el-button>
                        <el-button v-if="isCollect"  size="small" round icon="l-icon-folder-checked" @click="cancelCollect">已收藏({{playListDeatils.totalcollect}})</el-button>
                        <el-button v-else round size="small" icon="el-icon-folder-add" :disabled="isMine" @click="collect">收藏({{playListDeatils.totalcollect}})</el-button>
                        <el-button round size="small" icon="el-icon-share">分享({{playListDeatils.totalshare}})</el-button>
                        <!-- <el-button round size="small" icon="el-icon-download">全部下载</el-button> -->
                    </el-row>
                </div>
                <div class="label">
                    <span class="label_span" style="float:left">标签:</span>
                    <div v-for="(item,index) in tagRes" :key="item.name" style="float:left" >
                        <span class="label_span1" >{{item.name}}</span>
                        <span v-if="index !== tagRes.length-1">/</span>
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
                <el-table :data="tableData" stripe style="width: 99%" @row-dblclick="playSong" @row-contextmenu="rightClick">
                    <el-table-column type="index" ></el-table-column>
                    <!-- <el-table-column width="80">
                         <template slot-scope="scope">
                            <i class="el-icon-star-on" v-if="scope.row.collect" @click="handleEdit(scope.$index, scope.row)"></i>
                            <i class="el-icon-star-off" v-else @click="handleEdit(scope.$index, scope.row)"></i>
                            <i class="el-icon-download icon01" @click="handleDelete(scope.$index, scope.row)"></i>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                    prop="name"
                    label="音乐标题"
                    sortable
                    width="180" >
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
                    <!-- <el-table-column
                    prop="singTime"
                    label="时长"
                    sortable
                    width="180">
                    </el-table-column> -->
                </el-table>
                <div v-show="menuVisible">
                    <ul id="menu3" class="menu3">
                        <li class="menu_item" >播放</li>
                        <li class="menu_item" @click="removeFromList">从歌单中移出</li>
                        <li class="menu_item1" v-for="item in createList" :key="item.id" @click="addToList(item.id)">收藏至:{{item.name}}</li>
                    </ul>
                </div>
            </template>
        </div>
        <div v-if ="commentStatus === true">
            <comment :commentItemId="commentItemId" :commentType="2" :commentNumber="commentNumber"></comment>
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
            isCollect:false, //默认不收藏
            commentNumber:0,
            playListDeatils:{
                // url:require("@/assets/img/img1.jpg"),
                // type:'歌单',
                // name:'「欧美」 慵懒的嗓音在你耳边问你现在睡吗',
                // author: '周末回家睡懒觉',
                // createdTime: '2017-07-13',
                // singNumber:72,
                // playTimes:'22万',
                // introduce: '',
                // collectTime:44,
                // shareTime:55,
                // label:[{name:'欧美'},{name:'夜晚'}]
            },
            singList:[],
            comment:[],
            activeName: 'first',
            tableData: [],
            commentItemId:'',
            menuVisible: false,
            createList:[],
            currentSongId:'',
            tagRes:'',
            totalplayFlag:true,//播放量增加标志，
            userId:Number(localStorage.getItem("userId"))|| -1, 
        }
    },
    mounted(){
        //首先要判断路由里 带过来的数据是否存在
        //由于再次点击其他歌单不会刷新页面， 之后需要通过bus传过来的值改变页面
        if(this.$route.query){
            this.listId = this.$route.query.id;
            // this.isMine = this.$route.query.isAuthor;
            let info = {listId:Number(this.listId),userId:this.userId}
            this.$axios.post(`SongListInfo/getSongListInfo`,info).then((res) => {
                if(res.data.success){
                    this.playListDeatils = res.data.playListDeatils;
                    this.playListDeatils.image = getImgSrc(res.data.playListDeatils.image)
                    this.playListDeatils.nickname = res.data.playListDeatils.userinfo.nickname
                    this.tableData = res.data.songList;
                    this.tagRes = res.data.tagRes;
                    this.isMine = this.playListDeatils.userid === Number(localStorage.getItem("userId"))
                    console.log(this.isMine,this.playListDeatils.userid, Number(localStorage.getItem("userId")))
                }
            })
        } 
        this.busListener();
        this.commentItemId = this.listId;
        console.log(this.commentItemId)
        // this.commentInfo.type = 2; // 由于组件是复用，需要传递评论的是哪一种类型 
        //0 歌曲  1专辑 2歌单 3动态 4排行 todo 封装到js中

        this.getCommentNumber()
        this.judgeCollect();//判断歌单是否被收藏 
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        playSong(row){
            //向播放列表界面 发送完整的列表数据  存store里下次打开数据会消失，所以放在storage里
            localStorage.setItem('playlist',JSON.stringify(this.tableData))
            localStorage.setItem('currentPlayId',row.id)
            Bus.$emit('playFromList',row.id)//传递歌曲id
            //向播放条 发送简化后的播放列表
            let simpleList = [];
            this.tableData.forEach((item) => {
                simpleList.push(item.id);
            })
            let flag = simpleList.indexOf(row.id);
            let temp = simpleList.slice(0,flag);
            console.log(temp)
            simpleList.splice(0,flag)
            simpleList = simpleList.concat(temp)
            console.log(simpleList)
            

            //防止无限点击 可以一直增加播放量
            if(this.totalplayFlag){
                this.updateTotalPlay();
                this.totalplayFlag = false
            }
            
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
                this.commentItemId = this.listId;
                console.log(state)
                this.getSongListInfo();
                this.getCommentNumber()
                this.commentStatus=false;
                this.playListStatus = true;
                this.totalplayFlag = true;
            });
            
        },
        getSongListInfo(){
            let info = {listId:Number(this.listId),userId:this.userId}
            this.$axios.post(`SongListInfo/getSongListInfo`,info).then((res) => {
                if(res.data.success){
                    this.playListDeatils = res.data.playListDeatils;
                    this.playListDeatils.image = getImgSrc(res.data.playListDeatils.image)
                    this.playListDeatils.nickname = res.data.playListDeatils.userinfo.nickname
                    this.tableData = res.data.songList;
                    this.tagRes = res.data.tagRes;
                    this.isMine = this.playListDeatils.userid === Number(localStorage.getItem("userId"))
                }
            })
        },
        getCommentNumber(){
            let info = {type : 2,typeId :Number(this.listId) }//0 歌曲 1 专辑 2 歌单 3动态 4歌手
            this.$axios.post(`/Comment/getCommentNumber`,info).then((res) => {
                if(res.data.success){
                    this.commentNumber = res.data.commentNumber;
                }
            })
        },
        judgeCollect(){
            let info = {
                userId :Number(localStorage.getItem("userId")),
                typeId :Number(this.listId),
                collectType : 2,//0 歌曲 1 专辑 2 歌单 3动态 4歌手
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
                typeId :Number(this.listId),
                collectType : 2,//0 歌曲 1 专辑 2 歌单 3动态 4歌手
            }
            this.$axios.post(`/Operation/collect`,info).then((res) => {
                if(res.data.success){
                    this.$message.success("收藏成功")
                    this.isCollect = true;
                    this.playListDeatils.totalcollect++;
                    Bus.$emit("refresh",true)//侧边栏需要刷新
                }
            })

           
        },
        cancelCollect(){
            let info ={
                userId:Number(localStorage.getItem('userId')),
                typeId:Number(this.listId),
                collectType : 2,
            }
            this.$axios.post(`Operation/cancelCollect`,info).then((res) => {
                if(res.data.success){
                    this.$message.success("取消收藏成功")
                    this.isCollect = false;
                    this.playListDeatils.totalcollect--;
                    Bus.$emit("refresh",true)//侧边栏需要刷新
                }
            })
        },
        showAuthor(){
            this.$router.push({
                path:"/UserInfo",
                query:{
                    id:this.playListDeatils.userid
                }
            })
        },
        rightClick(row, column, event) { // 鼠标右击触发事件

         console.log(event,event.clientX)
            this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
            this.menuVisible = true  // 显示模态窗口，跳出自定义菜单栏

            var menu = document.querySelector('.menu3')
            console.log(menu)
            document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
            menu.style.display = "block";
            menu.style.position = "fixed";
            menu.style.left = event.clientX - 0 + 'px'
            menu.style.top = event.clientY - 80 + 'px'
     
            this.createList = JSON.parse(localStorage.getItem("createList")) //每次右击的时候都要获取一下自己创建的歌单
            this.currentSongId = row.id
            
        },
        foo() { // 取消鼠标监听事件 菜单栏
            this.menuVisible = false
            document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
        },
        //移出单曲
        removeFromList(){
            let info = {id:Number(this.listId) ,songId:this.currentSongId}
            this.$axios.post(`/SongList/removeFromList`,info).then(res => {
                if(res.data.success){
                    this.$message.success("移出成功")
                    this.getSongListInfo();//刷新列表
                }
            })
        },
        //播放后 歌单播放量增加
        updateTotalPlay(){
            this.$axios.get(`/SongListInfo/updateTotalPlay?listId=`+this.listId).then(res => {
                if(res.data.success){
                    this.playListDeatils.totalplay++;
                }
            })
        },
        addToList(id){
            let info = {id:id ,songId:this.currentSongId}
            this.$axios.post(`/SongList/addToList`,info).then(res => {
                if(res.data.success){
                    this.$message.success('添加成功')
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
        margin-top: 10px;
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
        
        width:240px;
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
    .menu_item{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>