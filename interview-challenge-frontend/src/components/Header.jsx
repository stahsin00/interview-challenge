import { GiFilmProjector } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function Header() {
  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
    'Documentary', 'Drama', 'Fantasy', 'Horror', 'Mystery',
    'Romance', 'Sci-Fi', 'Thriller'
];

    return (
      <div className='bg-black border-gray-500 border-b w-full h-16 fixed top-0 flex items-center shadow-md z-40'>
          <h1 className="text-white font-cinzel font-3xl px-5 flex items-center absolute"><GiFilmProjector className="w-6 h-6" />MyMovieList</h1>
          <div className="w-full flex items-center justify-center gap-5">
            <input type="text" placeholder="Search..." className="bg-white rounded-full text-sm py-2 px-5 w-2/5"/>
            {/* <div className="flex items-center justify-center gap-2">
              <select className="bg-white rounded-md text-sm py-2 px-5 w-32">
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                      {genre}
                  </option>
                ))}
              </select>
              <select className="bg-white rounded-md text-sm py-2 px-5 w-32">
              {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                      {rating}
                  </option>
              ))}
              </select>
            </div> */}
          </div>
          <button className="absolute right-5 bg-[#f8ad2d] text-black py-1 px-2 rounded-md text-xl flex items-center font-bold hover:bg-[#d78f26] transition-colors duration-200 ease-in-out"><FaPlus className="pr-1 font-bold text-xl"/>ADD</button>
      </div>
    );
  }
  
  export default Header;