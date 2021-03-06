
exports.download = function (url) {
  console.log(url)
  const request = require('request')
  const { dialog, BrowserWindow, Notification } = require('electron')
  const mime = require('./mime.js')
  const sendReq = request.get(url)
  const fs = require('fs')
  sendReq.on('response', (response) => {
    url = decodeURI(url)
    
    let name = url.split('/')
    name = name[name.length - 1]
    console.log(name)
    const hs = response.headers['content-type']
    console.log(hs)

    const ext = mime.getExtension(hs)

	 dest = dialog.showSaveDialogSync(BrowserWindow.getAllWindows()[0], {
      title: 'Save file',
      defaultPath: `C:\\Users\\${process.env.USERNAME}\\Downloads\\` + name + '.' + ext
    })

    	const file = fs.createWriteStream(dest)
    sendReq.pipe(file)
    file.on('finish', () => {
      file.close()
      myNotification = new Notification(`Downloaded ${dest}`)
      myNotification.onclick = () => {
        console.log('Notificação clicada')
        open(dest)
      }

      file.on('error', (err) => {
        throw new Error(err.message)
      })
    })
  })

  sendReq.on('error', (err) => {
    throw new Error(err.message)
  })
}
