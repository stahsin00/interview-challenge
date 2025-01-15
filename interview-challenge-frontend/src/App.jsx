import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Header from './components/Header';
import MovieModal from './components/MovieModal';
import MovieForm from './components/MovieForm';

function App() {
  const [ selectedMovie, setSelectedMovie ] = useState();
  const [ isFormOpen, setIsFormOpen ] = useState(false);

  return (
    <>
      <Header setIsFormOpen={setIsFormOpen}/>
      <Home setSelectedMovie={setSelectedMovie} setIsFormOpen={setIsFormOpen}/>
      <MovieModal setSelectedMovie={setSelectedMovie} selectedMovie={selectedMovie}/>
      <MovieForm setIsFormOpen={setIsFormOpen} isFormOpen={isFormOpen}/>
    </>
  )
}

export default App
