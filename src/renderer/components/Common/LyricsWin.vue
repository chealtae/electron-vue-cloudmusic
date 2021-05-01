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
            <div v-for="item in lrcArray" :key="item.id" style="text-align: center;">
                <span class="lyrics_span" v-show="item.id === currentLrc">{{item.c}}</span>
            </div>
        </div>
        </div>
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
    data() {
        return {
            isplay:localStorage.getItem('isplay'),
            lyric:'暂无歌词',
            lrcArray : [],//新建数组,用于存放歌词
            currentLrc: 0,
        }
    },
    mounted() {
        this.renderListener()
        this.getLyric();
        
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
            this.isplay = 'false'
        },
        nextMusic() {
            ipcRenderer.send('nextMusic')
            this.isplay = 'true';
        },
        renderListener() {
            ipcRenderer.on('currentlyrics' ,(event,arg) => {
                this.currentLrc = arg
            })
            ipcRenderer.on('playMusicfromHome' ,() => {
                this.isplay = 'true'
                console.log(localStorage.getItem('currentPlayId'))
            })
            ipcRenderer.on('pauseMusicfromHome' ,() => {
                this.isplay = 'false'
            })
            ipcRenderer.on('updateLyric' ,() => {
                this.getLyric();
            })
        },
        processLyrics() {
            this.lrcArray = [];
            let lrcGet = this.lyric;//提取歌词
            // console.log(lrcGet);
            let lrc = []
            // console.log(lrc);
            if(lrcGet){
                lrc = lrcGet.split('\\n');
                let i = 0
                lrc.forEach((item) => {
                    let timeStr = item.substring(item.indexOf('[')+1,item.indexOf(']'));//提取时间
                    let min = parseInt(timeStr.split(':')[0])*60;
                    let sec = parseFloat(timeStr.split(':')[1]);
                    let time = parseFloat((min + sec).toFixed(2));
                    this.lrcArray.push({
                        id: i++,
                        t: time,
                        c: item.substring(item.indexOf(']') + 1)
                    });
                })
                console.log(this.lrcArray)
            }
            
        },
        getLyric(){
            this.lyric = '';
            this.$axios.get(`/SongInfo/getSong?songId=`+Number(localStorage.getItem('currentPlayId'))).then((res) => {
		    	if(res.data.success){
		    		this.lyric = res.data.song.lyric;
                    this.processLyrics() //处理歌词
		    	}
		    })
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
    text-align: center;
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