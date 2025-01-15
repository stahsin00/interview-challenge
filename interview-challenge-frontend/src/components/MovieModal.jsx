import { useState, useEffect } from 'react';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

function MovieModal({ selectedMovie, setSelectedMovie }) {
    if (!selectedMovie) {
        return (<></>);
    }

    const { title, releaseYear, genres } = selectedMovie;
    const [rating, setRating] = useState(selectedMovie.rating);
    const [watched, setWatched] = useState(selectedMovie.watched);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (selectedMovie) {
            setRating(selectedMovie.rating);
            setWatched(selectedMovie.watched);
        }
      }, [selectedMovie]);

    const handleDelete = async (e) => {
        e.stopPropagation();
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/movies/${selectedMovie.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to update rating');
            }

            setSelectedMovie(null);
        } catch (err) {
            console.error('Error updating rating:', err);
        }
    }

    const handleWatched = async (e) => {
        e.stopPropagation();
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/movies/${selectedMovie.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...selectedMovie,
                    watched: !watched
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update rating');
            }

            setWatched(!watched);
            setSelectedMovie((prev) => ({
                ...prev,
                watched: !watched,
            }));
        } catch (err) {
            console.error('Error updating rating:', err);
        }
    }

    const handleRating = async (e, i) => {
        e.stopPropagation();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/movies/${selectedMovie.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...selectedMovie,
                    rating: i
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update rating');
            }

            setRating(i);
            setSelectedMovie((prev) => ({
                ...prev,
                rating: i,
            }));
            
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur z-50 flex justify-center items-center">
            <div className="bg-black shadow-md rounded-lg border border-gray-500 w-5/6 h-5/6 flex relative">
                <div className="w-1/2 p-5 relative">
                    <h2 className="text-white text-5xl font-cinzel p-2">{title}</h2>
                    <hr></hr>
                    <div className="text-white px-2 py-2">{releaseYear}</div>
                    <div className="text-gray-600 mb-4 text-sm font-bold px-2 w-full h-44">
                        {genres.map(genre => genre.name).join(', ')}
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-2">
                        <div className="flex text-[#f8ad2d]">
                            {renderStars()}
                        </div>
                        <button className={`border ${watched ? "border-gray-600 text-gray-600" : "border-[#f8ad2d] text-[#f8ad2d]"} rounded-md text-sm p-2 w-64`}  onClick={(e) => {handleWatched(e)}}>
                            {watched ? 'Watched' : 'Mark as Watched'}
                        </button>
                    </div>
                    <div className="w-full flex justify-end items-center gap-2 absolute bottom-5 right-5">
                        <button className="border border-[#f8ad2d] text-[#f8ad2d] rounded-md text-sm p-2 w-10 h-10 flex justify-center items-center">
                            <MdOutlineEdit />
                        </button>
                        <button className="border border-[#f8ad2d] text-[#f8ad2d] rounded-md text-sm p-2 w-10 h-10 flex justify-center items-center" onClick={(e) => {handleDelete(e)}}>
                            <RiDeleteBin6Line />
                        </button>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1568876694728-451bbf694b83?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="movie poster" className="w-1/2 h-auto rounded-tr-lg rounded-br-lg"></img>
                <button className="absolute top-2 right-2 text-[#f8ad2d] text-xl" onClick={() => {setSelectedMovie(null)}}>
                    <IoIosCloseCircle />
                </button>
            </div>
        </div>
    );
  }
  
export default MovieModal;