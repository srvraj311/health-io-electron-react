exports.__esModule = true;
const electron_1 = require("electron");
const { app, BrowserWindow} = require('electron')
const path = require('path')
//const isDev = require('electron-is-dev')

function createWindow(){
    const win = new BrowserWindow({
        width : 1366,
        height : 768,
        minHeight:768,
        minWidth:1366,
        autoHideMenuBar:false,
        webPreferences : {
            preload: __dirname + '/preload.js'
        }
    })
    //Menu.setApplicationMenu(null)
    // TODO : Add promise Here
    //win.loadURL('http://localhost:3000')

    // win.loadURL(
    //     isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
    // )
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`).then( _ => console.log('Done'))
}

app.on('ready', createWindow )

// Quit on all windows closed
app.on('window-all-closed', () => {
    // Specially for mac os, app doesnt quit so this function is added
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
})
