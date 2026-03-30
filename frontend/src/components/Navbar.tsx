function Navbar({char1,
    char2
}:{char1:string,
    char2:string
}){
    return(
        <>
        <h1 className="text-white text-3xl">Find these characters</h1>
        <div className="chars flex gap-5.5 justify-center p-3 pb-7">
            <img src={char1} alt="" className="h-[50px]"/>
            <img src={char2} alt="" className="h-[50px]" />
        </div>
        </>
    )
}
export default Navbar