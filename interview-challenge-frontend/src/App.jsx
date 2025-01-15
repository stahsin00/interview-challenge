import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Header from './components/Header';
import MovieModal from './components/MovieModal';
import MovieForm from './components/MovieForm';

function App() {
  const [ selectedMovie, setSelectedMovie ] = useState();

  return (
    <>
      <Header/>
      <Home setSelectedMovie={setSelectedMovie}/>
      <MovieModal setSelectedMovie={setSelectedMovie} selectedMovie={selectedMovie}/>
      {/* <MovieForm/> */}
    </>
  )
}

export default App
