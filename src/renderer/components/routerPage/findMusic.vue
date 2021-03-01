<template>
    <div class="FindMusicContent">
        <sub-menu></sub-menu>
        发现音乐
        
        
    </div>
</template>
<script>
import subMenu from '../Home/subMenu.vue'

export default {
    components: { 
      subMenu 
    },

    
}
</script>
<style >
    .subContent{
        height: 89%;
        width: 100%;
        overflow: scroll;
    }
</style>