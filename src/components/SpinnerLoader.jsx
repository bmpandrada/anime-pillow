const SpinnerLoading = () => {
    return ( 
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-700">Loading...</p>
      </div>
     );
}
 
export default SpinnerLoading;