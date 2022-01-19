const express = require("express");
const { path } = require("express/lib/application");

const router = express.Router();

//@ Desc: Homepage route

router.get("/", function (req, res) {
    const options = {
        root: path.join("__dirname")
    };
    fileName = "index.html";

    res.sendFile(fileName, options, function(error){
        if(error){
            next(error);
        }else{
            console.log("Welcome")
        }
    })
})