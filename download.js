const { ipcRenderer, remote } = require('electron');

let mydown = function(url){


            // Some data that will be sent to the main process
            url = url.split(",")
            let Data = {
                url: url
                
            };

            // Send information to the main process
            // if a listener has been set, then the main process
            // will react to the request !
            ipcRenderer.send('request-mainprocess-action', Data);
}


