<template>
    <div class="sider_container">
        <div class="sider_title_1">
            <span class="title_span">发现音乐</span>
        </div>
        <div class="sider_title_2">
            <span class="title_span">视频</span>
        </div>
        <div class="sider_title_2">
            <span class="title_span">朋友</span>
        </div>
        <div class="sider_title_2">
            <span class="title_span">私人FM</span>
        </div>
        <div class="sider_title_static">
            <span class="title_span_static">我的音乐</span>
        </div>
        <div class="sider_title_3">
            <span class="title_span_2">本地音乐</span>
        </div>
        <div class="sider_title_3">
            <span class="title_span_2">下载管理</span>
        </div>
        <div class="sider_title_3">
            <span class="title_span_2">我的云音乐</span>
        </div>
        <div class="sider_title_3">
            <span class="title_span_2">下载管理</span>
        </div>
        <div class="sider_title_3">
            <span class="title_span_2">我的收藏</span>
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
            ]
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