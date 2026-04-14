import { useState,useRef, useEffect } from 'react'
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
  const [xCord,setXcord]=useState<number>(0);
  const [yCord,setYcord]=useState<number>(0);
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
    
  }
  // async function handleCharClick(){
  //   const result = await fetch("http://localhost:3000");
  // }
  return (
    <div className="content">
     {onTarget && (<Popup chars={charArr} coords={{x:xCord,y:yCord}} ></Popup>)} 


     <Navbar chars={charArr} ></Navbar>
      <main>

          <h2>Coordinates:</h2>
          <div className="coordinates flex justify-center gap-7">
            <h3>{xCord}</h3>
            <h3>{yCord}</h3>
          </div>
      

        <img src={waldo} alt="" onClick={handleClick} className='bob'/>
      </main>
    </div>
  )
}

export default App
