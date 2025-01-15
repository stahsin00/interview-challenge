import { useState } from 'react';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function MovieCard({ movie, setSelectedMovie }) {
    const { title, releaseYear, genres } = movie;
    const [rating, setRating] = useState(movie.rating);
    const [watched, setWatched] = useState(movie.watched);

    const handleWatched = async (e) => {
        e.stopPropagation();
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/movies/${movie.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...movie,
                    watched: !watched
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update rating');
            }

            setWatched(!watched);
        } catch (err) {
            console.error('Error updating rating:', err);
        }
    }

    const handleRating = async (e, i) => {
        e.stopPropagation();
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/movies/${movie.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...movie,
                    rating: i
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update rating');
            }

            setRating(i);
        } catch (err) {
            console.error('Error updating rating:', err);
        }
    }

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= (rating || 0) ? 
                    <FaStar key={i} className="cursor-pointer" onClick={(e) => {handleRating(e, i)}}/> : 
                    <FaRegStar key={i} className="cursor-pointer" onClick={(e) => {handleRating(e, i)}}/>
            );
        }
        return stars;
    };

    return (
        <div className="bg-black rounded-lg shadow-md h-96 w-72  transform transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={() => {setSelectedMovie(movie)}}>
            <img src="https://images.unsplash.com/photo-1568876694728-451bbf694b83?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="movie poster" className="rounded-t-lg"></img>
            <div className="h-1/2">
                <h2 className="text-white text-lg font-cinzel p-2">{title}</h2>
                <hr></hr>
                <div className="text-white px-2 pt-1">{releaseYear}</div>
                <div className="text-gray-600 mb-4 text-sm font-bold px-2 w-full h-9 overflow-auto">
                    {genres.map(genre => genre.name).join(', ')}
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-2">
                    <div className="flex text-[#f8ad2d]">
                        {renderStars()}
                    </div>
                    <button className={`border ${watched ? "border-gray-600 text-gray-600" : "border-[#f8ad2d] text-[#f8ad2d]"} rounded-md text-sm p-2 w-64`} onClick={(e) => {handleWatched(e)}}>
                        {watched ? 'Watched' : 'Mark as Watched'}
                    </button>
                </div>
            </div>
        </div>
    );
  }
  
  export default MovieCard;