const fs = require('fs')
const request = require('request')
const path = require('path');
const open = require('open');
let {ipcRenderer} = require('electron')
let lnamee = 0
window.onload = function(){
    lnamee = document.getElementById("lname")
console.log("included renderer")
}
let mydown = function(url){
  lnamee.value = ""
            // Some data that will be sent to the main process
            url = url.split(",")
            for (i in url){
		//send ipc
		ipcRenderer.send("download", {url: i })

}




}
