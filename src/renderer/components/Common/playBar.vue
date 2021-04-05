<template>
	<div class="player">
		<div class="songInfo">
			<img src="../../assets/img/img1.jpg" alt="" class="songImg" >
			<span class="info_span">{{song.songName}}</span>
			<img v-if="song.isCollect" src="../../assets/img/heart.svg" alt=""  class="heartImg" title="取消喜欢" @click="collectSong">
			<img v-else src="../../assets/img/heart1.svg" alt=""  class="heartImg" title="喜欢" @click="cancelCollect">
			<br>
			<span class="info_span">{{song.singer}}</span>
		</div>
		<div style="margin-top:8px">
			<div>
				<audio :src="currentSongSrc" ref="audio" ></audio> 
			</div>
			<div class="operation">
				<img v-show="playStyle === 'circle'" title="单曲播放" src="../../assets/img/circlePlay.svg" alt="" @click="changeStyle" class="operaIcon">
				<img v-show="playStyle === 'list'" title="列表播放" src="../../assets/img/listPlay.svg" alt="" @click="changeStyle" class="operaIcon">
				<img v-show="playStyle === 'randon'" title="随机播放" src="../../assets/img/randonPlay.svg" alt="" @click="changeStyle" class="operaIcon"> 
				<img src="../../assets/img/lastSong.svg" alt="" @click="lastMusic" class="operaIcon">
				<img v-if="!isplay" src="../../assets/img/play.svg" alt="" @click="playMusic" class="operaIcon">
				<img v-else src="../../assets/img/pause.svg" alt="" @click="pauseMusic" class="operaIcon">
				<img src="../../assets/img/nextSong.svg" alt="" @click="nextMusic" class="operaIcon">
				<img src="../../assets/img/lyric.svg" alt="" title="显示歌词" class="operaIcon">
			</div>
			<div class="playBar">
				<div class="time">{{currentPlayTime}}</div>
				<div class="silder" @click="onMousedown">
					<div class="buffer" :style="{width:`${bufferOffsetWidth}px`}"></div>
					<div class="processor"  :style="{width:`${processorOffsetWidth}px`}"></div>
					<div class="controller"  v-drag='{}' 
					:style="{transform : `translateX(${TranslateX}px)`, left:`${processorOffsetWidth}px`}"></div>
				</div>
				<div class="time" >{{musicLength}}</div>
			</div>
		</div>
		<div class="playOperation">
			<el-popover
			placement="top"
			width="160"
			offset="0"
			v-model="visible">
			<div style="text-align: right; margin: 0">
				<el-button size="mini" type="text" @click="visible = false">取消</el-button>
				<el-button type="primary" size="mini" @click="visible = false">确定</el-button>
			</div>
			<div slot="reference" class="qualitySelect">
				<span style="font-size:14px">极高</span>
			</div>
			</el-popover>
			<img src="../../assets/img/volume.svg" alt="" >
			<img src="../../assets/img/mute.svg" alt="" >
			<img src="../../assets/img/playList.svg" alt="" >
		</div>
		
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
			currentTime:'00:00',
			musicTime:'00:00',
			isplay:false,
			playStyle:localStorage.getItem('playStyle')? localStorage.getItem('playStyle'):"list",//默认列表播放
			song:{singId:1,songName:'爱就一个字11111',singer:'傲七爷',isCollect:false},
			visible: false,
			getSongList:[{singId:1},{singId:2},{singId:3}],
			songSrc:[{src:require('@/assets/img/test.mp3')},{src:require('@/assets/img/test2.mp3')},{src:require('@/assets/img/test3.mp3')}],
			currentSongSrc:require('@/assets/img/test.mp3'),	
			}
	},
	mounted() {
		this.endListener();
		this.watchTime();
	},
	computed: {
		processorOffsetWidth() {
			return this.processMoveX
		},
		TranslateX() {
			return this.progressbarTranslateX
		},
		musicLength() {
			return this.musicTime
		},
		currentPlayTime() {
			return this.currentTime
		}
	},
	methods: {
		onMousedown(e){
			e.preventDefault
			this.processMoveX = e.offsetX
			console.log('moveX',this.processMoveX)
		},
		playMusic(){
			this.$refs.audio.play()
			this.isplay = true;
		},
		pauseMusic() {
			this.$refs.audio.pause()
			this.isplay = false;
		},
		lastMusic() {
			let playedSong = this.getSongList.pop();
			this.getSongList.unshift(playedSong) //把播放完的音乐移动到数组t头部
			this.currentSongSrc = this.songSrc[this.getSongList[0].singId-1].src; //todo 这里直接删掉 ，改用请求过来的数据
			console.log(11111,this.currentSongSrc)
			setTimeout(() => { //todo 异步后应该不需要再用定时器
				this.$refs.audio.play()
			}, 150);
			this.isplay = true;
		},
		nextMusic() {
			let playedSong = this.getSongList.shift();
			this.getSongList.push(playedSong) //把播放完的音乐移动到数组尾部
			this.currentSongSrc = this.songSrc[this.getSongList[0].singId-1].src; //todo 这里直接删掉 ，改用请求过来的数据
			console.log(11111,this.currentSongSrc)
			setTimeout(() => { //todo 异步后应该不需要再用定时器
				this.$refs.audio.play()
			}, 150);
			this.isplay = true;
		},
		collectSong(){
			this.song.isCollect = !this.song.isCollect
		},
		cancelCollect() {
			this.song.isCollect = !this.song.isCollect
		},
		changeStyle() {
			if(this.playStyle === 'list'){
				this.playStyle = 'randon'
				localStorage.setItem('playStyle','randon')
			} else if (this.playStyle === 'randon'){
				this.playStyle = 'circle'
				localStorage.setItem('playStyle','circle')
			} else if (this.playStyle === 'circle'){
				this.playStyle = 'list'
				localStorage.setItem('playStyle','list')
			}
		},
		endListener() {
			this.$refs.audio.loop = false //默认静音循环播放初始状态
			this.$refs.audio.addEventListener('ended',() => {
				if(this.playStyle === 'list'){ //如果是列表播放，需要再播放完后更改歌曲列表
					let playedSong = this.getSongList.shift();
					this.getSongList.push(playedSong) //把播放完的音乐移动到数组尾部
					// this.$axios.get(``).then((res) => {
						
					// })
					this.currentSongSrc = this.songSrc[this.getSongList[0].singId-1].src; //todo 这里直接删掉 ，改用请求过来的数据
					console.log(this.currentSongSrc);
				} else if(this.playStyle === 'circle') {
					this.$refs.audio.loop = true //设置单曲循环播放
				} else if(this.playStyle === 'randon') {
					this.currentSongSrc = this.songSrc[Math.ceil(Math.random()*this.getSongList.length-1)].src //向下取整
					console.log(this.currentSongSrc);
				}
				setTimeout(() => { //todo 异步后应该不需要再用定时器
					audioPlay.play()
				}, 150);
				
			})
		},
		//监听时间变化
		watchTime() {
			this.$refs.audio.addEventListener('timeupdate',() => {
				let timeDisplay = Math.floor(this.$refs.audio.currentTime)
				let timeDisplay2 = Math.floor(this.$refs.audio.duration)
				this.currentTime = this.processTime(timeDisplay)
				this.musicTime = this.processTime(timeDisplay2)
			});
			console.log('xxxxxxxxxxxxxxxxxx')
			this.$refs.audio.addEventListener('durationchange ', () => {
				console.log('22222222222222222222')
				let timeDisplay = Math.floor(this.$refs.audio.duration)
				this.musicTime = this.processTime(timeDisplay)
			})
		},
		processTime(timeDate) {
			let minute =  Math.floor(timeDate / 60);
			let second = timeDate % 60;
			let secondPart = second < 10 ? '0'+second : second;
			let minutePart = minute < 10 ? '0'+minute : minute;
			return minutePart +':'+ secondPart;
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
		display: flex;
		height: 50px;
		margin: 12px 14px;
		justify-content: space-between;
	}
	.songImg{
		width: 50px;
		height: 50px;
		border-radius: 3px;
		float: left;
	}
	.info_span{
		font-size: 14px;
		max-width: 95px;
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-left: 10px;
		line-height: 24px;
	}
	.playBar{
		width: 492px;
		margin:0 auto;
		position: relative;
		display: flex;
	}
	.time{
		margin-top: 10px;
		font-size: 12px;
	}
	.silder{
		width: 80%;
		height: 2px;
		background-color: white;
		margin:16px 5px 0px;
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
	.heartImg{
		margin-bottom: 6px;
		cursor: pointer;
	}
	.playOperation{
		width: 180px;
		display: flex;
		justify-content: space-around;
	}
	.operation{
		margin: 0px auto;
		width: 250px;
		display: flex;
    	justify-content: space-around;
	}
	.qualitySelect{
		border:1px solid rgb(60, 165, 236);
		border-radius: 2px;
		text-align: center;
		width: 32px;
		margin-top: 16px;
	}
	.operaIcon{
		cursor: pointer;
	}
</style>
