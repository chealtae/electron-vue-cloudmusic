import {
	app,
	ipcMain,
	BrowserWindow
} from 'electron'


//监听渲染进程的消息
function ipcEventListener() {
    ipcMain.on('close_Win', () => {
        console.log('接收关闭窗口消息')
        let wins = BrowserWindow.getAllWindows()
        for (let i = 0; i < wins.length; i++) {
        wins[i].close()
        }
    })
}

export {
    ipcEventListener,
}