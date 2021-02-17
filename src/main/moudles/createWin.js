import {
	app,
	ipcMain,
	BrowserWindow
} from 'electron'

//监听消息，创建子窗口统一在这里处理

function createMessage() {
    ipcMain.on('createMessage',() => {
        console.log('创建设置窗口成功');
        let messageWin = new BrowserWindow({
            width: 400,
            height: 300,
            webPreferences: {
                nodeIntegration: true
            }
        })
        messageWin.webContents.closeDevTools() //默认关闭开发者模式
        messageWin.loadFile('@/components/BasicHeader/Message');
        messageWin.on('close', () => {
            messageWin = null
        })
        messageWin.on('blur', () => {
            messageWin.close()
        })
    })
}

function createWinListener() {
    createMessage()
}
export {
    createWinListener
}