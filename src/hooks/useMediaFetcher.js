import { useEffect, useState } from 'react'

const useMediaFetcher = (url, dependec) => {

    const [isLoading, setIsLoading] = useState(false)
    const [fetchedData, SetFetchedData] = useState(null)
    const [err, setErr] = useState(null)

    useEffect(() => {
        if(url !== null){
        const fetchData = async()=> {
            setIsLoading(true)
            try {
                const result = await (await fetch(url, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
                    }
                })).json();
               SetFetchedData(result);
            } catch (err) {
                setErr(err);
            }
            finally{
                setIsLoading(false)
            }
        }

        fetchData()}
    }, [url, dependec])




    return ({ isLoading, fetchedData, SetFetchedData, err })
}

export default useMediaFetcher