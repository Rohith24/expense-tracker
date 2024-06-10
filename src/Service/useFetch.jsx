import { useState, useEffect } from "react";

const baseUrl = 'http://localhost:1337/';

const useFetch = (dataFetcher, input = null) => {
    const [data, setData] = useState(null);
    const [isLoading, setIdLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const abortCont = new AbortController();
        dataFetcher(input)
        .then(res=> {
            return res;
        }).then(data => {
            if(data.code === "0"){
                setData(data);
                setIdLoading(false);
                setError(null);
            }
            else{
                setIdLoading(false);
                setError(data.message);
            }
        }).catch((e)=>{
            if(e.name === 'AbortError'){
                console.log("Link is used, It will not call server. so abort will work");
            }else{
                setIdLoading(false);
                setError(e.message);
            }
        });
        return () => abortCont.abort();
    }, [dataFetcher]);

    return {data, isLoading, error}
}

export default useFetch;