<template>
    <div id="icon_list">
        <div class="icon_item">
            <i class="el-icon-set-up icon_style" @click="setMiniWin"></i>
        </div>
        <div class="icon_item">
            <i class="el-icon-minus icon_style" @click="setMinWin"></i>
        </div>
        <div class="icon_item" v-show="!isMax" @click="setMaxWin">
            <div id="maxIcon"></div>
        </div>
        <div class="icon_item" v-show="isMax" @click="resetWin">
            <i class="el-icon-copy-document icon_style"></i>
        </div>
        <div class="icon_item">
            <i class="el-icon-close icon_style" @click="closeWin"></i>
        </div>
    </div>
</template>
<script>
import {ipcRenderer} from 'electron'
export default {
    data() {
        return {
            isMax: false,
        }
    },
    methods:{
        setMiniWin() {
            ipcRenderer.send('Window_mini')
        },
        setMaxWin() {
            ipcRenderer.send('Window_max')
            this.isMax = true
        },
        resetWin() {
            ipcRenderer.send('resetWin') //恢复上一次窗口大小
            this.isMax = false
        },
        setMinWin() {
            ipcRenderer.send('Window_min')
        },
        closeWin() {
            ipcRenderer.send('close_Win')
            console.log('消息发送成功')
        }
    }
}
</script>
<style >
#icon_list{
    display: flex;
    justify-content: space-around;
    width: 150px;
}

#maxIcon{
    border: 1px black solid;
    width: 13px;
    height: 13px;
    border-radius: 2px;
    cursor: pointer;
    margin: 3px auto;
}

.icon_item{
    width: 23px;
    height: 23px;
    cursor: pointer;
}

.icon_style{
    font-size: 22px;
}
</style>