const { dialog,ipcMain,app, BrowserWindow, Notification } = require('electron')
const fs = require('fs')
const request = require('request')
const path = require('path');
const open = require('open');
let mainWindow = null;
let httpdown = require('./src/http.js')

function createWindow () {
    mainWindow = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      nodeIntegration: true,
			contextIsolation: false
    }
  })
  mainWindow.loadFile('ui/index.html')
}
app.whenReady().then(createWindow)
ipcMain.on('download',function(event, arg){
	httpdown.download(arg)
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
