<template>
    <div class="basic_layout">
        <basicHeader></basicHeader>
        <div>
            {{message}}
        </div>
        <div>
            {{message}}
        </div>
        <div>
            {{message}}
        </div>
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

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .basic_layout{
        height: 100vh;
        width: 100vw;
    }
</style>