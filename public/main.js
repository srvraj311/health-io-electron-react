const electron = require("electron");
const {app, BrowserWindow} = require('electron')

require('@electron/remote/main').initialize()

function createWindow(){
    const win = new BrowserWindow({
        width : 1080,
        height : 640,
        webPreferences : {
            enableRemoteModule: true
        }
    })

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
