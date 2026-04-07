import charRouter from "./routes/charRouter.js";
const express = require("express");
const cors =require("cors");
const app= express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use("/chars",charRouter);
app.listen(3000,'localhost',(err)=>{
    if(err){
        throw new Error("server not listening");
        
    }
    console.log("server started");
})