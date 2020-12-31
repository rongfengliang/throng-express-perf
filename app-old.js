const throng = require('throng')
const express = require("express")
function startApp(workid) {
    const app = express();
    console.log("start server",workid)
    app.get("/",function(req,res){
        let userinfo = {
            name:"dlaong",
            age:333,
            workid:workid
        }
        res.json(userinfo)
    })
    app.listen(8080,"0.0.0.0",err=>{
        console.log(err)
    })
}
throng(3,startApp)
