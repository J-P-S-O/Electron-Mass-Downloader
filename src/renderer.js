const fs = require('fs')
const request = require('request')
const path = require('path');
const open = require('open');
let lnamee = 0
window.onload = function(){
    lnamee = document.getElementById("lname")
    
console.log("included renderer")
}
function download(url) {
    console.log(url)
  
    const sendReq = request.get(url);
    sendReq.on('response', (response) => {
      url = decodeURI(url)
      dest = `C:\\Users\\${process.env.USERNAME}\\Downloads\\`+url.replaceAll("/","-").replaceAll(":","")+"."+response.headers['content-type'].slice(response.headers['content-type'].lastIndexOf("/")+1,response.headers['content-type'].lastIndexOf(";"))
      
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
let mydown = function(url){
  lnamee.value = ""

            // Some data that will be sent to the main process
            url = url.split(",")
            for (i in url){
download(url[i])

}

           

        
}


