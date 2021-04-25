<template>
    <div>
        <div class="inputItem">
            <div>
                <span class="input_span">创建歌单</span>
            </div>
            <div>
                歌单名称：
                <el-input v-model="input" placeholder="请输入歌单名称" style="width: 50%;"></el-input>
            </div>
            <div>
                <el-button type="primary" @click="createList">确定</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { ipcRenderer } from 'electron';
export default {
    data() {
        return {
            input:'',
        }
    },
    methods:{
        createList(){
            let info = {
                userId : Number(localStorage.getItem('userId')),
                createListName : this.input,
            }
            this.$axios.post(`SongListInfo/createNewList`,info).then((res) => {
                if(res.data.success){
                    this.$message.success("创建成功");
                    ipcRenderer.send('createNewList');
                }
            }).catch((err) =>{
                this.$message.error("创建失败")
            })
        }
    }
}
</script>
<style scoped>
    .inputItem{
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 200px;
    }
    .input_span{
        font-size: 22px;

    }
</style>