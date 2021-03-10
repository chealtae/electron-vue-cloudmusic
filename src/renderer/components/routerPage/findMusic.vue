<template>
    <div class="FindMusicContent">
        <div style="height:70px">
            <sub-menu></sub-menu>
        </div>
        <div style="flex:1; height:100%">
            <router-view></router-view>
        </div>
        
    </div>
</template>
<script>
import subMenu from '../Home/subMenu.vue'

export default {
    components: { 
      subMenu 
    },
    mounted() {
        this.$router.push('/recommend')
    }

    
}
</script>
<style >
    .FindMusicContent{
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>