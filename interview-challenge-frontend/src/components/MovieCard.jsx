import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function MovieCard() {
    const genres = ["Action", "Comedy"];

    return (
        <div className="bg-black rounded-lg shadow-md h-96 w-72  transform transition-transform duration-300 hover:scale-105">
            <img src="https://images.unsplash.com/photo-1568876694728-451bbf694b83?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="movie poster" className="rounded-t-lg"></img>
            <div className="h-1/2">
                <h2 className="text-white text-lg font-cinzel p-2">Title</h2>
                <hr></hr>
                <div className="text-white px-2 pt-1">1998</div>
                <div className="text-gray-600 mb-4 text-sm font-bold px-2 w-full h-9 overflow-auto">{genres.join(', ')}</div>
                <div className="w-full flex flex-col justify-center items-center gap-2">
                    <div className="flex text-[#f8ad2d]">
                        <FaStar className="cursor-pointer"/>
                        <FaStar className="cursor-pointer"/>
                        <FaStar className="cursor-pointer"/>
                        <FaRegStar className="cursor-pointer"/>
                        <FaRegStar className="cursor-pointer"/>
                    </div>
                    <button className="border border-[#f8ad2d] text-[#f8ad2d] rounded-md text-sm p-2 w-64">
                        Mark as Watched
                    </button>
                </div>
            </div>
        </div>
    );
  }
  
  export default MovieCard;