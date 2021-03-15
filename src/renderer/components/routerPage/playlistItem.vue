<template>
    <div>
        <div class='introduce_header'>
            <div class="introduce_img">
                <img :src="playListDeatils.url" alt="" style="height:100%; width:100%">
            </div>
            <div class="introduce_content">
                <div class="title">
                    <div>
                        {{playListDeatils.type}}
                    </div>
                    <div class="playListName">
                        {{playListDeatils.name}}
                    </div>
                </div>
                <div class="author">
                    {{playListDeatils.author}} {{playListDeatils.createdTime}}
                </div>
                <div class="opreation"></div>
                <div class="label">
                    
                </div>
                <div class="playtimes">
                    <span>歌曲:{{playListDeatils.singNumber}} 播放:{{playListDeatils.playTimes}}</span>
                </div>
                <div class="introduction">

                </div>
            </div>
        </div>
        <div>

        </div>
        <div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            playListDeatils:{
                url:require("@/assets/img/img1.jpg"),
                type:'歌单',
                name:'「欧美」 慵懒的嗓音在你耳边问你现在睡吗',
                author: '周末回家睡懒觉',
                createdTime: '2017-07-13',
                singNumber:72,
                playTimes:'22万',
                introduce: '',
            },
            singList:[],
            comment:[],
        }
    }
}
</script>
<style scoped>
    .introduce_header{
        height: 180px;
        border: black 1px solid;
        margin-top: 30px;
        margin-left: 30px;
    }
    .introduce_img{
        width: 180px;
        height: 180px;
        float: left;
    }
    .introduce_content{
        float: left;
        width: 400px;
        height: 180px;
        border: solid black 1px;
    }
</style>