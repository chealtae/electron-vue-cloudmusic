<template>
    <div>
        <span class="resultSpan">搜索结果</span>    
        <div class="select">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="单曲" name="0">
                    <template>
                        <el-table :data="songRes" stripe style="width: 99%" @row-dblclick="playSong" @row-contextmenu="rightClick">
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
                            <el-table-column
                            prop="totalplay"
                            label="播放"
                            sortable
                            width="180">
                            </el-table-column>
                        </el-table>
                        <div v-show="menuVisible">
                            <ul id="menu1" class="menu1">
                                <li class="menu_item" @click="playSong()">播放</li>
                                <li class="menu_item" v-for="item in createList" :key="item.id" @click="addToList(item.id)">收藏至:{{item.name}}</li>
                            </ul>
                        </div>
                    </template>
                    
                </el-tab-pane>
                <el-tab-pane label="歌手" name="1" class="tips_span">
                    <span v-if="singerRes.length === 0">暂无数据</span>
                    <template >
                        <div class="singerItem" v-for="item in singerRes" :key="item.id" @click="showSinger(item.id)">
                            <img :src="item.image" alt="" class="imgItem">
                            <span class="userName">{{item.name}}</span>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="专辑" name="2" class="tips_span">
                    <span v-if="albumRes.length === 0" >暂无数据</span>
                    <template>
                        <div class="singerItem" v-for="item in albumRes" :key="item.id" @click="go2Album(item.id)" >
                            <img :src="item.image" alt="" class="imgItem">
                            <span class="userName">{{item.name}}</span>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="歌单" name="3" class="tips_span">
                    <span v-if="ListRes.length === 0">暂无数据</span>
                    <template>
                        <div class="singerItem"  v-for="item in ListRes" :key="item.id" @click="goList(item.id)">
                            <img :src="item.image" alt="" class="imgItem">
                            <span class="userName">{{item.name}}</span>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="用户" name="4" class="tips_span">
                    <span v-if="userRes.length === 0">暂无数据</span>
                    <template>
                        <div class="singerItem" v-for="item in userRes" :key="item.id" @click="go2userInfo(item.id)">
                            <img :src="item.image" alt="" class="imgItem">
                            <span class="userName">{{item.nickname}}</span>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import {getImgSrc} from '../Common/getSrc'
import Bus from '../Common/bus'
export default {
    data() {
      return {
        activeName: '0',
        tableData:[{id: 1, name:"还是会想你"}],
        ListRes:[],
        albumRes:[],
        singerRes:[],
        songRes:[],
        userRes:[],
        menuVisible: false,
        createList:[],
        currentSongId:'',
        fits:['cover']
      };
    },
    mounted() {
        if(this.$route.query){
            this.getSearchResult();
        }
        
        this.BusListener();
        // this.getSearchResult();
    },

    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        getSearchResult(input){
            let info = {}
            if(input){
                info = {ResKey:input}
                console.log('xxxxxxxxxxxxx')
            } else {
                info = {ResKey:this.$route.query.input}
                console.log('yyyyyyyyyyy')
            }
            this.$axios.post(`/SongInfo/search`,info).then((res) => {
                if(res.data.success){
                    console.log(res.data)
                    this.ListRes = res.data.ListRes;
                    this.songRes = res.data.songRes;
                    this.albumRes = res.data.albumRes;
                    this.userRes = res.data.userRes;
                    this.singerRes = res.data.singerRes;
                    this.songRes.map((item) => {
                        if(item.album === null) {
                            item.album = '未知专辑'
                        }
                    })
                    //一次性查询所有数据，图片都需要经过路径处理
                    this.ListRes.map((item) => {
                        item.image = getImgSrc(item.image)
                        return item;
                    })
                    this.albumRes.map((item) => {
                        item.image = getImgSrc(item.image)
                        return item;
                    })
                    this.userRes.map((item) => {
                        item.image = getImgSrc(item.image)
                        console.log(item.image)
                        return item;
                    })
                    this.singerRes.map((item) => {
                        item.image = getImgSrc(item.image)
                        console.log(item.image)
                        return item;
                    })
                    
                }
            })
        },
        playSong(row){
            //向播放列表界面 发送完整的列表数据  存store里下次打开数据会消失，所以放在storage里
            console.log(row ,this.currentSongId)
            if(row){
                this.currentSongId = row.id
            }
            console.log(this.currentSongId)
            localStorage.setItem('playlist',JSON.stringify(this.songRes))
            localStorage.setItem('currentPlayId',this.currentSongId)
            Bus.$emit('playFromList',this.currentSongId)//传递歌曲id
            //向播放条 发送简化后的播放列表
            let simpleList = [];
            this.tableData.forEach((item) => {
                simpleList.push(item.id);
            })
            let flag = simpleList.indexOf(this.currentSongId);
            let temp = simpleList.slice(0,flag);
            console.log(temp)
            simpleList.splice(0,flag)
            simpleList = simpleList.concat(temp)
            console.log(simpleList)

        },
        BusListener(){
            Bus.$on("search",(state)=> {
                this.getSearchResult(state)
            })
        },
         //右键点击
        rightClick(row, column, event) { // 鼠标右击触发事件
            
            
            this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
            this.menuVisible = true  // 显示模态窗口，跳出自定义菜单栏

            var menu = document.querySelector('#menu1')
            document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
            menu.style.display = "block";
            menu.style.position = "fixed";
            menu.style.left = event.clientX - 0 + 'px'
            menu.style.top = event.clientY - 80 + 'px'

            this.createList = JSON.parse(localStorage.getItem("createList")) //每次右击的时候都要获取一下自己创建的歌单
            this.currentSongId = row.id //获取右击歌曲的id
            console.log(this.currentSongId)
            
        },
        foo() { // 取消鼠标监听事件 菜单栏
            this.menuVisible = false
            document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
        },
        //右键收藏至歌单
        addToList(id){
            let info = {id:id ,songId:this.currentSongId}
            this.$axios.post(`/SongList/addToList`,info).then(res => {
                if(res.data.success){
                    this.$message.success('添加成功')
                }
            })
        },
        showSinger(id){
            this.$router.push({
                path:"/singerInfo",
                query:{
                    id:id,
                }
            })
        },
        go2Album(id){
            this.$router.push({
                path:"/albumListItem",
                query:{
                    id:id,
                }
            })
        },
        go2userInfo(id){
            this.$router.push({
                path:"/UserInfo",
                query:{
                    id:id,
                }
            })
        },
        go2List(id){
            this.$router.push({
                path:"/playListItem",
                query:{
                    id:id,
                }
            })
        }
    }
}
</script>
<style scoped>
    .select{
        padding: 0 20px;
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
    .singerItem:hover{
        background-color: rgba(148, 139, 98, 0.5);
    }
    .tips_span{
        text-align: center;
    }
    .resultSpan{
        margin-left: 20px;
        line-height: 50px;
        font-size: 24px;
        font-weight: bold;
    }
    .menu1 {
        
        width:120px;
        /* position: absolute; */
        border-radius: 3px;
        background-color: #f4f4f4;
        z-index: 20;
        text-align: left;
        box-shadow: 1px 2px 6px 0px #c1baba;
    }

    .menu1 li:hover {
        background-color: #1790ff;
        color: white;
        cursor: pointer;
    }
    .menu1 li{font-size:15px;
    list-style: none}
</style>