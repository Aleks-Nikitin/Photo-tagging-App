import { useState,useRef, useEffect} from 'react'
import { ContextCoords } from './Context';
import Draggable from "react-draggable";
import Navbar from './components/Navbar'
import waldo from "./assets/waldo.jpg"
import char1 from "./assets/Character1.png"
import char2 from "./assets/Character2.png"
//import Draggable from 'react-draggable';
import Popup from "./components/Popup";

export type Character ={
    id:number,
    name:string,
    img:string,
}

function App() {
  const [contextCoords,setContextCoords]=useState([]);
  const [contextCoords2,setContextCoords2]=useState([]);
    const [xGreen,setXgreen] = useState<number>(0);
    const [yGreen,setYgreen] = useState<number>(0);
    const [found1,setFound1] = useState<boolean>(true);
    const [found2,setFound2] = useState<boolean>(true);
  const nodeRef=useRef(null);
  const img= useRef(null);
  const other = useRef(null);
  const [xCord,setXcord]=useState<number>(0);
  const [yCord,setYcord]=useState<number>(0);
   const [yOffset,setYOffset]=useState<number>(0);
  const [yImgClient,setYImgClient]=useState<number>(0);
  const [onTarget,setOnTarget]=useState<boolean>(false);
  //const nodeRef=useRef(null);

  const charArr=[
    {
      id:1,
      name:"Bob",
      img:char1
    },
  {
    id:2,
    name:"Tom",
    img:char2
  }
  ]
  // async function validateCoords(){
  //   const result = await fetch.
  // }
  function togglePopup(){
    setOnTarget((e)=> !e);
  }
  //const mouse =useRef(document);
  function handleClick(event:any){
    togglePopup();
    setXcord(event.pageX);
    setYcord(event.pageY);
    setYOffset(other.current.clientHeight);
    setYImgClient(img.current.clientHeight);
    
  }
  // async function handleCharClick(){
  //   const result = await fetch("http://localhost:3000");
  // }
  return (
    <ContextCoords.Provider value={[contextCoords,contextCoords2,setContextCoords,setContextCoords2,found1,setFound1,found2,setFound2]}>
    <div className="content">
      {console.log(contextCoords)}
            <Draggable nodeRef={nodeRef}  disabled={true} position={{x:contextCoords[0]-20,y:contextCoords[1]-15}}>
                      <div className={`box absolute bg-green-400 border-black border-3 opacity-60 w-10 h-10`} hidden={found1} ref={nodeRef}></div>
              </Draggable>
              <Draggable nodeRef={nodeRef}  disabled={true} position={{x:contextCoords2[0]-20,y:contextCoords2[1]-15}}>
                      <div className={`box absolute bg-green-400 border-black border-3 opacity-60 w-10 h-10`} hidden={found2} ref={nodeRef}></div>
              </Draggable>

     {onTarget && (<Popup chars={charArr} yOffest={yOffset} imgHeight={yImgClient}  coords={{x:xCord,y:yCord}} ></Popup>)} 
    
<div className="other" ref={other}>
       <Navbar chars={charArr} ></Navbar>
       <h2>Coordinates:</h2>
         <div className="coordinates flex justify-center gap-7">
            <h3>{xCord}</h3>
            <h3>{yCord}</h3>
            <h3>{yImgClient}</h3>
          </div>
      
</div>
      <main>

        <img src={waldo} alt="" onClick={handleClick} className='bob' ref={img}/>
      </main>
    </div>
    </ContextCoords.Provider>
  )
}

export default App
