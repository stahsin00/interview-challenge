import { FaPlus } from "react-icons/fa6";
import { GiFilmProjector } from "react-icons/gi";

function Banner() {
    return (
        <div className="w-full h-full flex justify-center items-center relative">
            <div className={`rounded-lg shadow-md w-11/12 h-3/4 bg-[url(https://images.unsplash.com/photo-1523207911345-32501502db22?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat z-10`}>
            </div>
            <div className="absolute bg-gradient-to-l from-black from-50% to-transparent w-11/12 h-3/4 rounded z-20" />
            <div className="z-30 absolute right-[10%] flex flex-col justify-center items-center">
                <h1 className="text-white font-cinzel font-9xl flex items-center"><GiFilmProjector className="w-6 h-6" />MyMovieList</h1>
                <div className="text-white text-lg p-2 mb-5 italic">Lights, camera—popcorn! Dive into the world of cinema.</div>
                <button className="bg-[#f8ad2d] text-black p-5 rounded-lg text-2xl flex items-center font-bold hover:bg-[#d78f26] transition-colors duration-200 ease-in-out"><FaPlus className="pr-2 font-bold text-2xl"/>ADD</button>
            </div>
        </div>
    );
  }
  
  export default Banner;