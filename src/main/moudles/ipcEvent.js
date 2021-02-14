import {
	app,
	ipcMain,
	BrowserWindow
} from 'electron'

const mainWin = BrowserWindow.getFocusedWindow();


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
        this.mainWin.minimize()
    })
}

function maxWindows() {
    ipcMain.on('Window_max', () => {
        console.log('窗口最大化成功')
        this.mainWin.maximize()
    })
}

//监听渲染进程的消息
function ipcEventListener() {
    closeWindows()
    minWindows()
    maxWindows()
}
export {
    ipcEventListener,
}