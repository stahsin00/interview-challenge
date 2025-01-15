import { useState } from 'react';
import { GiFilmProjector } from 'react-icons/gi';
import { FaPlus } from 'react-icons/fa6';
import { FaRegStar } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

function Header({ setIsFormOpen }) {
  const [movies, setMovies] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const genres = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Thriller',
  ];

  const handleSearchChange = (e) => {
    const query = e.target.value;
    
  };

  return (
    <>
      <div className="bg-black border-gray-500 border-b w-full h-16 fixed top-0 flex items-center shadow-md z-40">
        <h1 className="text-white font-cinzel font-3xl px-5 flex items-center absolute">
          <GiFilmProjector className="w-6 h-6" />
          MyMovieList
        </h1>
        <div className="w-full h-full flex items-center justify-center gap-7">
          <input
            type="text"
            placeholder="Search...(Not Implemented T-T)"
            className="bg-white rounded-full text-sm py-2 px-5 w-2/5 hidden md:block"
            onChange={handleSearchChange}
          />
          <div className="h-full relative flex w-full md:w-auto">
            <button
              className="text-[#f8ad2d] font-bold flex items-center absolute right-1 top-5 md:relative md:right-auto md:top-auto"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              FILTER
              <IoMdArrowDropdown
                className={`ml-1 transform transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>
        <button
          className="hidden absolute right-5 bg-[#f8ad2d] text-black py-1 px-2 rounded-md text-xl md:flex items-center font-bold hover:bg-[#d78f26] transition-colors duration-200 ease-in-out"
          onClick={() => {
            setIsFormOpen(true);
          }}
        >
          <FaPlus className="pr-1 font-bold text-xl" />
          ADD
        </button>
      </div>
      <div
        className={`bg-black fixed top-16 w-full z-40 flex items-center justify-center md:justify-end border-gray-500 transition-all duration-200 ease-in-out overflow-hidden ${isFilterOpen ? 'border-b opacity-100' : 'h-0 opacity-0'}`}
      >
        <div className="flex flex-col md:flex-row items-center gap-7 px-10 py-2">
          <div className="flex text-[#f8ad2d]">
            <FaStar className="cursor-pointer" />
            <FaStar className="cursor-pointer" />
            <FaStar className="cursor-pointer" />
            <FaRegStar className="cursor-pointer" />
            <FaRegStar className="cursor-pointer" />
          </div>
          <button className="relative w-48 h-8 rounded-full bg-gray-200 flex items-center text-sm font-medium overflow-hidden">
            <div
              className={`absolute w-1/2 h-full bg-[#f8ad2d] transition-transform duration-200 rounded-full ${true ? 'translate-x-full' : 'translate-x-0'}`}
            />
            <span
              className={`flex-1 text-center z-10 transition-colors duration-200 ${true ? 'text-gray-500' : 'text-black'}`}
            >
              Not Watched
            </span>
            <span
              className={`flex-1 text-center z-10 transition-colors duration-200 ${true ? 'text-black' : 'text-gray-500'}`}
            >
              Watched
            </span>
          </button>
          <select className="bg-white rounded-md text-sm py-2 px-5 w-32 cursor-pointer">
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search...(Not Implemented T-T)"
            className="bg-white rounded-full text-sm py-2 px-5 w-4/5 md:hidden"
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
