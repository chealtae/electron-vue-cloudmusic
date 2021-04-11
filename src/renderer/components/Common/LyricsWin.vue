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
            lyric:"[00:04.538]作词：陈家丽\n[00:06.547]作曲：Jean-Michel Ou\n[00:08.555]编曲：田宸光\n[00:10.063]录音：傲七爷\n[00:11.567]和声：傲七爷/王淑霖\n[00:13.324]混音：任天宇\n[00:15.082]制作人：李永江\n[00:16.587]监制：刘家泽/李永江\n[00:18.093]\n[00:23.718]拨开天空的乌云\n[00:27.732]像蓝丝绒一样美丽\n[00:31.747]我为你翻山越岭\n[00:35.509]却无心看风景\n[00:38.769]我想你身不由己\n[00:43.584]每个念头有新的梦境\n[00:46.847]但愿你没忘记\n[00:51.114]我永远保护你\n[00:53.624]不管风雨的打击全心全意\n[00:59.644]两个人相互辉映\n[01:03.658]光芒胜过夜晚繁星\n[01:07.673]我为你翻山越岭\n[01:11.436]却无心看风景\n[01:14.700]我想你鼓足勇气\n[01:19.468]凭爱情地图散播讯息\n[01:22.729]但愿你没忘记\n[01:26.995]我永远保护你\n[01:29.507]从此不必再流浪找寻\n[01:34.528]爱就一个字\n[01:36.537]我只说一次\n[01:38.796]你知道我只会用行动表示\n[01:42.561]烟花太放肆\n[01:44.566]守住了坚持\n[01:47.578]看我为你孤注一掷\n[01:50.340]爱就一个字\n[01:52.601]我只说一次\n[01:54.610]恐怕听见的人勾起了相思\n[01:58.372]热闹的城市\n[02:00.382]搜索你的影子\n[02:03.396]让你幸福我愿意试\n[02:23.711]两个人相互辉映\n[02:27.478]光芒胜过夜晚繁星\n[02:31.496]我为你翻山越岭\n[02:35.258]却无心看风景\n[02:38.520]我想你鼓足勇气\n[02:43.542]凭爱情地图散播讯息\n[02:46.554]但愿你没忘记\n[02:51.073]我永远保护你\n[02:53.584]从此不必再流浪找寻\n[02:58.352]爱就一个字\n[03:00.610]我只说一次\n[03:02.868]你知道我只会用行动表示\n[03:06.635]烟花太放肆\n[03:08.391]守住了坚持\n[03:11.405]看我为你孤注一掷\n[03:14.417]爱就一个字\n[03:16.675]我只说一次\n[03:18.682]恐怕听见的人勾起了相思\n[03:22.449]热闹的城市\n[03:24.455]搜索你的影子\n[03:27.468]让你幸福我愿意试\n[03:32.738]爱就一个字\n[03:34.491]我只说一次\n[03:36.501]你知道我只会用行动表示\n[03:40.515]烟花太放肆\n[03:42.524]守住了坚持\n[03:45.537]看我为你孤注一掷\n[03:48.512]爱就一个字\n[03:50.520]我只说一次\n[03:52.781]恐怕听见的人勾起了相思\n[03:56.543]热闹的城市\n[03:58.550]搜索你的影子\n[04:01.564]让你幸福是我一生在乎的事\n",
            lrcArray : [],//新建数组,用于存放歌词
            currentLrc: 0,
        }
    },
    mounted() {
        this.renderListener()
        this.processLyrics()
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
        },
        renderListener() {
            ipcRenderer.on('currentlyrics' ,(event,arg) => {
                this.currentLrc = arg
            })
            ipcRenderer.on('playMusicfromHome' ,() => {
                console.log('2222222222222')
                this.isplay = 'false'
            })
            ipcRenderer.on('pauseMusicfromHome' ,(event,arg) => {
                console.log('1111111111111111')
                this.isplay = 'true'
            })
        },
        processLyrics() {
            let lrcGet = this.lyric;//提取歌词
            // console.log(lrcGet);
            let lrc = lrcGet.split('\n');
            // console.log(lrc);
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