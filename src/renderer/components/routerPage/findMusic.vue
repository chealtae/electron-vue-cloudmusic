<template>
    <div class="FindMusicContent">
        <sub-menu></sub-menu>
        <router-view></router-view>
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
    .subContent{
        height: 89%;
        width: 100%;
        overflow: scroll;
    }
</style>