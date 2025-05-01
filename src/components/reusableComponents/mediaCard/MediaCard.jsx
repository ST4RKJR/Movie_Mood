import { Link } from "react-router-dom";
import useGetGenre from "../../../hooks/useGetGenre";
import "./MovieCard.css";
import ImageWithLoading from "../loadingImageScreen/ImageWithLoading";

const genreMap = useGetGenre();

const getRightType = (m_type, type) => {
  const mapType = (t) => {
    switch (t) {
      case "tv":
      case "tvshow":
        return "tvshow";
      case "movie":
      case "movies":
        return "movies";
      default:
        return null;
    }
  };

  return mapType(m_type) || mapType(type) || "person";
};

const rightImage = (val1, val2, val3) => {
  if (val1 !== null && val1 !== undefined) {
    return `https://image.tmdb.org/t/p/w500${val1}`;
  } else if (val2 !== null && val2 !== undefined) {
    return `https://image.tmdb.org/t/p/w500${val2}`;
  } else if (val3 !== null && val3 !== undefined) {
    return `https://image.tmdb.org/t/p/w500${val3}`;
  } else {
    return "https://dummyimage.com/200x300/000000/ffffff.png&text=Image+not+found";
  }
};

const getMediaType = (result, mediaType) => {
  if (result.media_type != null) {
    return result?.media_type?.toUpperCase();
  } else if (result?.order != null) {
    return `Actor: ${result.order}`;
  } else if (mediaType != null && mediaType !== "") {
    return mediaType?.toUpperCase();
  } else {
    return "";
  }
};

const getResultDescription = (result) => {
  if (result.overview) {
    return result.overview;
  } else if (result.character) {
    return "Character : " + result.character;
  } else if (result.known_for_department) {
    return "Department : " + result.known_for_department;
  } else {
    return "Unknown";
  }
};

const MediaCard = ({ result, mediaType, customCardClass }) => {
  // console.log(customCardClass);

  return (
    <>
      <div
        className={`flex relative  hover:flex-grow-[1] hover:transition-all duration-1000 border border-slate-600 rounded-md ${
          customCardClass
            ? customCardClass
            : "md:h-[300px] h-[300px] max-w-[400px]"
        } overflow-hidden`}
      >
        {result ? (
          <h4 className=" absolute bg-black text-white right-0 p-2 mt-1 me-1 font-bold py-1 z-10 rounded-md sm:text-sm text-[0.7rem] bg-opacity-30 ">
            {getMediaType(result, mediaType)}
          </h4>
        ) : (
          ""
        )}

        <p className=" absolute z-10 bg-black bg-opacity-30 text-white left-0 p-2 mt-1 ms-1 font-bold py-1 rounded ">
          {" "}
          {result?.vote_average?.toFixed(1) || result?.popularity?.toFixed(1)}
        </p>

        <Link
          to={`/${getRightType(
            result.media_type?.toLowerCase(),
            mediaType?.toLowerCase()
          )}/${result && result.id}`}
          className=" absolute bottom-[0] text-white bg-black bg-opacity-40 font-bold z-30 text-center text-ellipsis text-nowrap text-[.8rem] sm:text-[1em] overflow-hidden px-2 pt-2 pb-3 rounded-b-[7px] hover:bg-blue-500 w-full underline hover:no-underline "
        >
          {result.title || result.name}
        </Link>

        {result.release_date || result.first_air_date ? (
          <p className="absolute bottom-12 right-0 me-1 z-10 sm:text-[12px] md:text-[.7em] text-[9px] bg-black text-white bg-opacity-30 p-1 px-2 rounded-md font-bold ">
            Relesed on: {result.release_date || result.first_air_date}
          </p>
        ) : (
          ""
        )}

        <ImageWithLoading
          src={rightImage(
            result.poster_path,
            result.profile_path,
            result.backdrop_path
          )}
          className={`inset-1 h-full w-full object-top sm:object-top object-cover rounded-md hover:sm:object-top  `}
          styleLoading={" w-[100%] h-full absolute"}
        />

        <div className="px-2 py-10 z-10 w-full border-x-2 border-t-2 border-slate-600 backdrop-blur-[1.5px] bg-black bg-opacity-50 opacity-0 hover:opacity-100 overflow-auto scroll-container sm:block hidden rounded-t-md transition duration-300 ease-out h-[86%] absolute">
          <h2 className="tracking-widest text-sm title-font font-medium text-slate-300 mb-1">
            {result?.adult ? "18+" : "Family friendly"}
          </h2>
          <Link
            to={`/${getRightType(result?.media_type, mediaType)}/${
              result && result.id
            }`}
            className="title-font text-lg font-medium hover:text-slate-300 mb-3 text-white"
          >
            {result.title || result.name}
          </Link>
          <p className="leading-relaxed overflow-hidden h-[60%] text-white">
            <span className="text-ellipsis">
              {getResultDescription(result)}
            </span>
          </p>

          {/* <p className=" absolute top-0 right-0 me-2">
            Relesed on : {result.first_air_date || result.release_date}
          </p> */}

          <p className="flex mt-3 justify-center flex-wrap gap-1 ">
            {result &&
              result?.genre_ids?.map((genreId, key) => (
                <span
                  key={key}
                  className="text-[12px] bg-white bg-opacity-90 py-1 px-2 text-black font-bold rounded-md hover:bg-[#00DC89] hover:text-white transition duration-300"
                >
                  {genreMap[genreId] || ""}
                </span>
              ))}
          </p>
        </div>
      </div>
    </>
  );
};

export default MediaCard;
