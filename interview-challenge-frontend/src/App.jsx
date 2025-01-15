import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Header from './components/Header';
import MovieModal from './components/MovieModal';
import MovieForm from './components/MovieForm';

function App() {
  useEffect (() => {
    const test = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/genres/`,
          {
            method: 'GET'
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Connection successful:', data);
      } catch (e) {
        console.error(e.message);
      }
    }

    test();

  }, []);

  return (
    <>
      <Header/>
      <Home/>
      {/* <MovieModal/> */}
      {/* <MovieForm/> */}
    </>
  )
}

export default App
