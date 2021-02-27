<template>
    <div>
        <div class="sider_title_1">
            <span class="title_span">发现音乐</span>
        </div>
        <div class="sider_title">
            <span class="title_span">视频</span>
        </div>
        <div class="sider_title">
            <span class="title_span">朋友</span>
        </div>
        <div class="sider_title">
            <span class="title_span">私人FM</span>
        </div>
        <div class="sider_title_static">
            <span class="title_span">我的音乐</span>
        </div>
        <el-menu :default-openeds="['1', '2']" style="overflow:hidden" >
            <el-submenu index="1">
                <template slot="title">创建的歌单</template>
                    <el-menu-item index="1-1">我喜欢的音乐</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">收藏的歌单</template>
                    <el-menu-item index="2-1">你会爱上这个流行华语歌单</el-menu-item>
                    <el-menu-item index="2-2">「欧美」 慵懒的嗓音在你耳边问你现在睡吗</el-menu-item>
            </el-submenu>
        </el-menu>
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style >
    .sider_title_1{
        width: 167px;
        height: 36px;
        margin-left: 13px;
        margin-top: 12px;
        cursor: pointer;
    }
    .sider_title{
        width: 167px;
        height: 34px;
        margin-left: 13px;
        margin-top: 3px;
        cursor: pointer;
    }
    .sider_title_static{
        width: 167px;
        height: 34px;
        margin-left: 13px;
        margin-top: 3px;
        -webkit-user-select: none;
        cursor:default
    }
    .title_span{
        display: block;
        padding-top: 10px;
        font-size: 14px;
        padding-left: 8px;
    }
</style>