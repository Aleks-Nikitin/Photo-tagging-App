import Draggable from "react-draggable";
import { useRef } from "react";
import type { Character } from "../App"
type Coordinate = number;
type PopupProps = {
    chars:Character[],
    coords:Coordinate[],
}

function Popup({chars,coords}:PopupProps){

    const nodeRef=useRef(null);

    return(
        <>
        <Draggable nodeRef={nodeRef} position={{x:coords.x-20,y:coords.y-15}} disabled={true}>
                  <div className={`box absolute bg-red-700 border-black border-2 opacity-50 w-10 h-10`} ref={nodeRef}></div>
          </Draggable>
        <Draggable nodeRef={nodeRef} disabled={true} position={{x:coords.x+30,y:coords.y-30}}>
            <div className="box absolute flex gap-2 bg-purple-400 p-1.5  hover:cursor-pointer" ref={nodeRef}>
                {chars.map((char)=>(
                     <div className="cube border-2 border-black opacity-80 hover:opacity-100">
                         <h3 className="text-white">{char.name}</h3>
                        <img src={char.img} alt="" className="h-[40px]"/>
                     </div>
                ))}
            </div>
        </Draggable>
        </>
    )
}
export default Popup