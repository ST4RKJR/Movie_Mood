import { useEffect, useState } from 'react'
import useMediaFetcher from './useMediaFetcher';

const useGetRightSearchUrl = (queryData, depen) => {

  const [resultPage, setResultPage] = useState(parseInt(sessionStorage.getItem('page')) || 1);
  const [queryUrl, setQueryUrl] = useState('');

  // console.log(resultPage);

  useEffect(() => {
    if (queryData && queryData.mediaRef?.trim() !== '') {
      
      if (queryData?.category === "default") {
        setQueryUrl(
            `${import.meta.env.VITE_URL}search/multi?query=${queryData?.mediaRef}&include_adult=${queryData?.mediaIsAdult}&language=en-US&page=${resultPage}`
        );
      } else if (queryData?.category === "movie") {
        setQueryUrl(
          `${import.meta.env.VITE_URL}search/movie?query=${queryData?.mediaRef}&include_adult=${queryData?.mediaIsAdult}&language=en-US&page=${resultPage}`
        );
      } else if (queryData?.category === "tvshow") {
        setQueryUrl(
          `${import.meta.env.VITE_URL}search/tv?query=${queryData?.mediaRef}&include_adult=${queryData?.mediaIsAdult}&language=en-US&page=${resultPage}`
        );
      } else if (queryData?.category === "person") {
        setQueryUrl(
          `${import.meta.env.VITE_URL}search/person?query=${queryData?.mediaRef}&include_adult=${queryData?.mediaIsAdult}&language=en-US&page=${resultPage}`
        );
      };
    }
    
  }, [queryData, queryUrl, resultPage ]);
  const { fetchedData, SetFetchedData } = useMediaFetcher(queryUrl);


  useEffect(() => {
    SetFetchedData("");
  }, [queryData, resultPage]);



  return { fetchedData, resultPage, setResultPage, queryUrl };
}
export default useGetRightSearchUrl