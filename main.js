const { dialog,ipcMain,app, BrowserWindow, Notification } = require('electron')
const fs = require('fs')
const request = require('request')
const path = require('path');
const open = require('open');


ipcMain.on('request-mainprocess-action', (event, arg) => {
   download(arg.url)
});

let download = (url) => {
    if (url.length!=1){
      for (i in url){
        let  sendReq = request.get(url[i]);

let dest = `C:\\Users\\${process.env.USERNAME}\\Downloads\\`
sendReq.on('response', (response) => {
  dest +=url[i].replaceAll("/","-").replaceAll(":","")+"."+response.headers['content-type'].slice(response.headers['content-type'].lastIndexOf("/")+1,response.headers['content-type'].lastIndexOf(";"))
  let file = fs.createWriteStream(dest);
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
});
        sendReq.on('error', (err) => {
        throw new Error(err.message)
        
    });
        file.on('error', (err) => { 
	throw new Error(err.message)
    });


      }
)
        
        
       
        
    }
  }else{
    dest = dialog.showSaveDialogSync()
    const file = fs.createWriteStream(dest);
    const sendReq = request.get(url);
    sendReq.on('response', (response) => {
        sendReq.pipe(file);
    });
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
});
    sendReq.on('error', (err) => {
        throw new Error(err.message)
    });
    file.on('error', (err) => { 
	throw new Error(err.message)
    });

}

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