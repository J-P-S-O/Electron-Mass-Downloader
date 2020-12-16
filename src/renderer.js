const fs = require('fs')
const request = require('request')
const path = require('path');
const open = require('open');
let electron = require('electron')
let remote = electron.remote

let lnamee = 0

function getMime(header){

		return "sorry, not available"
}
window.onload = function(){
    lnamee = document.getElementById("lname")

console.log("included renderer")
}

let mydown = function(url){
  lnamee.value = ""

            // Some data that will be sent to the main process
            url = url.split(",")
            for (i in url){
download(url[i])

}




}
