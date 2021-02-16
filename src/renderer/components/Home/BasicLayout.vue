<template>
    <div class="basic_layout">
        <div id="header">
            <basicHeader></basicHeader>
        </div>
        <div id="main">
            <div id="main_aside">
                侧边栏
            </div>
            <div id="mian_line_control">
            </div>
            <div id="main_content">
                主页内容
            </div>
        </div>
        <div id="footer">
            播放器
        </div>
        
    </div>
</template>
<script>
import basicHeader from '../BasicHeader/index'
export default {
    components:{
        basicHeader,
    },
    computed: {
        message() {
            return "欢迎来到首页"
        }
    }
}
</script>
<style>

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .basic_layout{
        height: 100vh;
        width: 100vw;
    }

    #main {
        display: flex;
    }
</style>