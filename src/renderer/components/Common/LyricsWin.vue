<template>
    <div class="lyricsContent">
        <div class="icons">
            <i class="el-icon-d-arrow-left icon_item" title="上一首" @click="lastMusic"></i>
            <i v-if="isplay === 'true'" class="el-icon-video-pause icon_item" title="暂停" @click="pauseMusic"></i>
            <i v-else class="el-icon-video-play icon_item" title="播放" @click="playMusic"></i>
            <i class="el-icon-d-arrow-right icon_item" title="下一首" @click="nextMusic"></i>
            <i class="el-icon-close icon_item" title="关闭" @click="closeWin"></i>
        </div>
        <div class="lyrics">
            <span class="lyrics_span">这里是歌词显示</span>
        </div>
        
        </div>
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
    data() {
        return {
            isplay:localStorage.getItem('isplay')
        }
    },
    mounted() {
        ipcRenderer.on('closeReply' ,() => {
            setTimeout(() => {
                console.log('qqqqqqqqqqqqqq')
            }, 2000);
			console.log('qqqqqqqqqqqqqq')
		})
    },
    methods: {
        closeWin() {
            ipcRenderer.send('closeLyrics')
        },
        lastMusic() {
            ipcRenderer.send('lastMusic')
            this.isplay = 'true';
        },
        playMusic() {
            ipcRenderer.send('playMusic')
            this.isplay = 'true';
        },
        pauseMusic() {
            ipcRenderer.send('pauseMusic')
            this.isplay = false
        },
        nextMusic() {
            ipcRenderer.send('nextMusic')
            this.isplay = 'true';
        }
    }
}
</script>
<style scoped>
.lyricsContent{
    background: transparent;
    
}
.lyricsContent:hover{
    background: rgba(128, 128, 128, 0.555);
    
}
.icons {
    width: 200px;
    display: flex;
    justify-content: space-around;
    margin: 10px auto ;
    margin-bottom: 0px;
}
.lyrics_span{
    font-size: 32px;
    color: white;
}
.icon_item{
    cursor: pointer;
    color: white;
    font-size: 16px;
}
.lyrics{
    -webkit-app-region: drag;
    cursor: move;
}
</style>