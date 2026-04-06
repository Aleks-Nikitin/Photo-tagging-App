import { useState,useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import waldo from "./assets/waldo.jpg"
import char1 from "./assets/Character1.png"
import char2 from "./assets/Character2.png"
import Draggable from 'react-draggable';
import Popup from "./components/Popup";

export type Character ={
    name:string,
    img:string,
}

function App() {
  const [xCord,setXcord]=useState(0);
  const [yCord,setYcord]=useState(0);
  const nodeRef=useRef(null);

  const charArr=[
    {
      name:"Bob",
      img:char1
    },
  {
    name:"Tom",
    img:char2
  }
  ]

  //const mouse =useRef(document);
  function handleClick(event:any){
    setXcord(event.pageX);
    setYcord(event.pageY);
    
  }

  return (
    <div className="content">
      <Popup chars={charArr} coords={{x:xCord,y:yCord}}></Popup>
          <Draggable nodeRef={nodeRef} position={{x:xCord-20,y:yCord-15}} disabled={true}>
                  <div className={`box absolute bg-red-700 border-black border-2 opacity-50 w-10 h-10`} ref={nodeRef}></div>
          </Draggable>

     <Navbar chars={charArr} ></Navbar>
      <main>

          {/* <h2>Coordinates:</h2>
          <div className="coordinates flex justify-center gap-7">
            <h3>{xCord}</h3>
            <h3>{yCord}</h3>
          </div> */}
      

        <img src={waldo} alt="" onClick={handleClick} className='bob'/>
      </main>
    </div>
  )
}

export default App
