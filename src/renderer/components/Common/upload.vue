<template>
    <div>
        <div style="text-align:center;margin-bottom:10px">
            <span>分享动态</span>
        </div>
        <div v-if="!selectMusic">
            <div>
                <el-input
                type="textarea"
                placeholder="一起聊聊音乐吧~"
                v-model="textarea"
                maxlength="130"
                show-word-limit
                :rows="5"
                >
                </el-input>
            </div>
            <div class="musicItem" @click="selectSearch" v-if="!shareWithSong">
                <img src="../../assets/img/addMusic.jpg" alt="" class="addMusic">
                <span class="item_span">给动态配上音乐</span>
            </div>
            <div class="musicItem" @click="selectSearch"  v-else>
                <img src="../../assets/img/addMusic.jpg" alt="" class="addMusic">
                <span class="item_span">单曲:{{shareMusicItem.name}}-{{shareMusicItem.singer}}</span>
            </div>
            <div style="margin-bottom: 10px;" v-if="showupload">
                <el-upload
                    :limit="3"
                    action="http://localhost:8888/Share/uploadImg"
                    list-type="picture-card"
                    :on-success="handleAvatarSuccess"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">最多只能上传3张图片</div>
                </el-upload>
            </div>
            <div>
                <el-button type="primary" round icon="el-icon-plus" size="mini" style="float:right" @click="share">分享</el-button>
                <el-button type="primary" v-if="!showupload" round  size="mini" style="float:right;margin-right: 10px;" @click="uploadImg">上传图片</el-button>
                <el-button type="primary" v-else round  size="mini" style="float:right;margin-right: 10px;" @click="uploadImg">取消图片</el-button>
            </div>
        </div>
        <div v-else style="text-align:center">
            <div>
                <el-input
                v-model="state"
                >
                 <el-button slot="append" icon="el-icon-search" @click="handleSelect"></el-button>
            </el-input>
            </div>
            <div style="text-align:left" v-if="!searchMusic">
                <span >最近播放:</span>
                <div v-for="item in songList.slice(0,5)" :key="item.id" class="song_item" @click="selectShareSong(item)">
                    <span class="song_span">{{item.name}}-</span>
                    <span class="song_span">{{item.singer}}</span>
                </div>
            </div>
            <div style="text-align:left" v-if="searchMusic">
                <span >搜索结果:</span>
                <div v-for="item in songList.slice(0,5)" :key="item.id" class="song_item" @click="selectShareSong(item)">
                    <span class="song_span">{{item.name}}-</span>
                    <span class="song_span">{{item.singer}}</span>
                </div>
            </div>
            <el-button type="primary" round icon="el-icon-plus" size="mini" style="margin:10px auto" @click="selectMusic = false">返回</el-button>
        </div>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            textarea:'',
            fileList:[],
            showupload:false,
            selectMusic:false,
            restaurants: [],
            state: '',
            songList:JSON.parse(localStorage.getItem('playlist')),
            shareMusicItem:'',
            shareWithSong:false,
            searchMusic:false,
            uploadList:[],
        }
    },
    mounted(){
        
    },
    methods:{
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleAvatarSuccess(res, file,fileList) {
           this.uploadList.push(res.filename)
            console.log(res)
        },
        uploadImg(){
            this.showupload = !this.showupload;
            this.fileList = [];
        },
        selectSearch(){
            this.selectMusic = true;
        },
        handleSelect(){
            console.log('222222222222222222')
            if(this.state !== ''){
                this.searchMusic = true;
                //搜索请求  处理结果
            } else {
                this.searchMusic = false;
            }
        },
        selectShareSong(item){
            this.shareMusicItem = item;
            console.log(this.shareMusicItem);
            this.selectMusic = false;
            this.shareWithSong = true;
        },
        share(){
            let info = {}
            info.userId = Number(localStorage.getItem("userId"));
            info.content = this.textarea;
            info.musicId = this.shareMusicItem.id||0; //musicid为0 时默认为不带音乐 
            info.uploadList = this.uploadList
            this.$axios.post(`/Share/addShare`,info).then(res => {
                if(res.data.success){
                    this.$message.success('发布成功')
                    this.$emit('closeMessage',false)
                }
            }).catch(err => {
                this.$message.error("发布失败")
            })
        },
        
    }
}
</script>
<style scoped>
    .musicItem{
        border: #e4e4e4 1px solid;
        height: 50px;
        cursor: pointer;
        margin-bottom: 10px;
    }
    .addMusic{
        height: 30px;
        width: 30px;
        border-radius: 4px;
        margin:10px;
        float: left;
    }
    .item_span{
        line-height: 50px;
        font-size: 14px;
        
    }
    .el-textarea__inner{
        height: 120px;
    }
    .song_span{
        line-height: 25px;
        cursor: pointer;
    }
    .song_item:hover{
        background-color: rgba(192, 192, 192, 0.753);
    }
</style>