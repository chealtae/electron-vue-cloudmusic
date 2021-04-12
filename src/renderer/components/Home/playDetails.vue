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
                    <span class="songName_span">{{song.songName}}</span>
                </div>
                <div class="songInfo">
                    <span class="songInfo_span">专辑:{{song.edition}}</span>
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
            lyric:"[00:04.538]作词：陈家丽\n[00:06.547]作曲：Jean-Michel Ou\n[00:08.555]编曲：田宸光\n[00:10.063]录音：傲七爷\n[00:11.567]和声：傲七爷/王淑霖\n[00:13.324]混音：任天宇\n[00:15.082]制作人：李永江\n[00:16.587]监制：刘家泽/李永江\n[00:18.093]\n[00:23.718]拨开天空的乌云\n[00:27.732]像蓝丝绒一样美丽\n[00:31.747]我为你翻山越岭\n[00:35.509]却无心看风景\n[00:38.769]我想你身不由己\n[00:43.584]每个念头有新的梦境\n[00:46.847]但愿你没忘记\n[00:51.114]我永远保护你\n[00:53.624]不管风雨的打击全心全意\n[00:59.644]两个人相互辉映\n[01:03.658]光芒胜过夜晚繁星\n[01:07.673]我为你翻山越岭\n[01:11.436]却无心看风景\n[01:14.700]我想你鼓足勇气\n[01:19.468]凭爱情地图散播讯息\n[01:22.729]但愿你没忘记\n[01:26.995]我永远保护你\n[01:29.507]从此不必再流浪找寻\n[01:34.528]爱就一个字\n[01:36.537]我只说一次\n[01:38.796]你知道我只会用行动表示\n[01:42.561]烟花太放肆\n[01:44.566]守住了坚持\n[01:47.578]看我为你孤注一掷\n[01:50.340]爱就一个字\n[01:52.601]我只说一次\n[01:54.610]恐怕听见的人勾起了相思\n[01:58.372]热闹的城市\n[02:00.382]搜索你的影子\n[02:03.396]让你幸福我愿意试\n[02:23.711]两个人相互辉映\n[02:27.478]光芒胜过夜晚繁星\n[02:31.496]我为你翻山越岭\n[02:35.258]却无心看风景\n[02:38.520]我想你鼓足勇气\n[02:43.542]凭爱情地图散播讯息\n[02:46.554]但愿你没忘记\n[02:51.073]我永远保护你\n[02:53.584]从此不必再流浪找寻\n[02:58.352]爱就一个字\n[03:00.610]我只说一次\n[03:02.868]你知道我只会用行动表示\n[03:06.635]烟花太放肆\n[03:08.391]守住了坚持\n[03:11.405]看我为你孤注一掷\n[03:14.417]爱就一个字\n[03:16.675]我只说一次\n[03:18.682]恐怕听见的人勾起了相思\n[03:22.449]热闹的城市\n[03:24.455]搜索你的影子\n[03:27.468]让你幸福我愿意试\n[03:32.738]爱就一个字\n[03:34.491]我只说一次\n[03:36.501]你知道我只会用行动表示\n[03:40.515]烟花太放肆\n[03:42.524]守住了坚持\n[03:45.537]看我为你孤注一掷\n[03:48.512]爱就一个字\n[03:50.520]我只说一次\n[03:52.781]恐怕听见的人勾起了相思\n[03:56.543]热闹的城市\n[03:58.550]搜索你的影子\n[04:01.564]让你幸福是我一生在乎的事\n",
            lrcArray : [],//新建数组,用于存放歌词
            currentLrc: 0,
            song:{songName:'',singer:'',isCollect:false,lyric:'',edition:''},
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
                this.song.songName = state.songName;
                this.song.singer = state.singer;
                this.song.isCollect = state.singer;
                this.song.lyric = state.lyric; 
                this.song.edition = state.edition;
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