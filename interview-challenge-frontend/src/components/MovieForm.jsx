import React, { useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";

function MovieForm() {
    const [formData, setFormData] = useState({
        title: '',
        releaseYear: new Date().getFullYear(),
        genres: [],
    });

    const genres = [
        "Action", "Comedy", "Drama", "Horror", "Sci-Fi", 
        "Thriller", "Romance", "Animation", "Documentary"
    ];

    const handleGenreToggle = (genre) => {
        setFormData(prev => ({
          ...prev,
          genres: prev.genres.includes(genre)
            ? prev.genres.filter(g => g !== genre)
            : [...prev.genres, genre]
        }));
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur z-50 flex justify-center items-center">
            <div className="bg-black shadow-md rounded-lg border border-gray-500 w-4/6 h-4/6 flex flex-col justify-center items-center relative">
                <h1 className='text-white text-2xl'>Add A Movie</h1>
                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Title *
                        </label>
                        <input type="text" className="w-full p-2 rounded-md bg-white border border-gray-500 text-black focus:ring-2 focus:ring-[#f8ad2d] focus:border-transparent" placeholder="Enter movie title"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Release Year *
                        </label>
                        <input type="number" className="w-full p-2 rounded-md bg-white border border-gray-500 text-black focus:ring-2 focus:ring-[#f8ad2d] focus:border-transparent" min="1888" max={new Date().getFullYear()}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                        Genres
                        </label>
                        <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                            <button type="button" key={genre} onClick={() => handleGenreToggle(genre)} className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${formData.genres.includes(genre) ? 'bg-[#f8ad2d] text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                                {genre}
                            </button>
                        ))}
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-7">
                        <button type="button" className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-[#f8ad2d] text-black font-medium hover:bg-[#e59d1d] transition-colors">
                            Add
                        </button>
                    </div>
                </form>
                <button className="absolute top-2 right-2 text-[#f8ad2d] text-xl">
                    <IoIosCloseCircle />
                </button>
            </div>
        </div>
    );
  }
  
export default MovieForm;