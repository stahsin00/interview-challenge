import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0)

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
    </>
  )
}

export default App
