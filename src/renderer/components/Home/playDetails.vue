<template>
    <div class="lyricsContainer">
        <div class="lyricsDetails">
            <div class="playAction">
                <div class="songImg" :style="{'animation-play-state':`${playState}`}">
                    <img src="../../assets/img/song.png" alt="" class="itemborder">
                    <img src="../../assets/img/img1.jpg" alt="" class="itemcenter">
                </div>
                <div class="operaIcons">
                    <img v-show="isCollect" src="../../assets/img/heart.svg" alt="" class="icons">
                    <img v-show="!isCollect" src="../../assets/img/heart1.svg" alt="" class="icons">
                    <i class="el-icon-folder-add icons" ></i>
                    <i class="el-icon-edit-outline icons"></i>
                </div>
            </div>
            <div class="lyricsItem">
                <div class="songName">
                    <span class="songName_span">{{song.name}}</span>
                </div>
                <div class="songInfo">
                    <span class="songInfo_span">专辑:{{song.album}}</span>
                    <span class="songInfo_span">歌手:{{song.singer}}</span>
                </div>
                <div class="lrcScroll">
                    <div v-for="lrc in lrcArray" :key="lrc.id">
                        <span class="lrcspan" v-if="lrc.id === currentLrc">{{lrc.c}}</span>
                        <span class="lrcspan_1" v-else >{{lrc.c}}</span>
                    </div>
                </div>
            </div>
            <div>
                <img src="../../assets/img/mini.svg" alt="" title="收起音乐详情页" class="miniIcon" @click="go2back">
            </div>
            
        </div>
        <div style="width:1000px;margin:0 auto;margin-top:20px">
            <comment></comment>
        </div>
    </div>
    
    
</template>
<script>
import Bus from '../Common/bus'
import Comment from '../Common/Comment.vue'
export default {
  components: { Comment },
    data() {
        return {
            playState:'paused',//paused or running
            isCollect:false,
            lrcArray : [],//新建数组,用于存放歌词
            currentLrc: 0,
            song:{},
        }
    },
    mounted() {
        this.busListener()
        this.processLyrics()
    },
    methods: {
        go2back() {
            this.$emit('isShowDetails',false)
        },
        busListener() {
            Bus.$on('playState', (state) =>{
                console.log(this.playState , state ,111111111)
                this.playState = state ? 'running' :'paused'
            });
            Bus.$on('playMusic', (state) =>{
                this.playState = 'running';
            });
            Bus.$on('pauseMusic', (state) =>{
                this.playState ='paused'
            });
            Bus.$on('nextMusic', (state) =>{
                
            });
            Bus.$on('lastMusic', (state) =>{
                
            });
            Bus.$on('lrcId',(state) => {
                this.currentLrc = state
            })
            Bus.$on('songInfo',(state) => {
                this.song.name = state.name;
                this.song.singer = state.singer;
                this.song.isCollect = state.isCollect;
                this.song.lyric = state.lyric; 
                this.song.album = state.album;
                
                this.processLyrics();
            })
        },
        processLyrics() {
            this.lrcArray = []
            let lrcGet = this.song.lyric;//提取歌词 
            let lrc
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
        }
    }
}
</script>
<style scoped>
    .lyricsContainer{
        overflow: auto;
        height: 100%;
        width: 100%;
        position: relative;
        margin: 0 auto;
        
    }
    .lyricsDetails{
        display: flex;
        width: 1000px;
        margin: 0 auto;
    }
    .playAction{
        margin-top: 30px;
        width:  500px;
        display: flex;
        flex-direction: column;
    }
    .lyricsItem{
        width: 400px;
    }
    .lrcScroll{
        height: 300px;
        overflow: scroll;
    }
    .miniIcon{
        cursor: pointer;
        position: sticky;
        top: 5px;
    }
    .itemborder{
        width: 300px;
        height: 300px;
        border-radius: 50%;
    }
    .songImg{
        position: relative;
        margin: 0 auto;
        width: 300px;
        height: 300px;
        animation: imgRotate 16s linear infinite;
    }
    @keyframes imgRotate{
        50%  { transform: rotate(180deg);}
        100% { transform: rotate(360deg);}
    }
    .itemcenter{
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        top: 50px;
        left: 50px;
    }
    .operaIcons{
        display: flex;
        justify-content: space-around;
        width: 200px;
        margin: 0 auto;
        margin-top: 30px;
    }
    .icons{
        cursor: pointer;
        width: 24px;
        height: 24px;
        font-size: 24px;
    }
    .lrcspan{
        color: black;
        font-size: 16px;
        font-weight: bold;
    }
    .lrcspan_1{
        color: rgba(122, 120, 120, 0.856);
        font-size: 16px;
    }
    .songName{
        margin-top: 30px;
    }
    .songName_span{
        font-size: 24px;
        font-weight: bold;
    }
    .songInfo_span{
        font-size: 12px;
        line-height: 34px;
    }
</style>