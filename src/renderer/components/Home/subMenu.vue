<template>
    <div id="subMenu">
        <div :class="recommendStatus ? 'submenu_item_click':'submenu_item'" @click="recommendClick">
            <span :class="recommendStatus ? 'submenu_span_click':'submenu_span'">个性推荐</span>
            <div :class="recommendStatus ? 'menuLine':''"></div>
        </div>
        <div :class="playListStatus ? 'submenu_item_click':'submenu_item'" @click="playListClick">
            <span :class="playListStatus ? 'submenu_span_click':'submenu_span'">歌单</span>
            <div :class="playListStatus ? 'menuLine':''"></div>
        </div>
        <div :class="radioStatus ? 'submenu_item_click':'submenu_item'" @click="radioClick">
            <span :class="radioStatus ? 'submenu_span_click':'submenu_span'">主播电台</span>
            <div :class="radioStatus ? 'menuLine':''"></div>
        </div>
        <div :class="rankStatus ? 'submenu_item_click':'submenu_item'" @click="rankClick">
            <span :class="rankStatus ? 'submenu_span_click':'submenu_span'">排行榜</span>
            <div :class="rankStatus ? 'menuLine':''"></div>
        </div>
        <div :class="singerStatus ? 'submenu_item_click':'submenu_item'" @click="singerClick">
            <span :class="singerStatus ? 'submenu_span_click':'submenu_span'">歌手</span>
            <div :class="singerStatus ? 'menuLine':''"></div>
        </div>
        <div :class="lastestMusicStatus ? 'submenu_item_click':'submenu_item'" @click="lastestMusicClick">
            <span :class="lastestMusicStatus ? 'submenu_span_click':'submenu_span'">最新音乐</span>
            <div :class="lastestMusicStatus ? 'menuLine':''"></div>
        </div>
    </div>
</template>
<script>
import { mapGetters ,mapActions } from 'vuex';
export default {
    data() {
        return{
            recommendStatus: true,
            playListStatus: false,
            radioStatus: false,
            rankStatus: false,
            singerStatus: false,
            lastestMusicStatus: false,
            // isActived: 'recommend'
        }
    },
    methods: {
        ...mapActions(['setActived']),
        changeStatus(){
            if(this.isActived === 'recommend'){
                this.recommendStatus = true ;
                this.playListStatus = false ;
                this.radioStatus = false ;
                this.rankStatus = false ;
                this.singerStatus = false ;
                this.lastestMusicStatus = false ;
            } else if(this.isActived === 'playList'){
                this.recommendStatus = false ;
                this.playListStatus = true ;
                this.radioStatus = false ;
                this.rankStatus = false ;
                this.singerStatus = false ;
                this.lastestMusicStatus = false ;
            } else if(this.isActived === 'radio'){
                this.recommendStatus = false ;
                this.playListStatus = false ;
                this.radioStatus = true ;
                this.rankStatus = false ;
                this.singerStatus = false ;
                this.lastestMusicStatus = false ;
            } else if(this.isActived === 'rank'){
                this.recommendStatus = false ;
                this.playListStatus = false ;
                this.radioStatus = false ;
                this.rankStatus = true ;
                this.singerStatus = false ;
                this.lastestMusicStatus = false ;
            } else if(this.isActived === 'singer'){
                this.recommendStatus = false ;
                this.playListStatus = false ;
                this.radioStatus = false ;
                this.rankStatus = false ;
                this.singerStatus = true ;
                this.lastestMusicStatus = false ;
            } else if(this.isActived === 'lastestMusic'){
                this.recommendStatus = false ;
                this.playListStatus = false ;
                this.radioStatus = false ;
                this.rankStatus = false ;
                this.singerStatus = false ;
                this.lastestMusicStatus = true ;
            }
        },
        recommendClick(){
            this.setActived('recommend')
            // this.isActived = 'recommend';
            console.log(this.isActived)
            this.changeStatus();
            this.$router.push('/recommend')
        },
        playListClick() {
            this.setActived('playList')
            console.log(this.isActived)
            // this.isActived = 'playList'
            this.changeStatus();
            this.$router.push('/playList')
        },
        radioClick() {
            this.isActived = 'radio'
            this.changeStatus()
            this.$router.push('/radio')
        },
        rankClick() {
            this.isActived = 'rank'
            this.changeStatus()
            this.$router.push('/rank')
        },
        singerClick() {
            this.isActived = 'singer'
            this.changeStatus() 
            this.$router.push('/singer')
        },
        lastestMusicClick() {
            this.isActived = 'lastestMusic'
            this.changeStatus();
            this.$router.push('/lastestMusic')
        }
    },
    computed:{
        ...mapGetters(['isActived'])
    }
}
</script>
<style >
    #subMenu{
        display: flex;
        justify-content: space-around;
        width: 488px;
        margin-left: 20px;
    }
    .submenu_item{
        height: 60px;
        cursor: pointer;
    }
    .submenu_item_click{
        height: 60px;
        cursor: pointer;
    }
    .submenu_span{
        display: block;
        margin-top: 22px;
    }
    .submenu_span_click{
        display: block;
        margin-top: 19px;
        font-size: 22px;
        font-weight: bold;
    }
    .menuLine{
        height: 3px;
        width: 76%;
        background-color: rgba(133, 202, 211, 0.616);
        margin: 0 auto;
        border-radius: 5px;
    }

</style>