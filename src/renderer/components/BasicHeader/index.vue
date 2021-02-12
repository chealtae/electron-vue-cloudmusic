<template>
    <div id="top_bar">
        <div id="top-bar-logo">

        </div>
        <div id="top-bar-control">

        </div>
        <div id="top-bar-search"></div>
        <div id="top-bar-meun">
            <div class="meun-item">
                <!-- <userInfo></userInfo> -->
            </div>
            <div class="meun-item">
                <!-- <setting></setting> -->
            </div>
            <div class="meun-item">
                <!-- <theme-setting></theme-setting> -->
            </div>
            <div class="meun-item">
                <!-- <message></message> -->
            </div>
        </div>
        <div id="top-bar-frameIcon">
            <frameIcon></frameIcon>
        </div>
    </div>
</template>
<script>
import frameIcon from './FrameIcon'
export default {
    components: {
        frameIcon,
    }
}
</script>
<style>
#top_bar{
    cursor: pointer;
}
</style>