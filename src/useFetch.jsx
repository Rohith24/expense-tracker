import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIdLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetch(url)
        .then(res=> {
            return res.json();
        }).then(data => {
            if(data.code === "0"){
                setData(data.accounts);
                setIdLoading(false);
                setError(null);
            }
            else{
                setIdLoading(false);
                setError(data.message);
            }
        }).catch((e)=>{
            setIdLoading(false);
            setError(e.message);
        });
        console.log('used effect, every render');
    }, []);

    return {data, isLoading, error}
}

export default useFetch;