import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import SelectCatagoryMenu from "../../reusableComponents/selectCatMenu/SelectCatagoryMenu";
import SelectMainCatagory from "../../reusableComponents/selectCatMenu/SelectMainCatagory";
import useMediaFetcher from "../../../hooks/useMediaFetcher";
import MediaCard from "../../reusableComponents/mediaCard/MediaCard";
import IntersectionObserverComponent from "../../reusableComponents/interSectionOvserver/IntersectionObserverComponent";

const Homepage = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const [currentUrl, setCurrentUrl]= useState(null)

  const [mainCatagory, setMainCatagory] = useState("movie");
  const [subCatagory, setSubCatagory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [isAdult, setIsAdult] = useState(false);
  const [sortBy, setSortBy] = useState("popularity.desc");

  const handleMainCatagory = (data) => {
    setMainCatagory(data.id);
    setSubCatagory(null);
  };

  const handleSubCatagory = (data) => {
    setSubCatagory(data.join("%2C"));
  };

  const handleQuerySortBy = (data) =>{
    const { value } = data.target;
    setSortBy(value.toString())
    console.log(value, sortBy);
  }

  useEffect(() => {
    goToTop();
    setCurrentPage(1);
    setFetchedData(null);
  }, [subCatagory, sortBy]);

  const url = (mainCatagory, subCatagory, currentPage, sortBy, isAdult) => {
    if (!subCatagory) return null;

    return mainCatagory === "movie"
      ? `${
          import.meta.env.VITE_URL
        }discover/movie?include_adult=${isAdult}&include_video=false&language=en-US&page=${currentPage}&sort_by=${sortBy}&with_genres=${subCatagory}`
      : `${
          import.meta.env.VITE_URL
        }discover/tv?include_adult=${isAdult}&include_null_first_air_dates=false&language=en-US&page=${currentPage}&sort_by=${sortBy}&with_genres=${subCatagory}`;
  };


  useEffect(()=>{
    setCurrentUrl(url(mainCatagory, subCatagory, currentPage, sortBy, isAdult))
  }, [mainCatagory, subCatagory, currentPage, handleQuerySortBy, isAdult])


  const { fetchedData: mainResult } = useMediaFetcher(currentUrl);

  useEffect(() => {
    if (mainResult && mainResult.results.length > 0) {
      setFetchedData((prevData) => {
        if (prevData && prevData.results && prevData.results.length > 0) {
          return {
            ...prevData,
            results: [...prevData.results, ...mainResult.results],
          };
        } else {
          return mainResult;
        }
      });

      // console.log(url(mainCatagory, subCatagory, currentPage, sortBy, isAdult));
      // console.log(fetchedData);
    }
  }, [mainResult]);

  const handleIntersection = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SelectMainCatagory onChange={handleMainCatagory} />
      <SelectCatagoryMenu
        onChange={handleSubCatagory}
        CatagoryType={mainCatagory}
      />

      <div className="w-[90%] mx-auto my-10 flex justify-between">
        <h3 className="">
          Found {mainCatagory == "movie" ? " Movies" : "TV Series"} :{" "}
          <span className=" font-semibold">{fetchedData?.total_results}</span>
        </h3>

        <div className=" border border-slate-600 px-3 py-1">
          <label htmlFor="query_discover_sort_by">Sort by : </label>
          <select
            className="outline-0 bg-[#0C1119] text-[#00DC89] cursor-pointer"
            id="query_discover_sort_by"
            onChange={handleQuerySortBy}
          >
            <option value="popularity.desc" className="bg-[#0C1119] text-[#00DC89] hover:bg-[#00DC89] hover:text-white"> &#9650; Highest Popularity </option>
            <option value="popularity.asc" className="bg-[#0C1119] text-[#00DC89] hover:bg-[#00DC89] hover:text-white">&#9660; Lowest Popularity</option>

            
            <option value="vote_count.desc" className="bg-[#0C1119] text-[#00DC89] hover:bg-[#00DC89] hover:text-white">&#9650; Highest Rated</option>
            <option value="vote_count.asc" className="bg-[#0C1119] text-[#00DC89] hover:bg-[#00DC89] hover:text-white">&#9660; Lowest Rated</option>

            <option value="revenue.desc" className="bg-[#0C1119] text-[#00DC89] hover:bg-[#00DC89] hover:text-white">&#9650; Highest Revenue </option>
            <option value="revenue.asc" className="bg-[#0C1119] text-[#00DC89] hover:bg-[#00DC89] hover:text-white">&#9660; Lowest Revenue</option>

            <option value="title.asc" className="bg-[#0C1119] text-[#00DC89] hover:bg-[#00DC89] hover:text-white">&#9650; Title (a-z)</option>
            <option value="title.desc" className="bg-[#0C1119] text-[#00DC89] hover:bg-[#00DC89] hover:text-white">&#9660; Title (z-a)</option>

            <option value="original_title.asc">&#9650; Original title (a-z)</option>
            <option value="original_title.desc">&#9660; original title (z-a)</option>

            <option value="primary_release_date.desc">
            &#9650; Release date desc
            </option>
            <option value="primary_release_date.asc">
            &#9660; Release date asc
            </option>

            <option value="vote_average.desc">&#9650; Vote Average Highest</option>
            <option value="vote_average.asc">&#9660; Vote Average Lowest</option>

          </select>
        </div>
      </div>

      <div className="my-5 w-[98%] mx-auto flex flex-wrap gap-3 justify-center">
        {fetchedData?.results?.map((result, key) => (
          <MediaCard
            key={key}
            result={result}
            mediaType={result?.media_type || mainCatagory}
            customCardClass="w-[48%] xs:w-[30%] sm:w-[30%] md:w-[210px] h-[300px] max-w-[300px]"
          />
        ))}
      </div>

      <div
        onClick={goToTop}
        className="fixed bottom-10 right-10 z-50 bg-yellow-500 p-4 text-white cursor-pointer text-[1.5em] hover:bg-blue-500"
      >
        <FaArrowUp />
      </div>

      <IntersectionObserverComponent onIntersection={handleIntersection} />
    </>
  );
};

export default Homepage;
