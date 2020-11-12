const { ipcRenderer } = require('electron');
let mydown = function(){
urll = document.getElementById("lname")

            // Some data that will be sent to the main process
            let Data = {
                url: urll.value
                
            };

            // Send information to the main process
            // if a listener has been set, then the main process
            // will react to the request !
            ipcRenderer.send('request-mainprocess-action', Data);
}


