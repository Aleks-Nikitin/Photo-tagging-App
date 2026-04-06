
import type { Character } from "../App";
type NavbarProps={
    chars:Character[];
}

function Navbar({chars}:NavbarProps){
    return(
        <>
        <h1 className="text-white text-3xl">Find these characters</h1>
        <div className="chars flex gap-5.5 justify-center p-3 pb-7">
            {chars.map((char)=>(
                <div className="charBlock grid" key={char.name}>
                    <h3>{char.name}</h3>
                    <img src={char.img} alt="" className="h-[50px]"/>
                </div>
            ))
            }
        </div>
        </>
    )
}
export default Navbar