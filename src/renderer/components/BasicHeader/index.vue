<template>
    <div id="top_bar" style="-webkit-app-region: drag;">
        <div id="top-bar-logo">
            <img src="../../assets/img/logo1.svg" alt="" class="logoImg">
            <span class="playName">猪猪音乐</span>
        </div>
        <div id="top-bar-control">
            <img src="../../assets/img/goback.svg" title="后退" alt="" class="backItem" @click="goback">
        </div>
        <div id="top-bar-search">
             <el-input
                class="searchItem"
                placeholder="搜索"
                v-model="input1"
                @keyup.enter.native="search"
                style="margin-top: 10px; width: 165px;-webkit-app-region: no-drag; ">
                <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
            </el-input>
        </div>
        <div id="top_bar_meun">
            <div class="meun_item_1">
                <!-- <userInfo></userInfo> -->
                <img v-if="loginFlag ==='null'" src="../../assets/img/profilePhoto.svg" alt=""  style="float:left" @click="login">
                <img v-else :src="user.profile" alt="" class="profile_photo" @click="showUserInfo">
                <span v-if="loginFlag ==='null'" class="login_span"  @click="login">未登录</span>
                <span v-else class="login_span" @click="showDetails">{{user.username}}</span>
            </div>
            <div class="meun_item">
                <!-- <setting></setting> -->
                <!-- <i class="el-icon-setting icon_style" ></i> -->
            </div>
            <div class="meun_item">
                <!-- <theme-setting></theme-setting> -->
            </div>
            <div class="meun_item">
                <!-- <message></message> -->
                <!-- <i class="el-icon-message icon_style" @click="createMessageWin"></i> -->
            </div>
        </div>
        <div class="icon_Line_style"></div>
        <div id="top_bar_frameIcon">
            <frameIcon></frameIcon>
        </div>
    </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import frameIcon from './FrameIcon'
import {getImgSrc} from '../Common/getSrc'
import Bus from '../Common/bus'
export default {
    components: {
        frameIcon,
    },
    data() {
        return {
            loginFlag:localStorage.getItem('userId')||'null',
            user:{profile:'',userid:'',userType:'',username:''},
            input1:'',
        }
    },
    methods: {
        createMessageWin() {
            ipcRenderer.send('createMessage')
        },
        login() {
            ipcRenderer.send('createLogin')
        },
        getInfo(){
            this.$axios.get(`User/getUserInfo?userId=`+ this.loginFlag).then((res) => {
                if(res.data.success){
                    let info = res.data.userInfo
                    this.user.userType = info.userType;
                    this.user.profile = getImgSrc(info.image) ;
                    this.user.username = info.nickname?info.nickname:'用户'+info.id; 
                }
            })
        },
        showDetails() {
            Bus.$emit('userDetails',true)
        },
        showUserInfo() {
            this.$router.push({
                path:"/UserInfo",
                query:{
                    id:localStorage.getItem("userId")
                    // id:1,
                }
            })
        },
        goback(){
            //后退时需要获取当前的路由是否为首页，如果不是才可以后退
            if(this.$route.name !== "recommend") {
                this.$router.back();
            }
            
            
            console.log(this.$router.history.current)
            
        },
        search(){
            if(this.input1 != ''){
                this.$router.push({
                    path:"/searchResult",
                    query:{
                        input:this.input1,
                    }
                })
                Bus.$emit("search",this.input1)
            }
        }
    },
    mounted() {
        console.log(this.$route)
        console.log(this.loginFlag)
        this.getInfo()
        ipcRenderer.on('userLogin',() => {
            this.loginFlag = Number(localStorage.getItem('userId'))
            this.getInfo()
            //登录后也要触发刷新
        })
        Bus.$on("update",(state) => {
            this.getInfo();
        })
    }
}
</script>
<style scoped>
    #top_bar {
        background: rgba(133, 202, 211, 0.616);
        height: 63px;
        display: flex;
        
    }

    #top_bar_frameIcon {
        -webkit-app-region: no-drag;
        position: fixed;
        right: 13px;
        top: 19px;
    }

    #top_bar_meun {
        -webkit-app-region: no-drag;
        display: flex;
        justify-content:space-around;
        position: fixed;
        right: 174px;
        top: 19px;
    }

    .meun_item {
        width: 23px;
        height: 23px;
        cursor: pointer;
    }
    .meun_item_1{
        width: 100px;
        height: 23px;
    }

    .icon_style{
        font-size: 22px;
    }   

    .icon_Line_style {
        position: fixed;
        top: 21px;
        right: 154px;
        background-color: rgba(255, 255, 255, 0.29);
        display: inline-block;
        width: 1px;
        height: 1em;
        margin: 0 8px;
    }

    .profile_photo{
        cursor: pointer;
        border-radius: 50%;
        width: 23px;
        height: 23px;
        float: left;
    }
    .login_span{
        cursor: pointer;
        font-size: 14px;
        display: block;
        margin-top: 5px;
        margin-left: 30px;
        
    }
    .playName{
        font-size: 22px;
        color: white;
        line-height: 65px;
    }
    .logoImg{
        padding: 15px 11px 0px 20px;
        float: left;
    }
    .backItem{
        padding: 20px 11px 0px 20px;
        -webkit-app-region: no-drag;
    }
    .el-icon-search{
        color: white;
    }
    .searchItem>>>.el-input__inner{
        background:rgba(165, 166, 167, 0.41);
        border-radius: 28px;
    }
    /* .el-input__inner >>> ::-webkit-input-placeholder {
        color: #fff;
    } */
</style>