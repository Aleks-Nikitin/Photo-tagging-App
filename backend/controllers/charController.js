
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
        console.log(`value of coordinate${dbX.xCoord}`);
        const res= ((((Number(value)/Number(screenX))/ dbX.xCoord) < 1.3) && (((Number(value)/Number(screenX))/ dbX.xCoord) >0.7));
          if (!res) {
        throw new Error(`Wrong X coordinate`);
      }
        return res;

    }).withMessage("wrong guy"),
    body("ycoord").trim().exists()
    .custom(async (value,{req})=>{
        const screenY=req.body.screenY;
        const dbY= await prisma.character.findUnique({
            where:{
                id:Number(req.params.id)
            }
        })
        const res= ((Number(value)/Number(screenY))/dbY.yCoord <1.3) && ((Number(value)/Number(screenY))/dbY.yCoord>0.7);
         if (!res) {
        throw new Error(`Wrong Y coordinate`);
      }
        return res;

    }).withMessage("wrong guy")


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