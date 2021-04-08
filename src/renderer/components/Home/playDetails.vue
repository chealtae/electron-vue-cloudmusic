<template>
    <div>
        歌曲详情
        <div @click="go2back" style="background:red ; height:200px">333333333333333</div>
        <button @click="go2back"></button>
    </div>
</template>
<script>

export default {

    methods: {
        go2back() {
            console.log('222222222222222222')
            this.$emit('isShowDetails',false)
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


</style>