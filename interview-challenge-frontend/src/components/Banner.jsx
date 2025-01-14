function Banner() {
    return (
        <div className="w-screen h-11/12 flex justify-center items-center relative">
            <div className='rounded-lg shadow-md w-11/12 h-80 bg-[url("https://images.unsplash.com/photo-1570888232975-4408150506b4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-center bg-no-repeat'>
                
            </div>
            <div className="absolute bg-gradient-to-r from-black from-30% to-transparent w-11/12 h-80 rounded" />
        </div>
    );
  }
  
  export default Banner;