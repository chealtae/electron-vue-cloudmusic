<template>
	<div class="player">
		<div class="time">00:00</div>
		<div class="silder" @click="onMousedown">
			<div class="buffer" :style="{width:`${bufferOffsetWidth}px`}"></div>
			<div class="processor"  :style="{width:`${processorOffsetWidth}px`}"></div>
			<div class="controller"  v-drag='{}' 
			:style="{transform : `translateX(${TranslateX}px)`, left:`${processorOffsetWidth}px`}"></div>
			<!-- <img src="../../assets/img/loading.gif" class="progress-waiting" v-if="waiting"> -->
		</div>
		<div class="time">04:21</div>
	</div>
</template>
<script>

export default {
    data() {
		return {
			processMoveX : 300, 
			bufferOffsetWidth: 0,
			controllerOffsetWidth: 0,
			progressbarTranslateX: 0,
		}
	},
	computed: {
		processorOffsetWidth() {
			return this.processMoveX
		},
		TranslateX() {
			return this.progressbarTranslateX
		}
	},
	methods: {
		onMousedown(e){
			e.preventDefault
			this.processMoveX = e.offsetX
			console.log('moveX',this.processMoveX)
		}
	},
	directives:{
		drag(el,bindling){
			let oDiv = el //当前元素
            oDiv.onmousedown = function(e) {
				e.preventDefault //禁用默认事件
				let disX = e.offsetX
				console.log('offsetX',disX)
				console.log(oDiv)
				document.onmousemove = function(e){
					e.preventDefault;
					let l = e.offsetX - disX;
					this.progressbarTranslateX = l
					console.log('偏移',l)
				}
				document.onmouseup = function(e) {
					e.preventDefault;
					document.onmousemove = null;
					document.onmousedown = null;
				}
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
