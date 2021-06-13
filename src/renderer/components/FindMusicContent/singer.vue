<template>
    <div style="height:100% ; overflow:auto">
        <div v-infinite-scroll="load">
            <div style="margin:0px auto;width:90%">
                <span class="type_span">
                    语种:
                </span>
                <div>
                    <el-radio-group v-model="singertype" size="mini" @change="changetype">
                    <el-radio-button label="38">华语</el-radio-button>
                    <el-radio-button label="39">欧美</el-radio-button>
                    <el-radio-button label="40">日本</el-radio-button>
                    <el-radio-button label="41">韩国</el-radio-button>
                    <el-radio-button label="42">其他</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="collectList">
                <div class="recommend_list_box">
                    <span class="recommend_span" >歌手</span>
                </div>
                <div class="collect_playlist">
                    <div class="collect_playlist_item"  v-for="item in singerList" :key="item.id">
                        <div class="item_img">
                            <img :src="item.image" alt="" style="width:100% ; height:100%; border-radius:6px;object-fit: cover;">
                        </div>
                        <div class="item_span_1">{{item.name}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getImgSrc } from '../Common/getSrc'
export default {
    data() {
        return {
            singertype:'38', //这里对应的数字是数据库中 歌手对应的标签id
            singerList:[],
            count:0,
        }
    },
    mounted() {
        this.getSinger()
    },
    methods:{
        getSinger(){
            
            let info ={
                tagId:Number(this.singertype) ,
                offset:this.count
            }
            this.$axios.post(`/Singer/getSingerByTag`,info).then(res => {
                if(res.data.success){
                    let singers = res.data.singerList;
                    console.log(singers.length)
                    if(singers.length > 0){
                        singers.forEach(item => {
                        item.image = getImgSrc(item.image);
                        console.log(item)
                        this.singerList.push(item)
                    })
                }

                }
            })
        },
        load(){
            this.count += 20
            this.getSinger();
        },
        changetype(){
            this.singerList = [];
            this.getSinger();
        }
    }
}
</script>
<style  scoped>
    .type_span{
        float: left;
        font-size: 14px;
        line-height: 30px;
        margin-right: 10px;
    }
    .collectList{
        margin: 0px auto;
        width: 90%;
    }
    .collectSpan{
        font-size: 22px;
        font-weight: bolder;
        cursor:pointer;
    }
    .collect_playlist{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-bottom: 20px;
        margin-top: 13px;
    }
    .collect_playlist_item{
        width: 23%;
        max-width: 190px;
        margin-bottom: 20px;
        margin-right: 15px;
        cursor: pointer;
    }
    .item_img{
        border-radius: 8px;
        height: 181px;
        width: 181px;
        
    }
    .item_span_1{
        font-size: 14px;
        max-height: 43px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
        line-height: 23px;
    }
    .recommend_span {
        font-size: 22px;
        font-weight: bolder;
        cursor:pointer;
    }

    .recommend_list_box{
        margin-top: 20px;
    }
</style>