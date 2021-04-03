<template>
    <div class="friendsCircle">
        <share-page style="width:100%"></share-page>
        <share-sider style=" width:350px"></share-sider>
    </div>
</template>
<script>
import SharePage from '../Common/SharePage.vue'
import ShareSider from '../Common/ShareSider.vue'
export default {
    components:{
        SharePage,
        ShareSider,
    }
}
</script>
<style scoped>
    .friendsCircle{
        height: 100%;
        overflow: auto;
        display: flex;
    }
</style>