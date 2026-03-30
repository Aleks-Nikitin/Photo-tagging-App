import { useState,useRef } from 'react'
import Navbar from './components/Navbar'
import waldo from "./assets/waldo.jpg"
import char1 from "./assets/Character1.png"
import char2 from "./assets/Character2.png"
function App() {
  const [xCord,setXcord]=useState(0);
  const [yCord,setYcord]=useState(0);
  //const mouse =useRef(document);
  function handleClick(event:any){
    setXcord(event.pageX);
    setYcord(event.pageY);
  }
 function handleMouseOver(event:any){

  } 
  return (
    <div className="content">
     <Navbar char1={char1} char2={char2} ></Navbar>
      <main>
   
          <h2>Coordinates:</h2>
          <div className="coordinates flex justify-center gap-7">
            <h3>{xCord}</h3>
            <h3>{yCord}</h3>
          </div>

        <img src={waldo} alt="" onClick={handleClick} onMouseOver={handleMouseOver}/>
      </main>
    </div>
  )
}

export default App
