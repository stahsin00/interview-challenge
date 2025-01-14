import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";

function Home() {
  return (
    <div className='bg-gray-900 flex flex-col p-0 m-0'>
        <div className="w-screen h-screen flex justify-center items-center">
            <Banner/>
        </div>
        {/* <div className="flex gap-5 w-screen justify-around">
            <MovieCard/>
        </div> */}
    </div>
  );
}

export default Home;