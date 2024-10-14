const {app, BrowserWindow, Menu} = require('electron');
const { updateElectronApp } = require('update-electron-app');
updateElectronApp();
Menu.setApplicationMenu(null);
//const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        //autoHideMenuBar: true
        /*webPreferences {
            preload: path.join(_dirname, 'preload.js')
        }*/
    })

    win.loadFile('index.html')
}

// Similar to app.on('ready', () => {: syntax whenReady.then() is for
// Electron Specifically
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Close App if Window is Closed (Windows & Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
