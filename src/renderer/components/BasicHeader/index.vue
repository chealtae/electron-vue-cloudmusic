<template>
    <div id="top_bar" style="-webkit-app-region: drag;">
        <div id="top-bar-logo">
            1111
        </div>
        <div id="top-bar-control">
            1111
        </div>
        <div id="top-bar-search">
            111
        </div>
        <div id="top_bar_meun">
            <div class="meun_item">
                <!-- <userInfo></userInfo> -->
            </div>
            <div class="meun_item">
                <!-- <setting></setting> -->
                <i class="el-icon-setting icon_style" ></i>
            </div>
            <div class="meun_item">
                <!-- <theme-setting></theme-setting> -->
            </div>
            <div class="meun_item">
                <!-- <message></message> -->
                <i class="el-icon-message icon_style" @click="createMessageWin"></i>
            </div>
        </div>
        <div class="icon_Line_style"></div>
        <div id="top_bar_frameIcon">
            <frameIcon></frameIcon>
        </div>
    </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import frameIcon from './FrameIcon'
export default {
    components: {
        frameIcon,
    },
    methods: {
        createMessageWin() {
            ipcRenderer.send('createMessage')
        }
    }
}
</script>
<style>
    #top_bar {
        background: rgba(133, 202, 211, 0.616);
        height: 63px;
        display: flex;
        
    }

    #top_bar_frameIcon {
        -webkit-app-region: no-drag;
        position: fixed;
        right: 13px;
        top: 19px;
    }

    #top_bar_meun {
        -webkit-app-region: no-drag;
        display: flex;
        justify-content:space-around;
        position: fixed;
        right: 174px;
        top: 19px;
    }

    .meun_item {
        width: 23px;
        height: 23px;
        cursor: pointer;
    }

    .icon_style{
        font-size: 22px;
    }   

    .icon_Line_style {
        position: fixed;
        top: 21px;
        right: 154px;
        background-color: rgba(255, 255, 255, 0.29);
        display: inline-block;
        width: 1px;
        height: 1em;
        margin: 0 8px;
    }
</style>