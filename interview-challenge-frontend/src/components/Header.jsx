import { GiFilmProjector } from "react-icons/gi";

function Header() {
    return (
      <div className='bg-black border-gray-500 border-b w-screen h-16 absolute top-0 flex items-center shadow-md'>
          <h1 className="text-white font-cinzel font-3xl px-5 flex items-center"><GiFilmProjector className="w-6 h-6" />MyMovieList</h1>
      </div>
    );
  }
  
  export default Header;