const { dialog,ipcMain,app, BrowserWindow, Notification } = require('electron')
const fs = require('fs')
const request = require('request')
const path = require('path');
const open = require('open');


ipcMain.on('request-mainprocess-action', (event, arg) => {
   download(arg.url)
});

let download = (url) => {
    dest = dialog.showSaveDialogSync()
    const file = fs.createWriteStream(dest);
    const sendReq = request.get(url);
    sendReq.on('response', (response) => {
        sendReq.pipe(file);
    });
    file.on('finish', () => file.close());
    sendReq.on('error', (err) => {
        throw new Error(err.message)
    });
    file.on('error', (err) => { 
	throw new Error(err.message)
    });
const notification = {
    title: 'Finished',
    body: `Downloaded ${dest}`
  }
myNotification = new Notification(notification)
myNotification.onclick = () => {
  console.log('Notificação clicada')
  open(dest)
}
myNotification.show()


}



function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    altura: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

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