
exports.download = function(url ) {
    console.log(url)

    const sendReq = request.get(url);
    sendReq.on('response', (response) => {
      url = decodeURI(url)
	let name:string[] | string  = url.split("/")
	name = name[name.length-1]
	console.log(name)
	let hs= response.headers["content-type"]
	hs = hs.split("/")
	hs = hs[hs.length-1]


	let ext = name.split(".")[name.split(".").length-1] || hs || "unknown"
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
