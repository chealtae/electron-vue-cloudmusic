import {
	app,
	ipcMain,
	BrowserWindow
} from 'electron'

var mainWin = BrowserWindow.getFocusedWindow();
// 监听消息，控制主窗口的变化
function closeWindows() {
    ipcMain.on('close_Win', () => {
        console.log('接收关闭窗口消息')
        let wins = BrowserWindow.getAllWindows()
        for (let i = 0; i < wins.length; i++) {
        wins[i].close()
        }
    })
}

function minWindows() {
    ipcMain.on('Window_min', () => {
        console.log('窗口最小化成功')
        let mainWin = BrowserWindow.getFocusedWindow(); //todo 由于窗口控制只有几个操作，所以暂时这么写，如果有特别多操作，应该封装成对象，使用constructor
        mainWin.minimize()
    })
}

function maxWindows() {
    ipcMain.on('Window_max', () => {
        console.log('窗口最大化成功')
        let mainWin = BrowserWindow.getFocusedWindow();
        mainWin.maximize()
    })
}

function resetWindows() {
    ipcMain.on('resetWin', () => {
        console.log('窗口大小还原成功')
        let mainWin = BrowserWindow.getFocusedWindow();
        mainWin.restore()
    })
}

/* 
    歌词显示的时候关闭窗口
*/
function closeLyrics() {
    ipcMain.on('closeLyrics', (event,arg) => {
        let wins = BrowserWindow.getAllWindows();
        if(wins[1]){ 
            wins[1].webContents.send('closeReply', 'true');
            wins[0].webContents.send('closeReply','true');//两个不同窗口都要进行消息通信
            wins[1].close()
        }
    })
}

/* 
    歌词浮框操作对应用页面播放影响
*/
function lastMusic() {
    ipcMain.on('lastMusic', () => {
        let wins = BrowserWindow.getAllWindows();
        wins[0].webContents.send('lastMusic','true') //第一个窗口肯定是主页面窗口 第二个一定是浮框
    })
}
// 播放
function playMusic() {
    ipcMain.on('playMusic', () => {
        let wins = BrowserWindow.getAllWindows();
        wins[0].webContents.send('playMusic','true') 
    })
}
// 暂停
function pauseMusic() {
    ipcMain.on('pauseMusic', () => {
        let wins = BrowserWindow.getAllWindows();
        wins[0].webContents.send('pauseMusic','true') 
    })
}
// 播放主界面传递
function playMusicfromHome() {
    ipcMain.on('playMusicfromHome', () => {
        let wins = BrowserWindow.getAllWindows();
        if(wins[1]){
            wins[1].webContents.send('playMusicfromHome','true') 
        }
    })
}
// 暂停主界面传递
function pauseMusicfromHome() {
    ipcMain.on('pauseMusicfromHome', () => {
        let wins = BrowserWindow.getAllWindows();
        if(wins[1]){
            wins[1].webContents.send('pauseMusicfromHome','true') 
        }
    })
}
// 下一首
function nextMusic() {
    ipcMain.on('nextMusic', () => {
        let wins = BrowserWindow.getAllWindows();
        wins[0].webContents.send('nextMusic','true') 
    })
}
// 歌词同步
function currentlyrics() {
    ipcMain.on('currentlyrics' ,(event,arg) =>{
        let wins = BrowserWindow.getAllWindows();
        if(wins[1]){
            wins[1].webContents.send('currentlyrics',arg)
        }
    })
}

function closeLogin() {
    ipcMain.on('closeLogin',() => {
        let win = BrowserWindow.getFocusedWindow();
        win.close()
    })
}

//监听渲染进程的消息
function ipcEventListener() {
    closeWindows()
    minWindows()
    maxWindows()
    resetWindows() 
    closeLyrics()
    lastMusic()
    playMusic()
    pauseMusic()
    nextMusic()
    currentlyrics()
    playMusicfromHome()
    pauseMusicfromHome()
    closeLogin()
}
export {
    ipcEventListener,
}