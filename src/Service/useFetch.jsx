import { useState, useEffect } from "react";

const baseUrl = 'http://localhost:1337/';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIdLoading] = useState(true);
    const [error, setError] = useState(null);
    const fullUrl = baseUrl + url;
    useEffect(()=>{
        const abortCont = new AbortController();

        setTimeout(()=>{
            fetch(fullUrl, {signal: abortCont.signal})
            .then(res=> {
                return res.json();
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
        }, 5000)
        return () => abortCont.abort();
    }, [url]);

    return {data, isLoading, error}
}

export default useFetch;