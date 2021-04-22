<template>
    <div id="top_bar" style="-webkit-app-region: drag;">
        <div id="top-bar-logo">
            1111
        </div>
        <div id="top-bar-control">
            1111
        </div>
        <div id="top-bar-search">
            111
        </div>
        <div id="top_bar_meun">
            <div class="meun_item_1">
                <!-- <userInfo></userInfo> -->
                <img v-if="loginFlag ==='null'" src="../../assets/img/profilePhoto.svg" alt=""  style="float:left" @click="login">
                <img v-else :src="user.profile" alt="" class="profile_photo">
                <span v-if="loginFlag ==='null'" class="login_span"  @click="login">未登录</span>
                <span v-else class="login_span" @click="showDetails">{{user.username}}</span>
            </div>
            <div class="meun_item">
                <!-- <setting></setting> -->
                <i class="el-icon-setting icon_style" ></i>
            </div>
            <div class="meun_item">
                <!-- <theme-setting></theme-setting> -->
            </div>
            <div class="meun_item">
                <!-- <message></message> -->
                <i class="el-icon-message icon_style" @click="createMessageWin"></i>
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
            user:{profile:'',userid:'',userType:'',username:''}
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
        }
    },
    mounted() {
        console.log(this.loginFlag)
        this.getInfo()
        ipcRenderer.on('userLogin',() => {
            this.loginFlag = Number(localStorage.getItem('userId'))
            this.getInfo()
            //登录后也要触发刷新
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
</style>