const fs = require('fs')
const request = require('request')
const path = require('path');
const open = require('open');
let {ipcRenderer} = require('electron')
let lnamee = 0
window.onload = function(){
    lnamee = document.querySelector("input")
     lnamee.placeholder="Url here!"
     lnamee.onchange = mydown(lnamee.value)
console.log("included renderer")
}
let mydown = function(url){
  lnamee.value = ""
            // Some data that will be sent to the main process
            url = url.split(",")
            for (i in url){
		//send ipc
    console.log(i)
		ipcRenderer.send("download", url[i] )

}




}
