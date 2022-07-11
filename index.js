const express = require("express");

const port = 8000;
const db = require("./config/mongoose")
const app = express();

app.listen(port,function(err){
    if(err){
        console.log("cannot connect to server");
    }
    else{
        console.log(`Connect to server on port:${port}`);
    }
})