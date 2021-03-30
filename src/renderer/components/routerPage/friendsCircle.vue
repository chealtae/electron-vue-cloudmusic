<template>
    <div class="friendsCircle">
        <share-page></share-page>
    </div>
</template>
<script>
import SharePage from '../Common/SharePage.vue'
export default {
    components:{
        SharePage,
    }
}
</script>
<style scoped>
    .friendsCircle{
        height: 100%;
        overflow: auto;
    }
</style>