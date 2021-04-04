<template>
    <div class="basic_layout">
        <div id="header">
            <basicHeader></basicHeader>
        </div>
        <div id="main">
            <sider-index id="main_aside" :style="shrinkStyle"></sider-index>
            <div id="main_line_control"  v-drag='{set:set}' @mouseup="setOldWidthVal">
            </div>
            <div id="pagecontent">
                <router-view></router-view>     
            </div>
        </div>
        <div id="footer">
            <play-bar></play-bar>
        </div>
        
    </div>
</template>
<script>

import basicHeader from '../BasicHeader/index'
import SiderIndex from '../BasicSider/siderIndex.vue'
import PlayBar from '../Common/playBar.vue'
export default {
    components:{
        basicHeader,
        SiderIndex,
        PlayBar,
    },
    data() {
        return {
            minAsideWidth: '220', 
            widthVal: '220',//存放要缩放元素实时变动值
            oldWidthVal: '220', //存放触发按下鼠标时的元素宽度
            dragVal:0  //存放实时鼠标移动的距离

        }
    },
    computed: {
        shrinkStyle() {
            return {
                'width': this.widthVal + 'px'
            }
        },
    },
    watch: {
        dragVal(val) {
            this.widthVal = parseInt(this.oldWidthVal) - parseInt(val)
            if(this.widthVal < 220) {
                this.widthVal = '220'
            } else if (this.widthVal > 400) {
                this.widthVal = '400'
            }
        }
    },
    directives: {
        drag(el,bindling) {
            let oDiv = el //当前元素
            oDiv.onmousedown = function(e) {
                e.preventDefault();
                let disX = e.clientX;
                console.log('disx:'+disX)
                document.onmousemove = function(e) {
                    e.preventDefault(); //移动时禁用默认事件
                    let l = e.clientX - disX;
                    console.log('l:'+l)
                    bindling.value.set(l) //将鼠标按下实时变动的值从自定义指令中传递出去
                };
                document.onmouseup = function(e) {
                    e.preventDefault();
                    document.onmousemove = null;
                    document.onmousedown = null;
                }
            }
        }
    },
    mounted() {
        this.$router.push('/recommend')
    },
    methods: {
        set(l) {
            this.dragVal = -l
            console.log('dragVal:'+this.dragVal)
        },
        setOldWidthVal() {
            this.oldWidthVal = this.widthVal
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
        display: flex;
        flex-direction:column;
    }

    #main {
        display: flex;
        height: 100%;
        flex: 1;
    }

    #main_line_control{
        display: inline-block;
        width: 11px;
        height: 100%;
        cursor: w-resize;
        z-index: 10;
        border-right: rgba(64, 60, 60, 0.16) 1px solid;
        margin-left: -12px;
    }
    #pagecontent{
        width: 100%;
        height: 100%;
    }
    #header{
        height: 63px;
        width: 100%;
    }
    #footer{
        height: 75px;
        width: 100%;
        border-top: 1px solid rgba(141, 139, 139, 0.507);
        z-index: 10;
    }
</style>