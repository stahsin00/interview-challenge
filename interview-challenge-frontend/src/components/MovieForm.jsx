import React, { useState, useEffect } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';

function MovieForm({ isFormOpen, setIsFormOpen }) {
  const [formData, setFormData] = useState({
    title: '',
    releaseYear: new Date().getFullYear(),
    genres: [],
  });
  const [genres, setGenres] = useState([]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const getGenres = async () => {
      try {
        const genreResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/genres/`, {
          method: 'GET',
        });

        if (!genreResponse.ok) {
          throw new Error(`HTTP error! status: ${genreResponse.status}`);
        }

        const genreData = await genreResponse.json();
        setGenres(genreData);
      } catch (e) {
        console.error(e.message);
      }
    };

    getGenres();
  }, []);

  const handleGenreToggle = (genre) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required.';
    }

    if (
      !formData.releaseYear ||
      formData.releaseYear < 1888 ||
      formData.releaseYear > new Date().getFullYear()
    ) {
      newErrors.releaseYear = `Release year must be between 1888 and ${new Date().getFullYear()}.`;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    console.log(formData);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/movies/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add movie.');
      }

      const newMovie = await response.json();

      setFormData({
        title: '',
        releaseYear: new Date().getFullYear(),
        genres: [],
      });

      setIsFormOpen(false);
    } catch (err) {
      console.error('Error adding movie:', err);
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isFormOpen) {
    return <></>;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur z-50 flex justify-center items-center">
      <div className="p-2 bg-black shadow-md rounded-lg border border-gray-500 w-11/12 md:w-4/6 h-4/6 flex flex-col justify-center items-center relative">
        <h1 className="text-white text-2xl">Add A Movie</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              className={`w-full p-2 rounded-md bg-white border ${
                errors.title ? 'border-red-500' : 'border-gray-500'
              } text-black focus:ring-2 focus:ring-[#f8ad2d] focus:border-transparent`}
              placeholder="Enter movie title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Release Year *</label>
            <input
              type="number"
              id="releaseYear"
              name="releaseYear"
              className={`w-full p-2 rounded-md bg-white border ${
                errors.releaseYear ? 'border-red-500' : 'border-gray-500'
              } text-black focus:ring-2 focus:ring-[#f8ad2d] focus:border-transparent`}
              min="1888"
              max={new Date().getFullYear()}
              value={formData.releaseYear}
              onChange={handleChange}
            />
            {errors.releaseYear && (
              <p className="text-red-500 text-xs mt-1">{errors.releaseYear}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Genres</label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  type="button"
                  key={genre}
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${formData.genres.includes(genre) ? 'bg-[#f8ad2d] text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-7">
            <button
              type="button"
              className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
              onClick={() => {
                setIsFormOpen(false);
                setErrors({});
                setSubmitError('');
              }}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#f8ad2d] text-black font-medium hover:bg-[#e59d1d] transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add'}
            </button>

            {submitError && <p className="text-red-500 text-sm text-center mt-2">{submitError}</p>}
          </div>
        </form>
        <button
          className="absolute top-2 right-2 text-[#f8ad2d] text-3xl md:text-xl"
          onClick={() => {
            setIsFormOpen(false);
          }}
        >
          <IoIosCloseCircle />
        </button>
      </div>
    </div>
  );
}

export default MovieForm;
