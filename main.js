const { dialog,ipcMain,app, BrowserWindow, Notification } = require('electron')
const fs = require('fs')
const request = require('request')
const path = require('path');
const open = require('open');








function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "logo.png",
    webPreferences: {
      nodeIntegration: true
    }
  })
win.maximize()
  win.loadFile('index.html')
  
}

app.whenReady().then(createWindow)

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