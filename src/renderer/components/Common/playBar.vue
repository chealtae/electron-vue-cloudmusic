<template>
	<div class="player">
		<div class="songInfo" style="min-width:180px">
			<img :src="song.image" alt="" class="songImg" @click="showDetails">
			<span class="info_span">{{song.name}}</span>
			<img v-if="song.isCollect" src="../../assets/img/heart.svg" alt=""  class="heartImg" title="取消喜欢" @click="cancelCollect(song.id)">
			<img v-else src="../../assets/img/heart1.svg" alt=""  class="heartImg" title="喜欢" @click="collectSong(song.id)">
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
				<img src="../../assets/img/lyric.svg" alt="" title="显示歌词" class="operaIcon" @click="showLyrics">
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
			<div style="display:flex">
				<img v-if="!isMute" src="../../assets/img/volume.svg" alt="" @click="mute" class="operaIcon">
				<img v-else src="../../assets/img/mute.svg" alt="" @click="mute" class="operaIcon">
				<div class="volumeSize" @click="volumeMousedown" > 
					<div class="processor"  :style="{width:`${volumeOffsetWidth}px`}"></div>
					<div class="controller"  v-drag='{}' 
					:style="{left:`${volumeOffsetWidth}px`}"></div>
				</div>
			</div>
			<img  src="../../assets/img/playList.svg" alt="" class="operaIcon"  @click="showPlayList">
		</div>
		
	</div>
