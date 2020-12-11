const fs = require('fs')
const request = require('request')
const path = require('path');
const open = require('open');
function download(url) {
    console.log(url)
    
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
let mydown = function(url){


            // Some data that will be sent to the main process
            url = url.split(",")
            for (i in url){
download(url[i])
}

           

        
}


