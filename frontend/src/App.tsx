import { useState,useRef, useEffect} from 'react'
import { ContextCoords } from './Context';
import Draggable from "react-draggable";
import Navbar from './components/Navbar'
import waldo from "./assets/waldo.jpg"
import char1 from "./assets/Character1.png"
import char2 from "./assets/Character2.png"
import Popup from "./components/Popup";

export type Character ={
    id:number,
    name:string,
    img:string,
}
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
function App() {
  const dialogRef = useRef(null);
  const [contextCoords,setContextCoords]=useState([]);
  const [contextCoords2,setContextCoords2]=useState([]);
    const [found1,setFound1] = useState<boolean>(true);
    const [found2,setFound2] = useState<boolean>(true);
    const [characters,setCharacters]=useState(charArr);
  const nodeRef=useRef(null);
  const img= useRef(null);
  const other = useRef(null);
  const [xCord,setXcord]=useState<number>(0);
  const [yCord,setYcord]=useState<number>(0);
   const [yOffset,setYOffset]=useState<number>(0);
  const [yImgClient,setYImgClient]=useState<number>(0);
  const [onTarget,setOnTarget]=useState<boolean>(false);
        const [isActive, setIsActive] = useState(false);
        const [isPaused, setIsPaused] = useState(true);
        const [time, setTime] = useState(0);
      const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    useEffect(()=>{
        if(!found1 && !found2){
            handlePauseResume();
        }else if(found1 && found2){
            handleStart();
        }
        
    },[found1,found2])

  function togglePopup(){
    setOnTarget((e)=> !e);
  }
  function handleClick(event:any){
    togglePopup();
    setXcord(event.pageX);
    setYcord(event.pageY);
    setYOffset(other.current.clientHeight);
    setYImgClient(img.current.clientHeight);
    
  }
  return (
    <ContextCoords.Provider value={[contextCoords,contextCoords2,setContextCoords,setContextCoords2,found1,setFound1,found2,setFound2,characters,setCharacters]}>
    <div className="content">
       { !found1 && !found2 && <dialog id="dialog" open> 
        <div className="fixed bg-blue-900 text-2xl text-white top-1/2 left-1/3 w-fit mx-auto my-0 p-5">
          <h1>Congratulations your score is <span className='text-red-500'>{time}</span> </h1>
          <form method="dialog">
          <button className='bg-amber-950  mt-3 p-2 hover:font-bold hover:cursor-pointer' > Got it!</button>
          </form>
        </div>
      </dialog> }
            <Draggable nodeRef={nodeRef}  disabled={true} position={{x:contextCoords[0]-20,y:contextCoords[1]-15}}>
                      <div className={`box absolute bg-green-400 border-black border-3 opacity-60 w-10 h-10`} hidden={found1} ref={nodeRef}></div>
              </Draggable>
              <Draggable nodeRef={nodeRef}  disabled={true} position={{x:contextCoords2[0]-20,y:contextCoords2[1]-15}}>
                      <div className={`box absolute bg-green-400 border-black border-3 opacity-60 w-10 h-10`} hidden={found2} ref={nodeRef}></div>
              </Draggable>

     {onTarget && (<Popup yOffest={yOffset} imgHeight={yImgClient}  coords={{x:xCord,y:yCord}} ></Popup>)} 
    
<div className="other" ref={other}>
       <Navbar chars={charArr} isActive={isActive} setIsActive={setIsActive} isPaused={isPaused} setIsPaused={setIsPaused} time={time} setTime={setTime} ></Navbar>
       <h2>Coordinates:</h2>
         <div className="coordinates flex justify-center gap-7">
            <h3>{xCord}</h3>
            <h3>{yCord}</h3>
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
