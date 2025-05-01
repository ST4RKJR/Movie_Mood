import TrandingsToday from "../../reusableComponents/tranding/TrandingsToday";
import useMediaFetcher from "../../../hooks/useMediaFetcher";
import TopRated from "../../reusableComponents/topRated/TopRated";
import BigScreenSwiper from "../../reusableComponents/sliderSwiper/bigScreenSwiper/BigScreenSwiper";
import "./Movies.css"
import useWindowSizeGetter from "../../../hooks/useWindowSizeGetter";

const Movies = () => {


  
  const { fetchedData: trandingMovieData, isLoading: tMovideDataLoading } = useMediaFetcher(
    `${import.meta.env.VITE_URL}trending/movie/day?language=en-US'`
  );
  const { fetchedData: topMovieData } = useMediaFetcher(
    `${import.meta.env.VITE_URL}/movie/top_rated?language=en-US&page=1'`
  );
  const { fetchedData: upcomingMovieData, isLoading: uMovieDataLoading } = useMediaFetcher(
    `${import.meta.env.VITE_URL}/movie/upcoming?language=en-US&page=1&region=us`
  );
  const {width, height} = useWindowSizeGetter()


  return (
    <>
      <div className="bg-black container max-w-full">
        <div className="pt-5 pb-10 container mx-auto bg-black swiper-container">
          <h1 className="text-white text-4xl text-center font-semibold mb-4">Upcoming Movies</h1>
          <BigScreenSwiper
            fetchedData={upcomingMovieData && upcomingMovieData.results}
            isLoading={uMovieDataLoading}
          />
        </div>
      </div>

      <div className="container mt-5 mx-auto content-container">
        <section className="container xl:p-5 p-0 max-w-[100%]">
          <div className="flex gap-2 md:flex-row flex-col">
            <TrandingsToday
              fetchedData={trandingMovieData}
              maximumResult={18}
              mediaType={"movie"}
            />
            <TopRated
            className="mt-10"
              fetchedData={topMovieData}
              maximumResult={width && width <= 1024 ? 18 : 12}
              mediaType={"movie"}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Movies;
