const electron = require("electron");
const {app, BrowserWindow, Menu} = require('electron')

require('@electron/remote/main').initialize()

function createWindow(){
    const win = new BrowserWindow({
        width : 1080,
        height : 768,
        minHeight:768,
        minWidth:1366,
        webPreferences : {
            enableRemoteModule: true
        }
    })
    // Menu.setApplicationMenu(null)
    // TODO : Add promise Here
    win.loadURL('http://localhost:3000')

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