</template>
<script>
import { ipcRenderer } from 'electron'
import Bus from '../Common/bus'
import {getAudioSrc ,getImgSrc} from '../Common/getSrc'
export default {
    data() {
		return {
			processMoveX : 0, 
			bufferOffsetWidth: 0,
			volumeMoveX: localStorage.getItem('volume')? Number(localStorage.getItem('volume')):20,
			controllerOffsetWidth: 0,
			progressbarTranslateX: 0,
			currentTime:'00:00',
			musicTime:'00:00',
			isplay:false,
			isMute:false,
			playStyle:localStorage.getItem('playStyle')? localStorage.getItem('playStyle'):"list",//默认列表播放
			song:{singId:1,name:'暂无歌曲',singer:'',isCollect:false,edition:'暂无专辑'},
			visible: false,
			getSongList:JSON.parse(localStorage.getItem('playlist')) ,
			currentSongSrc:'',	
			isShowLyrics: false,
			lyric:'暂无歌词',
            lrcArray : [],//新建数组,用于存放歌词
			lrcId:0,
			flag:0,
			userId:Number(localStorage.getItem("userId")) || -1,
			}
	},
	async mounted() {
		//加载需要判断当前是否有音乐在storage里 有的话要默认赋值
		await this.checkLastPlay();
		
		this.endListener();//相关监听
		
		this.renderListener();
		this.processLyrics();
		this.busListener();//bus监听 歌单点击播放，接收信号
		//挂载时需要默认获取歌曲列表，当从歌单点击播放时，另一个入口进行更新列表

		this.$refs.audio.volume  = this.volumeMoveX/50 //设置默认音量
		//时间监听会涉及歌词显示 所以要在后面 应为歌词需要预处理 

		//歌曲播放时会有歌词时间，如果歌曲没有歌词 提前写入暂未歌词
		if(this.lrcArray[0] == undefined){
			this.lrcArray.push({
                    t:1200,
                    c:"暂无歌词"
            })
		}
		this.watchTime();

		localStorage.setItem('isplay',false)//每次打开时初始播放状态为false ，防止上次不正常退出引起状态异常
		
	},
	computed: {
		processorOffsetWidth() {
			return this.processMoveX
		},
		TranslateX() {
			return this.progressbarTranslateX
		},
		volumeOffsetWidth() {
			return this.volumeMoveX
		},
		musicLength() {
			return this.musicTime
		},
		currentPlayTime() {
			return this.currentTime
		},
	},
	methods: {
		onMousedown(e){
			e.preventDefault
			this.processMoveX = e.offsetX
			this.$refs.audio.currentTime = this.processMoveX/400 * this.$refs.audio.duration
			if(this.processMoveX != 0){
				this.isMute = false
			} else {
				this.isMute = true
			}
			console.log('moveX',this.processMoveX)
		},
		//音量
		volumeMousedown(e){
			e.preventDefault
			this.volumeMoveX = e.offsetX
			this.$refs.audio.volume  = this.volumeMoveX/50 
			localStorage.setItem('volume',this.volumeMoveX)
			// console.log('moveX',this.processMoveX)
		},
		playMusic(){
			this.$refs.audio.play()
			this.isplay = true;
			localStorage.setItem('isplay',true) //todo 这里应该用仓库管理状态
			localStorage.setItem('currentPlayId',this.song.id)
			Bus.$emit('playMusic',true)
			ipcRenderer.send('playMusicfromHome')
		},
		pauseMusic() {
			this.$refs.audio.pause()
			this.isplay = false;
			localStorage.setItem('isplay',false)
			Bus.$emit('pauseMusic',true)
			ipcRenderer.send('pauseMusicfromHome',true)
		},
		lastMusic() {
			let playedSong = this.getSongList.pop();
			this.getSongList.unshift(playedSong) //把播放完的音乐移动到数组t头部
			this.currentSongSrc = getAudioSrc(this.getSongList[0].audio); 
			this.song = this.getSongList[0];
			this.song.image = getImgSrc(this.song.image);
			setTimeout(() => { //请求资源需要事件
				this.$refs.audio.play()
			}, 150);
			this.isplay = true;
			localStorage.setItem('isplay',true)
			localStorage.setItem('currentPlayId',this.song.id)
			// Bus.$emit('lastMusic',true) //要传过去歌曲对象
			this.updateDetails()
			this.lrcId = 0; //歌词位置恢复
			this.flag = 0;
			this.processLyrics();
			ipcRenderer.send('updateLyric',true) //歌词浮框更新歌词
		},
		nextMusic() {
			console.log(this.getSongList)
			let playedSong = this.getSongList.shift();
			this.getSongList.push(playedSong) //把播放完的音乐移动到数组尾部
			this.currentSongSrc = getAudioSrc(this.getSongList[0].audio); 
			this.song = this.getSongList[0];
			this.song.image = getImgSrc(this.song.image);
			console.log(11111,this.currentSongSrc)
			setTimeout(() => { 
				this.$refs.audio.play()
			}, 150);
			this.isplay = true;
			localStorage.setItem('isplay',true)
			localStorage.setItem('currentPlayId',this.song.id)
			Bus.$emit('pauseMusic',true)
			this.updateDetails();
			// Bus.$emit('nextMusic',true) //要传过去歌曲对象
			this.lrcId = 0; //
			this.flag = 0;
			this.processLyrics();
			console.log('2222222222222')
			ipcRenderer.send('updateLyric',true) //歌词浮框更新歌词
		},
		collectSong(id){
			let info = {userId: this.userId ,collectType :0 ,typeId:id}
			this.$axios.post(`/Operation/collect`,info).then(res => {
				if (res.data.success){
					this.song.isCollect = !this.song.isCollect;
					this.updateDetails()
				}
				
			})
		},
		cancelCollect(id) {
			let info = {userId: this.userId ,collectType :0 ,typeId:id}
			this.$axios.post(`/Operation/cancelCollect`,info).then(res => {
				if (res.data.success){
					this.song.isCollect = !this.song.isCollect;
					this.updateDetails()
				}
			})
			
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
		busListener() {
			//监听播放消息后 1，需要播放当前歌曲 2.获取当前歌曲歌词 3.获取当前播放列表
			//播放列表更新入口只有这一个
			Bus.$on('playFromList', (state) =>{
				this.getSongList = JSON.parse(localStorage.getItem('playlist')) //更新播放列表
				let info = {songId:Number(state),userId:this.userId}
                this.$axios.post(`/SongInfo/getSong`,info).then((res) => {
					if(res.data.success){
						console.log(res.data.song.audio)
						this.song = res.data.song;
						this.song.image = getImgSrc(this.song.image);
						console.log(this.song)
						this.currentSongSrc = getAudioSrc(res.data.song.audio); 
						this.lyric = res.data.song.lyric;
						// console.log('...........',this.lyric)
						this.processLyrics();//处理歌词
						//获取资源也需要请求事件，所以需要延迟五百秒
						setTimeout(() => {
							this.playMusic();
						}, 500);
						//播放新的音乐 歌词浮框 更新
						ipcRenderer.send('updateLyric',true) 
					}
				})
            });
		},
		endListener() {
			this.$refs.audio.loop = false //默认静音循环播放初始状态
			this.$refs.audio.addEventListener('ended',() => {
				if(this.playStyle === 'list'){ //如果是列表播放，需要再播放完后更改歌曲列表
					let playedSong = this.getSongList.shift();
					this.getSongList.push(playedSong) //把播放完的音乐移动到数组尾部
					// this.$axios.get(``).then((res) => {
						
					// })
					this.currentSongSrc = getAudioSrc(this.getSongList[0].audio); 
					this.song = this.getSongList[0]
					this.song.image = getImgSrc(this.song.image);
					localStorage.setItem('currentPlayId',this.song.id)
					console.log(this.currentSongSrc);
				} else if(this.playStyle === 'circle') {
					this.$refs.audio.loop = true //设置单曲循环播放
				} else if(this.playStyle === 'randon') {

					let num = Math.ceil(Math.random()*(this.getSongList.length-1))

					this.song = this.getSongList[num];
					this.song.image = getImgSrc(this.song.image);
					this.currentSongSrc = getAudioSrc(this.getSongList[num].audio)//向下取整
					console.log(this.currentSongSrc);
					localStorage.setItem('currentPlayId',this.song.id)
					
				}
				setTimeout(() => { 
					this.$refs.audio.play()
					// Bus.$emit('pauseMusic',true)
					ipcRenderer.send('updateLyric',true) //歌词浮框更新歌词
				}, 150);
				this.updateDetails() //自动结束后都要更新数据给播放详情
			})
		},
		//监听时间变化
		watchTime() {
			
			this.flag = 0;
			this.$refs.audio.addEventListener('timeupdate',() => {
				let timeDisplay = Math.floor(this.$refs.audio.currentTime)
				let timeDisplay2 = Math.floor(this.$refs.audio.duration)
				this.processMoveX = timeDisplay/timeDisplay2 * 400
				this.currentTime = this.processTime(timeDisplay)
				if(isNaN(timeDisplay2)){ //获取不到时间时会显示NaN 
					this.musicTime = "00:00"
				} else {
					this.musicTime = this.processTime(timeDisplay2)
				}
				
				
				
				//处理歌词
				if(this.lrcArray[this.lrcId].t < timeDisplay && this.lrcArray[this.lrcId+1].t > timeDisplay){
					// 发送当前歌词index
					if(this.flag === 0){
						Bus.$emit('lrcId',this.lrcId)
						ipcRenderer.send('currentlyrics',this.lrcId)
					}
					this.flag++
				} else if(this.lrcArray[this.lrcId].t < timeDisplay && this.lrcArray[this.lrcId+1].t < timeDisplay){
					while(this.lrcArray[this.lrcId+1].t < timeDisplay && this.lrcId < this.lrcArray.length-1){
						this.lrcId++
					}
					this.flag = 0;
				} else if (this.lrcArray[this.lrcId].t > timeDisplay){
					while(this.lrcArray[this.lrcId].t > timeDisplay && this.lrcId > 0){
						this.lrcId--
					}
					this.flag = 0;
				}
				
			});

			this.$refs.audio.addEventListener('durationchange ', () => {
				let timeDisplay = Math.floor(this.$refs.audio.duration)
				this.musicTime = this.processTime(timeDisplay)
			})

		},
		//浮框操作监听
		renderListener(){
			ipcRenderer.on('closeReply' ,() => {
				this.isShowLyrics = false
			})
			ipcRenderer.on('lastMusic',() =>{
				this.lastMusic()
			})
			ipcRenderer.on('playMusic',() =>{
				this.playMusic()
			})
			ipcRenderer.on('pauseMusic',() => {
				this.pauseMusic()
			})
			ipcRenderer.on('nextMusic',() => {
				this.nextMusic()
			})
		},
		processTime(timeDate) {
			let minute =  Math.floor(timeDate / 60);
			let second = timeDate % 60;
			let secondPart = second < 10 ? '0'+second : second;
			let minutePart = minute < 10 ? '0'+minute : minute;
			return minutePart +':'+ secondPart;
		},
		mute() {
			this.isMute = !this.isMute 
			console.log(this.isMute)
			if (this.isMute === true) {
				this.volumeMoveX = 0;
				this.$refs.audio.volume = 0
			} else {
				this.volumeMoveX = Number(localStorage.getItem('volume'))
				this.$refs.audio.volume  = this.volumeMoveX/50 
			}
		},
		showDetails() {
			// this.$router.push('/playDetails')
			this.$emit('isShowDetails',true)
			Bus.$emit('playState',this.isplay) 
			//打开播放详情后，是用v-if 控制的，页面需要创建时间，所以要延迟时间传递消息
			setTimeout(() => {
				Bus.$emit('songInfo',this.song)
			}, 150);
			
		},
		//向歌词界面传送更新后的信息
		updateDetails(){
			Bus.$emit('playState',this.isplay) 
			Bus.$emit('songInfo',this.song)
		},
		showLyrics() {
			if(this.isShowLyrics === false){
				ipcRenderer.send('createLyrics')
				this.isShowLyrics = true
			}
			else{
				ipcRenderer.send('closeLyrics')
				this.isShowLyrics = false
			}
		},
		processLyrics() {
            let lrcGet = this.song.lyric;//提取歌词
            // console.log(lrcGet);
            let lrc = [];
            // console.log(lrc);
			if(lrcGet){
				this.lrcArray = [];
				lrc = lrcGet.split('\\n');
				lrc.forEach((item) => {
					let timeStr = item.substring(item.indexOf('[')+1,item.indexOf(']'));//提取时间
					let min = parseInt(timeStr.split(':')[0])*60;
					let sec = parseFloat(timeStr.split(':')[1]);
					let time = parseFloat((min + sec).toFixed(2));
					this.lrcArray.push({
						t: time,
						c: item.substring(item.indexOf(']') + 1)
					});
				})
			}
        },
		async checkLastPlay(){
			let info = {
				songId:Number(localStorage.getItem('currentPlayId')),
				userId:this.userId,
			}
			if(localStorage.getItem('currentPlayId')){
				return this.$axios.post(`/SongInfo/getSong`,info).then((res) => {
					if(res.data.success){
						this.song = res.data.song;
						this.song.image = getImgSrc(this.song.image);
						this.currentSongSrc = getAudioSrc(res.data.song.audio); 
						console.log(this.song)
					}
				})
			}
		},
		showPlayList(){
			this.$emit('isShowPlayList',true)
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
<style scoped>
    *{
		margin: 0;
		padding: 0;
	}
	.player{
		display: flex;
		height: 74px;
		padding: 12px 14px;
		justify-content: space-between;
		background: white;
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
		width: 400px;
		height: 2px;
		background-color: #bfbdbd;;
		margin:16px 5px 0px;
		position: relative;

	}
	.volumeSize{
		width: 50px;
		height: 2px;
		background-color: #bfbdbd;
		margin-top: 24px;
		margin-left: 5px;
		position: relative;
	}
	.volumeSize:hover {
		transform: scale(1,2);
	}
	.volumeSize:hover .controller{
		display: block;
	}
	.silder:hover{
		transform: scale(1,2);
	}
	.silder:hover .controller{
		display: block;
	}
	
	.processor{
		position: absolute;
		height: 100%;
		background-color: tomato;
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
	}
	.controller{
		display: none;
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
