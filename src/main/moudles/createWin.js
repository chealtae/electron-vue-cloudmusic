import {
	app,
	ipcMain,
	BrowserWindow
} from 'electron'

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

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

function createLyrics() {
    ipcMain.on('createLyrics',() => {
        console.log('创建歌词窗口成功');
        let LyricsWin = new BrowserWindow({
            width: 600,
            height: 150,
            frame: false,
            x:600,
            y:0,
            transparent: true,
            alwaysOnTop: true,//始终置顶
            webPreferences: {
                nodeIntegration: true,
                // webSecurity: false
            }
        })

        LyricsWin.webContents.closeDevTools() //默认关闭开发者模式
        // LyricsWin.loadURL('http://www.baidu.com')
        LyricsWin.loadURL(winURL + '#/LyricsWin');
        LyricsWin.on('close', () => {
            LyricsWin = null
        })
        LyricsWin.on('blur', () => {
            LyricsWin = null
        })
    })
}

function createLogin() {
    ipcMain.on("createLogin",() => {
        let loginWin = new BrowserWindow({
            width: 350,
            height: 300,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                // webSecurity: false
            }
        })
        loginWin.webContents.closeDevTools();
        loginWin.loadURL(winURL + '#/LoginWin');
        loginWin.on('close', () => {
            loginWin = null
        })

    })
}

function createWinListener() {
    createMessage();
    createLyrics();
    createLogin();
}
export {
    createWinListener
}