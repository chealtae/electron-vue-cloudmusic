<template>
    <div class="basic_layout">
        <div id="header">
            <basicHeader></basicHeader>
        </div>
        <div id="main">
            <div id="main_aside" :style="shrinkStyle">
                侧边栏
            </div>
            <div id="main_line_control"  v-drag='{set:set}' @mouseup="setOldWidthVal">
            </div>
            <div id="main_content">
                主页内容
            </div>
        </div>
        <div id="footer">
            播放器
            <play-bar></play-bar>
        </div>
        
    </div>
</template>
<script>

import basicHeader from '../BasicHeader/index'
import PlayBar from '../PlayBar/playBar.vue'
export default {
    components:{
        basicHeader,
        PlayBar,
        
    },
    data() {
        return {
            minAsideWidth: '200', 
            widthVal: '200',//存放要缩放元素实时变动值
            oldWidthVal: '200', //存放触发按下鼠标时的元素宽度
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
            if(this.widthVal < 200) {
                this.widthVal = '200'
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
    }

    #main {
        display: flex;
        height: 80%;
    }

    #main_line_control{
        background-color: rgba(64, 60, 60, 0.16);
        display: inline-block;
        width: 1px;
        height: 100%;
        cursor: w-resize;
        margin:0px 1px;
        
    }
</style>