<template>
    <div style="margin:0px 35px">
        
        <div class="comment_input">
            <el-input style="width:100%"
                type="textarea"
                :rows="2"
                placeholder="发表评论"
                prefix-icon="el-icon-search"
                maxlength="130"
                show-word-limit
                v-model="textarea">
            </el-input>
        </div>
        <div class="comment_button">
            <el-button style="float:right;margin-top:5px" size="mini" round @click="comment">评论</el-button>
        </div>
        <div class="comment">
            <span  v-if="commentType !== 3">精彩评论</span>
            <div class="topComment" v-for="item in commentItem" :key="item.id">
                    <img :src="item.image" alt="" class="author_img" style="cursor:pointer" @click="go2UserInfo(item.userId)">
                <div class="comment_content">
                    <span class="comment_span_nickname" @click="go2UserInfo(item.userId)">{{item.nickname}}:</span>
                    <span class="comment_span">{{item.content}}</span>
                    <div style="background-color:rgba(173, 173, 173, 0.37);;" v-if="item.parentId > 0">
                        <span class="comment_span_nickname" @click="go2UserInfo(item.comment.userId)">@{{item.comment.userinfo.nickname}}:</span>
                        <span class="comment_span">{{item.comment.content}}</span>
                    </div>
                    <div  class="operation_line" style="margin-top:5px">
                        <span  class="comment_span_1">{{item.commentData}}</span>
                        <div  style="float:right">
                            <span class="report_span" v-if="userId !== item.userId">举报</span>
                            <i class="el-icon-delete" v-else @click="deleteComment(item.id)"></i>
                            <el-divider direction="vertical"></el-divider>
                            <img v-if="!item.isLike" class="good_icon" src="../../assets/img/good.svg" alt="" @click="like(item)">
                            <img v-else class="good_icon" src="../../assets/img/good2.svg" alt="" @click="cancelLike(item)">
                            <span style="cursor: pointer; font-size:14px">{{item.totalLike}}</span>
                            <el-divider direction="vertical"></el-divider>
                            <i class="el-icon-chat-line-round" @click="showDalog(item.id)"></i>
                            <el-divider direction="vertical"></el-divider>
                            <i class="el-icon-share"></i>
                        </div> 
                    </div>
                </div>
                
            </div>
            
        </div>
        <div style="width:210px;margin:10px auto" v-if="commentType !== 3">
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :current-page.sync="currentPage1"
                 @current-change="getComment"
                :total="commentNumber">
            </el-pagination>
        </div>
        <el-dialog
            title="回复该评论"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-input style="width:100%"
                type="textarea"
                :rows="2"
                placeholder="发表评论"
                prefix-icon="el-icon-search"
                maxlength="130"
                show-word-limit
                v-model="replyContent">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="reply">评 论</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {getImgSrc} from '../Common/getSrc'
export default {
    props:['commentItemId','commentType','commentNumber'],
    data() {
        return {
            textarea:'',
            commentItem:[],
            dialogVisible: false,
            replyContent:'',
            parentId:'',//父级评论id
            currentPage1:1,
            pageSize:15,
            userId:Number(localStorage.getItem("userId")) || -1
        }
    },
    mounted() {
        console.log(this.commentItemId)
        if(this.commentItemId){
            this.getComment()
        }

    },
    methods: {
        getComment(){
            let info = {}
            info.typeId =Number(this.commentItemId) ;
            info.type = this.commentType;
            info.size = this.pageSize;
            info.currentPage = this.currentPage1;
            info.userId = this.userId;
            this.$axios.post(`/Comment/getComment`,info).then((res) => {
                if(res.data.success){
                    this.commentItem = res.data.comment
                    this.commentItem.map((item) => {
                        item.nickname = item.userinfo.nickname;
                        item.image = getImgSrc(item.userinfo.image) 
                        return item;
                    })
                    console.log(this.commentItem)
                }
            })
        },
        comment(){
            if(this.textarea !== '' ){
                let info = {}
                info.typeId = Number(this.commentItemId);
                info.userId = Number(localStorage.getItem('userId'));
                info.type = this.commentType;
                info.content = this.textarea;
                this.$axios.post(`/Comment/addComment`,info).then((res) => {
                    if(res.data.success){
                        this.$message.success('评论成功')
                        this.textarea = ''
                        this.getComment()//更新视图
                    }
                }).catch((err) => {
                    this.$message.error('评论失败')
                })
            }
        },
        handleClose(){
            this.dialogVisible = false;
        },
        showDalog(id){
            this.dialogVisible = true;
            this.parentId = id 
            console.log(this.parentId ,id)
        },
        reply(){
            if(this.replyContent !== ''){
                let info = {}
                info.typeId = Number(this.commentItemId);
                info.userId = Number(localStorage.getItem('userId'));
                info.type = this.commentType;
                info.content = this.replyContent;
                info.parentId = this.parentId;
                this.$axios.post(`/Comment/replyComment`,info).then((res) => {
                    if(res.data.success){
                        this.$message.success('回复成功');
                        this.dialogVisible = false;
                        this.getComment();
                    }
                }).catch((err) => {
                    this.$message.error('回复失败');
                    this.dialogVisible = false;
                })
            }
            
        },
        deleteComment(id){
            this.$axios.get(`/Comment/deleteComment?id=`+id).then((res) => {
                if(res.data.success){
                    this.$message.success('删除成功');
                    this.getComment();
                }
            }).catch((err) => {
                this.$message.error('删除失败');
            })
        },
        likeThis(id) {
            this.$axios.get(``).then((res) => {
                if(res.data.success){
                    
                }
            })
        },
        go2UserInfo(id){
            this.$router.push({
                path:"/UserInfo",
                query:{
                    id:id,
                }
            })
        },
        cancelLike(item){
            let info = {
                userId:this.userId,
                typeId :item.id,
                collectType : 5
            }
            this.$axios.post(`/Operation/cancelLike`,info).then(res => {
                if(res.data.success){
                    item.isLike = !item.isLike;
                    item.totalLike --;
                }
            })
        },
        like(item){
            let info = {
                userId:this.userId,
                typeId :item.id,
                collectType : 5
            }
            this.$axios.post(`/Operation/like`,info).then(res => {
                if(res.data.success){
                    item.isLike = !item.isLike;
                    item.totalLike ++
                }
            })
        },

    }
}
</script>
<style scoped>
    .author_img{
        height: 35px;
        width: 35px;
        border-radius: 50%;
        float: left;
    }
    .comment_button{
        height: 40px;
    }

    .comment_content{
        margin-left: 55px;
        margin-bottom: 10px;
    }
    .comment_span{
        font-size: 12px;
    }
    .comment_span_1{
        font-size: 12px;
        color:rgba(115, 115, 115, 0.74);
    }
    .comment_span_nickname{
        color: rgba(127, 189, 230, 0.787);
        cursor: pointer;
    }
    .el-icon-chat-line-round{
        font-size: 14px;
        cursor: pointer;
    }
    .el-icon-share{
        font-size: 14px;
        cursor: pointer;
    }
    .el-icon-delete{
        font-size: 14px;
        cursor: pointer;
    }
    .good_icon{
        cursor: pointer;
    }
    .operation_line .report_span{
        display: none;
        font-size: 14px;
        cursor: pointer;
    }
    .operation_line:hover .report_span{
        display: inline;
    }
    .topComment{
        min-height: 45px;
    }
</style>