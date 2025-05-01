import { useState } from "react";
function CustomLoadingScreen({ ...styleLoading }) {
  return (
    <div
      className={`loading-screen border bg-black border-slate-600 rounded-lg overflow-hidden  ${styleLoading.styleLoading}`}
    >
      <div className="text-gray-900 dark:text-gray-100 dark:bg-gray-950 relative flex justify-center items-center h-full">
        <h1 className=" text-2xl md:text-2xl font-bold flex justify-center items-center w-fit h-fit">
          Loading . . .
        </h1>
      </div>
    </div>
  );
}
function ImageWithLoading({ src, className, styleLoading }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  return (
    <>
      {!isLoaded && <CustomLoadingScreen styleLoading={styleLoading} />}
      <img
        src={src}
        alt="Your Image"
        className={` ${isLoaded ? 'block': 'hidden'} ${className}`+ ''}
        onLoad={handleImageLoad}
      />
      
    </>
  );
}
export default ImageWithLoading;
