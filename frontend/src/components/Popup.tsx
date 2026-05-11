import Draggable from "react-draggable";
import { ContextCoords } from "../Context";
import { useRef, useState, useContext} from "react";
import type { Character } from "../App"
type Coordinate = number;
type PopupProps = {
    chars:Character[],
    coords:Coordinate[],
    yOffset:number,
    imgHeight:number,
}
function toUrlEncoded(body) {
  return new URLSearchParams(body).toString()
}
function Popup({chars,coords,yOffest,imgHeight}:PopupProps){ 
      const [contextCoords,contextCoords2,setContextCoords,setContextCoords2,found1,setFound1,found2,setFound2]=useContext(ContextCoords);
    const nodeRef=useRef(null);
    
    async function onSubmit(e:any,id:number){
        e.preventDefault();
        try {
            const res =await fetch(`http://localhost:3000/chars/${id}`,{
                method:"POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: toUrlEncoded({screenX:window.innerWidth,screenY:imgHeight,xcoord:coords.x,ycoord:(coords.y-yOffest)})

            }) 
            const data = await res.json().catch(() => null)
            
            if (!res.ok) {
                throw new Error(data?.msg ?? 'markdown failed')
            }
            if(id==1){ 
                setFound1(false);
                setContextCoords([coords.x,coords.y]);
            }else{
                setFound2(false);
                setContextCoords2([coords.x,coords.y]);
            }
            
            
    
            alert("success")
            // place a green box on these coordinates, and remove one char from purple draggable
        } catch (error) {
            alert("wrongly found")
            throw new Error("wrong location");
            
        }
        
    }

  

    return(
        <>

        <Draggable nodeRef={nodeRef} position={{x:coords.x-20,y:coords.y-15}} disabled={true}>
                  <div className={`box absolute bg-red-700 border-black border-2 opacity-50 w-10 h-10`} ref={nodeRef}></div>
          </Draggable>
        <Draggable nodeRef={nodeRef} disabled={true} position={{x:coords.x+30,y:coords.y-30}}>
            <div className="box absolute flex gap-2 bg-purple-400 p-1.5  hover:cursor-pointer" ref={nodeRef}>
                {chars.map((char)=>(
                     <form onSubmit={e=>onSubmit(e,char.id)} key={char.id}>
                        {/* <input type="hidden" name="screenX" value={ from props of a popup}/>
                        <input type="hidden" name="screenY" value={ from props of a popup}/> */}
                         <button type="submit" >
                             <div className="cube border-2 border-black opacity-80 hover:opacity-100">
                                 <h3 className="text-white">{char.name}</h3>
                                <img src={char.img} alt="" className="h-[40px]"/>
                             </div>
                         </button>
                     </form>
                ))}
            </div>
        </Draggable>
        </>
    )
}
export default Popup