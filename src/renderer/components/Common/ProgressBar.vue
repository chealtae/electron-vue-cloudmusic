<template>
	<div class="player">
		<div class="time">00:00</div>
		<div class="silder">
			<div class="buffer"></div>
			<div class="processor"></div>
			<div class="controller"></div>
			<!-- <img src="../../assets/img/loading.gif" class="progress-waiting" v-if="waiting"> -->
		</div>
		<div class="time">04:21</div>
	</div>
</template>
<script>
export default {
    
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
	}
	.silder:hover{
		transform: scale(1,2);
	}
	.processor{
		/* position: absolute;
		width: 8px;
		height: 100%;
		background-color: tomato;
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px; */
	}
	.controller{
		/* position:absolute;
		width: 6px;
		height: 6px;
		border: 10px solid tomato;
		border-radius: 50%;
		left: -8px;
		top: -8px; */
	}
</style>
