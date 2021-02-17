<template>
  <div class="progress-bar" ref="progressBar" @click.prevent.stop="progressClick">
    <div class="progress" ref="progress" :style="{width : `${progressOffsetWidth}px`}"></div>
    <div class="buffered" ref="buffered" :style="{width : `${bufferedOffsetWidth}px`}"></div>
    <div :class="handleCls" @mousedown="onMouseDown" :style="{transform : `translateX(${progressbarTranslateX}px)`}">
      <img src="../../assets/img/loading.gif" class="progress-waiting" v-if="waiting">
      <div class="progress-btn" v-else></div>
    </div>
    <div class="virtual-bar" ref="virtualBar"></div>
  </div>
</template>
<script>
export default {
    
}
</script>
<style >
    .progress-bar {
        position: relative;
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: rgba(123, 123, 123, 0.3);
        cursor: pointer;
    }
    .virtual-bar {
        position: absolute;
        left: 0;
        top: -4px;
        right: 0;
        bottom: -4px;
        z-index: 2;
    }
    .progress {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        height: 100%;
        border-radius: 2px;
    }
    .buffered {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        height: 100%;
        background: rgba(123, 123, 123, 0.5);
        transition: all .1s ease-out;
    }
    .handle {
        position: absolute;
        left: -10px;
        top: 50%;
        margin-top: -8px;
        z-index: 3;
        width: 20px;
        height: 16px;
        background: #fff;
        border-radius: 8px;
        border: 1px solid #ddd;
        cursor: pointer;
        box-sizing: border-box;
    }
    .small {
        left: -7px;
        margin-top: -7px;
        width: 14px;
        height: 14px;
        border-radius: 7px;
    }
    .progress-btn {
        top: 3px;
        left: 3px;
    }
</style>