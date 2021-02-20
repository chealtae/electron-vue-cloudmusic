<template>
	<div class="player">
		<div class="time">00:00</div>
		<div class="silder" @click="onMousedown($event)">
			<div class="buffer" :style="{width:`${bufferOffsetWidth}px`}"></div>
			<div class="processor"  :style="{width:`${processorOffsetWidth}px`}"></div>
			<div class="controller"  :style="{transform : `translateX(${progressbarTranslateX}px)`}"></div>
			<!-- <img src="../../assets/img/loading.gif" class="progress-waiting" v-if="waiting"> -->
		</div>
		<div class="time">04:21</div>
	</div>
</template>
<script>
export default {
    data() {
		return {
			processMoveX : 0, 
			bufferOffsetWidth: 0,
			// processorOffsetWidth: 300,
			controllerOffsetWidth: 0,
		}
	},
	computed: {
		processorOffsetWidth() {
			let processorOffsetWidth = this.processMoveX 
			console.log('processorOffsetWidth',processorOffsetWidth)
			return processorOffsetWidth
		}
	},
	methods: {
		onMousedown(el){
			console.log('111111111')
			let oDiv = el.currentTarget
			oDiv.onmousedown = function(e) {
				e.preventDefault();//禁用默认事件
				this.processMoveX = e.offsetX
				console.log('moveX',this.processMoveX)
			}
		}
	}
}
</script>
<style>
    *{
		margin: 0;
		padding: 0;
	}
	.player{
		width: 492px;
		height: 45px;
		background-color: #777474;
		margin: auto;
		position: relative;
		display: flex;
	}
	.time{
		margin-top: 19px;
		font-size: 12px;
	}
	.silder{
		width: 80%;
		height: 2px;
		background-color: white;
		margin:24px 5px 0px;
		position: relative;
		overflow: hidden;
	}
	.silder:hover{
		transform: scale(1,2);
	}
	
	.processor{
		position: absolute;
		height: 100%;
		background-color: tomato;
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
	}
	.controller{
		position:absolute;
		width: 10px;
		height: 5px;
		background-color: tomato;
		border-radius: 50%;
		top: -1px;
		left: -1px;
	}
</style>
