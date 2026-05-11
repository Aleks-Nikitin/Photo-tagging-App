
import { prisma } from "../lib/prisma.js";
import 'dotenv/config';
import {matchedData,validationResult,body}from"express-validator";
const validateCoordsChar=[
    body("screenX").exists(),
    body("screenY").exists(),
    body("xcoord").trim().exists()
    .custom(async (value,{req})=>{
        const screenX =req.body.screenX;
        const dbX = await prisma.character.findUnique({
            where:{
                id:Number(req.params.id)
            }
        })
        console.log(`screen x${screenX}`);
        console.log(`value of current x${value}`);
        console.log(`value of coordinate database X${dbX.xCoord}`);
        console.log(`current calculated value of X coords${((Number(value)/Number(screenX))/ dbX.xCoord)}`)
        const res= ((((Number(value)/Number(screenX))/ dbX.xCoord) < 1.06) && (((Number(value)/Number(screenX))/ dbX.xCoord) >0.95));
          if (!res) {
        throw new Error(`Wrong X coordinate`);
      }
        return res;

    }).withMessage("wrong guy X"),
    body("ycoord").trim().exists()
    .custom(async (value,{req})=>{
        const screenY=req.body.screenY;
        const dbY= await prisma.character.findUnique({
            where:{
                id:Number(req.params.id)
            }
        })
        console.log(`screen y${screenY}`);
        console.log(`value of current y${value}`);
      //  console.log(`value of coordinate database Y${dbY.yCoord}`);
        let supposedY =0.0776699;
        console.log(`val/screen Y: ${(Number(value)/Number(screenY))}`);
        console.log(`y current supposed calculated val: ${((Number(value)/Number(screenY))/ dbY.yCoord)}`)
        const res= ((((Number(value)/Number(screenY))/ dbY.yCoord) < 1.06) && (((Number(value)/Number(screenY))/ dbY.yCoord) >0.95));
         if (!res) {
        throw new Error(`Wrong Y coordinate`);
      }
        return res;

    }).withMessage("wrong guy Y")


]
const verifyChar=[validateCoordsChar,async (req,res)=>{
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        res.status(401).json({errors:errors}); // coords arent found
    }
    const {id} = req.params;
    const {xcoord,ycoord}=matchedData(req);
    res.json({xcoord,ycoord});
    
}]
export default {
    verifyChar
}