const { dialog,ipcMain,app, BrowserWindow, Notification } = require('electron')
const fs = require('fs')
const request = require('request')
const path = require('path');
const open = require('open');


ipcMain.on('request-mainprocess-action', (event, arg) => {
  for (i in arg.url){
    download(arg.url[i])
  }
   
});

function download(url) {
    
    
    const sendReq = request.get(url);
    sendReq.on('response', (response) => {
      dest = `C:\\Users\\${process.env.USERNAME}\\Downloads\\`+url.replaceAll("/","-").replaceAll(":","")+"."+response.headers['content-type'].slice(response.headers['content-type'].lastIndexOf("/")+1,response.headers['content-type'].lastIndexOf(";"))
    const file = fs.createWriteStream(dest);
        sendReq.pipe(file);
 file.on('finish', () => {
file.close()
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
file.on('error', (err) => { 
	throw new Error(err.message)
    });
})
    });
  
    sendReq.on('error', (err) => {
        throw new Error(err.message)
    });
    

}




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