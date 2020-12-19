
exports.download = function(url) {
    console.log(url)
    let request = require("request")
    let {dialog } = require("electron")
    let mime = require("./mime.js")
    const sendReq = request.get(url);
    sendReq.on('response', (response) => {
      url = decodeURI(url)
	let name  = url.split("/")
	name = name[name.length-1]
	console.log(name)
	let hs= response.headers["content-type"]


let ext = mime.getExtension(hs)

	 dest = dialog.showSaveDialogSync(mainWindow, {
    title: 'Save file',
    defaultPath: `C:\\Users\\${process.env.USERNAME}\\Downloads\\`+name+"."+ext
  });

    	const file = fs.createWriteStream(dest);
        sendReq.pipe(file);
 file.on('finish', () => {
file.close()
myNotification = new Notification(`Downloaded ${dest}`)
myNotification.onclick = () => {
  console.log('Notificação clicada')
  open(dest)
}

file.on('error', (err) => {
	throw new Error(err.message)
    });
})
    });

    sendReq.on('error', (err) => {
        throw new Error(err.message)
    });


}
