import { useEffect, useState } from 'react'
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";
import { FaArrowUp } from "react-icons/fa";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Home({ setSelectedMovie }) {
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect (() => {
        const test = async () => {
          try {
            const genreResponse = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/genres/`,
              {
                method: 'GET'
              }
            );
    
            if (!genreResponse.ok) {
              throw new Error(`HTTP error! status: ${genreResponse.status}`);
            }
            
            const genreData = await genreResponse.json();
            setGenres(genreData);
            console.log('Genres:', genreData);
          } catch (e) {
            console.error(e.message);
          }
        }
    
        test();
    
    }, []);

    useEffect (() => {
        const getMovies = async () => {
          try {
            const movieResponse = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/movies/?page=${page}&limit=8`,
                {
                  method: 'GET'
                }
              );
      
              if (!movieResponse.ok) {
                throw new Error(`HTTP error! status: ${movieResponse.status}`);
              }
              
              const movieData = await movieResponse.json();
              setMovies(movieData.movies);
              setTotalPages(movieData.pagination.total);
              console.log('Movies:', movieData);
          } catch (e) {
            console.error(e.message);
          }
        }
    
        getMovies();
    
    }, [page]);

  return (
    <div className='bg-[#212121] flex flex-col p-0 m-0'>
        <div className="w-full h-screen flex justify-center items-center">
            <Banner/>
        </div>
        <div className="mx-auto px-4 mb-5">
            <div className="flex flex-wrap justify-center gap-4">
                {movies.map(movie => (
                    <MovieCard 
                        key={movie.id}
                        movie={movie}
                        setSelectedMovie={setSelectedMovie}
                    />
                ))}
            </div>
        </div>
        <div className='w-full flex justify-center gap-2 mb-5 text-[#f8ad2d] text-lg'>
            <button disabled={page == 1} className='disabled:text-gray-400' onClick={() => setPage(prev => prev - 1)}><IoIosArrowBack /></button>
            <div>{page}</div>
            <button disabled={page === totalPages} className='disabled:text-gray-400' onClick={() => setPage(prev => prev + 1)}><IoIosArrowForward /></button>
        </div>
        <button className="fixed border bottom-5 right-5 w-10 h-10 border-[#f8ad2d] rounded-lg z-40 text-[#f8ad2d] flex justify-center items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><FaArrowUp /></button>
    </div>
  );
}

export default Home;