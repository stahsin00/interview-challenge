import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";
import { FaArrowUp } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function Home() {
    const genres = [
        'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
        'Documentary', 'Drama', 'Fantasy', 'Horror', 'Mystery',
        'Romance', 'Sci-Fi', 'Thriller'
    ];

  return (
    <div className='bg-[#212121] flex flex-col p-0 m-0'>
        <div className="w-full h-screen flex justify-center items-center">
            <Banner/>
        </div>
        <div className="mx-auto px-4 mb-10">
            <div className="flex flex-wrap justify-center gap-4">
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
            </div>
        </div>
        <button className="fixed border bottom-5 right-5 w-10 h-10 border-[#f8ad2d] rounded-lg z-40 text-[#f8ad2d] flex justify-center items-center"><FaArrowUp /></button>
    </div>
  );
}

export default Home;