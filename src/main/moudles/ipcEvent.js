import {
	app,
	ipcMain,
	BrowserWindow
} from 'electron'
import log from 'electron-log'
//监听渲染进程的消息
function ipcEventListener() {
    ipcMain.on('close_Win', () => {
        log.info("接收消息")
        let wins = BrowserWindow.getAllWindows()
        for (let i = 0; i < wins.length; i++) {
        wins[i].close()
        }
    })
}

export {
    ipcEventListener,
}