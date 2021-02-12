<template>
    <div class="basic_layout" style="-webkit-app-region: drag;">
        <basicHeader></basicHeader>
        <div>
            {{message}}
        </div>
    </div>
</template>
<script>
import basicHeader from '../BasicHeader/index'
export default {
    components:{
        basicHeader,
    },
    computed: {
        message() {
            return "欢迎来到首页"
        }
    }
}
</script>
<style>
.basic_layout{
    width: 100%;
    height: 100%;
}
</style>